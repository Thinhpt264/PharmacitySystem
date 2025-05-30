import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CartService } from 'src/app/service/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cart: any[] = []; // Mảng giỏ hàng
  total: number = 0; // Tổng giá trị giỏ hàng (tất cả sản phẩm, không phân biệt tick)
  estimateCost: number = 0; // Tổng giá của các sản phẩm được tick (Tạm tính)
  checkedItemCount: number = 0; // Số sản phẩm được tick
  finalCost: number = 0; // Tổng cộng sau khi tính phí vận chuyển và giảm giá
  shippingFee: number = 30000; // Phí vận chuyển cố định
  discount: number = 20000; // Giảm giá cố định
  isAllChecked: boolean = true; // Biến để theo dõi trạng thái checkbox "Chọn tất cả"



  constructor(
    private cartService: CartService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private cdr: ChangeDetectorRef,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.cart = this.cartService.getCart();
    this.cart.forEach((item) => {
      if (!item.totalPrice) {
        item.totalPrice = item.quantity * item.price;
      }
      if (typeof item.isChecked === 'undefined') {
        item.isChecked = true; // Mặc định tick tất cả khi khởi tạo
      }
    });
    this.updateTotal(); // Tính tổng giá toàn bộ giỏ hàng
    this.updateEstimateCost(); // Tính tổng giá và số lượng sản phẩm được tick
  }

  // Xử lý khi nhấn nút + hoặc -
  updateCart(product: any, status: boolean) {
    this.cartService.updateQuantity(product, status);
    this.updateTotalPrice(product);
    this.cart = [...this.cartService.getCart()];
    this.updateTotal();
    this.updateEstimateCost();
    this.cdr.detectChanges();
  }

  // Xử lý khi thay đổi số lượng trực tiếp trong ô input
  onQuantityChange(product: any) {
    if (product.quantity < 1 || isNaN(product.quantity)) {
      product.quantity = 1;
    }
    this.updateTotalPrice(product);
    this.cartService.saveCart(this.cart);
    this.updateTotal();
    this.updateEstimateCost();
    this.cdr.detectChanges();
  }

  // Xử lý xóa sản phẩm
  deleteItem(productId: any) {
    this.confirmationService.confirm({
      message: 'Bạn có muốn xóa sản phẩm này ra khỏi giỏ hàng không?',
      header: 'Xác nhận xóa',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Có',
      rejectLabel: 'Không',
      accept: () => {
        this.cartService.removeCart(productId);
        this.cart = [...this.cartService.getCart()];
        this.updateTotal();
        this.updateEstimateCost();
        this.messageService.add({
          severity: 'warn',
          summary: 'Xóa khỏi giỏ hàng',
          detail: 'Xóa sản phẩm khỏi giỏ hàng thành công',
        });
        this.cdr.detectChanges();
      },
      reject: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Hủy xóa',
          detail: 'Hủy xóa sản phẩm',
        });
      },
    });
  }

  // Cập nhật tổng giá cho từng sản phẩm
  private updateTotalPrice(product: any) {
    product.totalPrice = product.quantity * product.price;
  }

  // Cập nhật tổng giá trị của toàn bộ giỏ hàng (tất cả sản phẩm)
  private updateTotal() {
    this.total = this.cart.reduce(
      (sum, item) => sum + (item.totalPrice || 0),
      0
    );
  }

  // Tính toán estimateCost, checkedItemCount và finalCost
  updateEstimateCost() {
    // Đếm số sản phẩm được tick và tính tổng giá của chúng
    this.checkedItemCount = this.cart.filter((item) => item.isChecked).length;
    this.estimateCost = this.cart
      .filter((item) => item.isChecked)
      .reduce((sum, item) => sum + (item.totalPrice || 0), 0);

    // Tính finalCost: estimateCost + phí vận chuyển - giảm giá
    this.finalCost = this.estimateCost + this.shippingFee - this.discount;
    if (this.finalCost < 0) this.finalCost = 0; // Đảm bảo finalCost không âm
  }

  // Xử lý khi checkbox thay đổi
  onCheckboxChange() {
    this.updateEstimateCost();
    this.cdr.detectChanges();
  }
  getCheckedItems(): any[] {
  return this.cart.filter(item => item.isChecked);
  }
  proceedToCheckout() {
  const selectedItems = this.getCheckedItems();

  if (selectedItems.length === 0) {
    this.messageService.add({
      severity: 'warn',
      summary: 'Không có sản phẩm',
      detail: 'Vui lòng chọn ít nhất một sản phẩm để thanh toán',
    });
    return
  }
  this.cartService.saveSelectedItems(selectedItems);
    
  console.log('Sản phẩm đã chọn để thanh toán:', this.cartService.getSelectedItems());
  
  this.router.navigate(['/checkout']);

  // Gửi selectedItems lên backend hoặc chuyển sang trang thanh toán
  // this.router.navigate(['/checkout'], { state: { items: selectedItems } });
}
}
