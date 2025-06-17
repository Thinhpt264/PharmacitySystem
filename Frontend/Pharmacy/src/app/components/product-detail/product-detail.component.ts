import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AccountService } from 'src/app/service/account.service';
import { AuthService } from 'src/app/service/auth.service';
import { BaseUrlService } from 'src/app/service/baseUrl.service';
import { CartService } from 'src/app/service/cart.service';
import { CategoryService } from 'src/app/service/category.service';
import { CommentService } from 'src/app/service/comment.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-root',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  id: any;
  product: any = {};
  topProducts: any[] = [];
  cart: any = [];
  comments: any[] = [];

  // Form data for new comment
  newComment = {
    comment: '',
    rating: 5,
  };

  // Form data for reply
  replyForm: any = {};
  showReplyForm: any = {};

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private baseUrl: BaseUrlService,
    private cartService: CartService,
    private messageService: MessageService,
    private commentService: CommentService,
    private accountService: AccountService,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      console.log('ID thay đổi:', id);
      this.id = id;
    });
    this.findById(this.id);
    this.getTopProductByView();
    this.loadComments();
  }

  findById(id: any) {
    this.productService.findById(id).then((res) => {
      this.product = res.data;
      this.productService
        .findImageOfObjId(this.product.id, 'Product')
        .then((res) => {
          const fullPath =
            this.baseUrl.getBaseUrl() + res.image.path + res.image.imageName;
          this.product.imgUrl = fullPath;
        });
      console.log(this.product);
    });
  }

  getTopProductByView() {
    this.productService.getTopProduct().then((res) => {
      this.topProducts = res.data;
      console.log(this.topProducts);
      this.topProducts.forEach((product1) => {
        this.productService
          .findImageOfObjId(product1.id, 'Product')
          .then((res) => {
            const fullPath =
              this.baseUrl.getBaseUrl() + res.image.path + res.image.imageName;
            product1.imgUrl = fullPath;
          });
      });
    });
  }

  // Load comments for product với username
  async loadComments() {
    try {
      const res = await this.commentService.findCommentByProductId(this.id);

      if (res.status) {
        this.comments = res.data;

        // Duyệt qua từng comment chính và lấy username
        for (let comment of this.comments) {
          try {
            // Lấy thông tin account cho comment chính
            const accountRes = await this.accountService.findAccountById(
              comment.accountId
            );
            if (accountRes.status && accountRes.data) {
              comment.username =
                accountRes.data.username || `User${comment.accountId}`;
            } else {
              comment.username = `User${comment.accountId}`;
            }

            // Duyệt qua các child comments (replies)
            if (comment.childComments && comment.childComments.length > 0) {
              for (let childComment of comment.childComments) {
                try {
                  const childAccountRes =
                    await this.accountService.findAccountById(
                      childComment.accountId
                    );
                  if (childAccountRes.status && childAccountRes.data) {
                    childComment.username =
                      childAccountRes.data.username ||
                      `User${childComment.accountId}`;
                  } else {
                    childComment.username = `User${childComment.accountId}`;
                  }
                } catch (error) {
                  console.error(
                    `Error loading account for child comment ${childComment.id}:`,
                    error
                  );
                  childComment.username = `User${childComment.accountId}`;
                }
              }
            }
          } catch (error) {
            console.error(
              `Error loading account for comment ${comment.id}:`,
              error
            );
            comment.username = `User${comment.accountId}`;
          }
        }

        console.log('Comments with usernames loaded:', this.comments);
      }
    } catch (error) {
      console.error('Error loading comments:', error);
      this.messageService.add({
        severity: 'error',
        summary: 'Lỗi',
        detail: 'Không thể tải bình luận. Vui lòng thử lại sau.',
      });
    }
  }

  // Submit new comment với cập nhật realtime
  async submitComment() {
    if (!this.newComment.comment.trim()) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Cảnh báo',
        detail: 'Vui lòng nhập nội dung bình luận',
      });
      return;
    }

    const commentData = {
      accountId: this.getCurrentUserId(),
      comment: this.newComment.comment,
      productId: parseInt(this.id),
      commentParentId: null,
      status: 1,
    };

    console.log('Sending comment data:', commentData);

    try {
      const res = await this.commentService.comment(commentData);
      if (res.status) {
        this.messageService.add({
          severity: 'success',
          summary: 'Thành công',
          detail: 'Bình luận đã được thêm thành công',
        });

        // Tạo object comment mới với username
        const newComment = {
          id: res.data?.id || Date.now(),
          accountId: this.getCurrentUserId(),
          comment: this.newComment.comment,
          commentParentId: null,
          productId: parseInt(this.id),
          status: 1,
          childComments: [],
          username: await this.getCurrentUsername(),
        };

        // Thêm comment mới vào đầu danh sách
        this.comments.unshift(newComment);

        // Reset form
        this.resetCommentForm();

        console.log('Updated comments after new comment:', this.comments);
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Lỗi',
          detail: res.message || 'Không thể thêm bình luận',
        });
      }
    } catch (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Lỗi',
        detail: 'Không thể thêm bình luận. Vui lòng thử lại sau.',
      });
      console.error('Error submitting comment:', error);
    }
  }

  // Submit reply với cập nhật realtime
  async submitReply(parentCommentId: number) {
    const replyText = this.replyForm[parentCommentId];

    if (!replyText || !replyText.trim()) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Cảnh báo',
        detail: 'Vui lòng nhập nội dung trả lời',
      });
      return;
    }

    const replyData = {
      accountId: this.getCurrentUserId(),
      comment: replyText,
      productId: parseInt(this.id),
      commentParentId: parentCommentId,
      status: 1,
    };

    console.log('Sending reply data:', replyData);

    try {
      const res = await this.commentService.comment(replyData);
      if (res.status) {
        this.messageService.add({
          severity: 'success',
          summary: 'Thành công',
          detail: 'Trả lời đã được thêm thành công',
        });

        // Reset form
        this.replyForm[parentCommentId] = '';
        this.showReplyForm[parentCommentId] = false;

        // Tạo object reply mới với username
        const newReply = {
          id: res.data?.id || Date.now(),
          accountId: this.getCurrentUserId(),
          comment: replyText,
          commentParentId: parentCommentId,
          productId: parseInt(this.id),
          status: 1,
          childComments: [],
          username: await this.getCurrentUsername(),
        };

        // Tìm và cập nhật comment cha
        const parentComment = this.comments.find(
          (c) => c.id === parentCommentId
        );
        if (parentComment) {
          if (!parentComment.childComments) {
            parentComment.childComments = [];
          }
          parentComment.childComments.push(newReply);
        }

        console.log('Updated comments after reply:', this.comments);
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Lỗi',
          detail: res.message || 'Không thể thêm trả lời',
        });
      }
    } catch (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Lỗi',
        detail: 'Không thể thêm trả lời. Vui lòng thử lại sau.',
      });
      console.error('Error submitting reply:', error);
    }
  }

  // Submit reply to child comment
  async submitReplyToChild(parentCommentId: number, childCommentId: number) {
    const replyText = this.replyForm[`child_${childCommentId}`];

    if (!replyText || !replyText.trim()) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Cảnh báo',
        detail: 'Vui lòng nhập nội dung trả lời',
      });
      return;
    }

    const replyData = {
      accountId: this.getCurrentUserId(),
      comment: replyText,
      productId: parseInt(this.id),
      commentParentId: parentCommentId,
      status: 1,
    };

    console.log('Sending child reply data:', replyData);

    try {
      const res = await this.commentService.comment(replyData);
      if (res.status) {
        this.messageService.add({
          severity: 'success',
          summary: 'Thành công',
          detail: 'Trả lời đã được thêm thành công',
        });

        // Reset form
        this.replyForm[`child_${childCommentId}`] = '';
        this.showReplyForm[`child_${childCommentId}`] = false;

        // Tạo object reply mới
        const newReply = {
          id: res.data?.id || Date.now(),
          accountId: this.getCurrentUserId(),
          comment: replyText,
          commentParentId: parentCommentId,
          productId: parseInt(this.id),
          status: 1,
          childComments: [],
          username: await this.getCurrentUsername(),
        };

        // Tìm comment cha và thêm reply vào childComments
        const parentComment = this.comments.find(
          (c) => c.id === parentCommentId
        );
        if (parentComment) {
          if (!parentComment.childComments) {
            parentComment.childComments = [];
          }
          parentComment.childComments.push(newReply);
        }

        console.log('Updated comments after child reply:', this.comments);
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Lỗi',
          detail: res.message || 'Không thể thêm trả lời',
        });
      }
    } catch (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Lỗi',
        detail: 'Không thể thêm trả lời. Vui lòng thử lại sau.',
      });
      console.error('Error submitting child reply:', error);
    }
  }

  // Get current username
  async getCurrentUsername(): Promise<string> {
    try {
      const userData = localStorage.getItem('currentUser');
      if (userData) {
        const user = JSON.parse(userData);
        return user.username || `User${user.id}`;
      }

      // Nếu không có trong localStorage, gọi API
      const userId = this.getCurrentUserId();
      const accountRes = await this.accountService.findAccountById(userId);
      if (accountRes.status && accountRes.data) {
        return accountRes.data.username || `User${userId}`;
      }

      return `User${userId}`;
    } catch (error) {
      console.error('Error getting current username:', error);
      return `User${this.getCurrentUserId()}`;
    }
  }

  // Toggle reply form cho child comments
  toggleReplyFormForChild(childCommentId: number) {
    const key = `child_${childCommentId}`;
    this.showReplyForm[key] = !this.showReplyForm[key];
    if (!this.showReplyForm[key]) {
      this.replyForm[key] = '';
    }
  }

  // Toggle reply form
  toggleReplyForm(commentId: number) {
    this.showReplyForm[commentId] = !this.showReplyForm[commentId];
    if (!this.showReplyForm[commentId]) {
      this.replyForm[commentId] = '';
    }
  }

  // Set rating
  setRating(rating: number) {
    this.newComment.rating = rating;
  }

  // Reset comment form
  resetCommentForm() {
    this.newComment = {
      comment: '',

      rating: 5,
    };
  }

  // Get current user ID
  getCurrentUserId(): number {
    const id = this.authService.getId();
    return id;
  }

  // Generate star array for rating display
  getStarArray(rating: number): boolean[] {
    return Array(5)
      .fill(false)
      .map((_, i) => i < rating);
  }

  // Track by function cho performance
  trackByCommentId(index: number, comment: any): any {
    return comment.id;
  }

  addToCart(product: any) {
    try {
      this.productService
        .findImageOfObjId(this.product.id, 'Product')
        .then((res) => {
          const fullPath =
            this.baseUrl.getBaseUrl() + res.image.path + res.image.imageName;
          this.product.imgUrl = fullPath;
          this.cartService.addToCart(this.product);
        });
      this.cart = this.cartService.getCart();
      console.log('Giỏ hàng sau khi thêm sản phẩm:', this.cart);
      this.messageService.add({
        severity: 'success',
        summary: 'Đã thêm vào giỏ hàng',
        detail: 'Sản phẩm đã được thêm vào giỏ hàng thành công!',
      });
    } catch (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Lỗi khi thêm vào giỏ hàng',
        detail:
          'Đã xảy ra lỗi khi thêm sản phẩm vào giỏ hàng. Vui lòng thử lại sau.',
      });
      console.error('Error adding to cart:', error);
    }
  }
}
