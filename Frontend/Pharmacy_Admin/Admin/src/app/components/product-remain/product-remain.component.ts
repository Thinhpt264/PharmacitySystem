import { Component, OnInit, AfterViewInit } from '@angular/core';
import { BaseUrlService } from 'src/app/service/baseUrl.service';
import { ProductService } from 'src/app/service/product.service';

declare var $: any;

@Component({
  selector: 'app-product',
  templateUrl: './product-remain.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductRemainComponent implements OnInit, AfterViewInit {
  constructor(
    private productService: ProductService,
    private baseUrl: BaseUrlService
  ) {}
  products: any[] = [];
  link: any = this.baseUrl.getProductUrl();
  selectedProduct: any = null;
  stockDetails: any[] = [];

  ngOnInit(): void {
    console.log('Product component initialized');
    this.findAll();
  }
  findImageForObj() {
    this.products.forEach((product, index) => {
      if (!product || !product.id) return;

      const tableName = 'Product';
      this.productService
        .findImageOfObjId(product.id, tableName)
        .then((imgRes) => {
          if (!this.products[index]) return; // Kiểm tra lại trước khi gán
          const fullPath =
            this.baseUrl.getBaseUrl() +
            imgRes.image.path +
            imgRes.image.imageName;
          this.products[index].imageUrl = fullPath;
          console.log(fullPath);
        })
        .catch((err) => {
          console.error('Image fetch error for product', product.id, err);
        });
    });
  }

  findAll() {
    this.productService
      .findAll()
      .then((res) => {
        this.products = res;
        console.log('Products loaded:', res);

        // Gọi findImageForObj trước
        this.findImageForObj();

        // Sau đó map quantity cho từng product
        this.products.forEach((product) => {
          this.productService
            .getQuantityRemaining(product.id)
            .then((res) => {
              console.log('Quantity for product', product.id, ':', res.data);
              product.quantity = res.data; // Gán số lượng còn lại cho sản phẩm
            })
            .catch((error) => {
              console.error(
                'Error getting quantity for product',
                product.id,
                ':',
                error
              );
              product.quantity = 0; // Mặc định là 0 nếu lỗi
            });
        });
      })
      .catch((error) => {
        console.error('Error loading products:', error);
        this.products = [];
      });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      $('#basic-datatable').DataTable({
        responsive: true,
        pageLength: 10,
        language: {
          decimal: '',
          emptyTable: 'Không có dữ liệu trong bảng',
          info: 'Hiển thị _START_ đến _END_ của _TOTAL_ mục',
          infoEmpty: 'Hiển thị 0 đến 0 của 0 mục',
          infoFiltered: '(lọc từ _MAX_ tổng số mục)',
          infoPostFix: '',
          thousands: ',',
          lengthMenu: 'Hiển thị _MENU_ mục',
          loadingRecords: 'Đang tải...',
          processing: 'Đang xử lý...',
          search: 'Tìm kiếm:',
          searchPlaceholder: 'Nhập từ khóa...',
          zeroRecords: 'Không tìm thấy kết quả nào',
          paginate: {
            first: 'Đầu',
            last: 'Cuối',
            next: 'Tiếp',
            previous: 'Trước',
          },
          aria: {
            sortAscending: ': Sắp xếp tăng dần',
            sortDescending: ': Sắp xếp giảm dần',
          },
        },
      });
    }, 200);
  }

  ngOnDestroy(): void {
    // Cleanup khi component bị destroy
    if ($.fn.DataTable.isDataTable('#basic-datatable')) {
      $('#basic-datatable').DataTable().destroy();
    }
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'true':
        return 'badge-success-lighten';
      case 'false':
        return 'badge-warning-lighten';
      case 'Hết hàng':
        return 'badge-danger-lighten';
      default:
        return 'badge-secondary-lighten';
    }
  }

  editProduct(id: number): void {
    console.log('Edit product:', id);
    // Logic sửa sản phẩm
  }

  deleteProduct(id: number): void {}

  addProduct(): void {
    console.log('Add new product');
    // Logic thêm sản phẩm mới
  }
  // Hiển thị chi tiết tồn kho
  showStockDetails(productId: number) {
    // Tìm sản phẩm được chọn
    this.selectedProduct = this.products.find((p) => p.id === productId);

    Promise.all([
      this.productService.getQuantityRemaining(productId),
      this.productService.getQuantityExpiried(productId),
      this.productService.getQuantityExpiring(productId), // Thêm API gần hết hạn
    ])
      .then(([remainingRes, expiredRes, expiringRes]) => {
        console.log('Raw remainingRes:', remainingRes);
        console.log('Raw expiredRes:', expiredRes);
        console.log('Raw expiringRes:', expiringRes);

        // Xử lý số lượng còn lại
        let remainingQty = 0;
        if (remainingRes && remainingRes.data !== undefined) {
          remainingQty = Number(remainingRes.data);
        } else if (remainingRes !== undefined) {
          remainingQty = Number(remainingRes);
        }

        // Xử lý số lượng hết hạn
        let expiredQty = 0;
        if (expiredRes && expiredRes.data !== undefined) {
          expiredQty = Number(expiredRes.data);
        } else if (expiredRes !== undefined) {
          expiredQty = Number(expiredRes);
        }

        // Xử lý số lượng gần hết hạn
        let expiringQty = 0;
        if (expiringRes && expiringRes.data !== undefined) {
          expiringQty = Number(expiringRes.data);
        } else if (expiringRes !== undefined) {
          expiringQty = Number(expiringRes);
        }

        // Gán giá trị đã xử lý
        this.selectedProduct.remainingQuantity = remainingQty;
        this.selectedProduct.expiredQuantity = expiredQty;
        this.selectedProduct.expiringQuantity = expiringQty; // Thêm quantity gần hết hạn

        console.log(
          'Processed remaining quantity:',
          this.selectedProduct.remainingQuantity
        );
        console.log(
          'Processed expired quantity:',
          this.selectedProduct.expiredQuantity
        );
        console.log(
          'Processed expiring quantity:',
          this.selectedProduct.expiringQuantity
        );
      })
      .catch((error) => {
        console.error('Error loading stock details:', error);
        this.selectedProduct.expiredQuantity = 0;
        this.selectedProduct.remainingQuantity = 0;
        this.selectedProduct.expiringQuantity = 0; // Reset gần hết hạn
      });
  }

  // Cập nhật getTotalStock()
  getTotalStock(): number {
    if (!this.selectedProduct) return 0;
    return this.selectedProduct.remainingQuantity || 0;
  }

  // Cập nhật getValidStock() - trừ cả hết hạn và gần hết hạn
  getValidStock(): number {
    if (!this.selectedProduct) return 0;
    return (
      this.selectedProduct.remainingQuantity -
        this.selectedProduct.expiredQuantity 
    );
  }

  // Thêm method getExpiringStock()
  getExpiringStock(): number {
    if (!this.selectedProduct) return 0;
    return this.selectedProduct.expiringQuantity || 0;
  }

  getExpiredStock(): number {
    if (!this.selectedProduct) return 0;
    return this.selectedProduct.expiredQuantity || 0;
  }

  // Kiểm tra hết hạn
  isExpired(expiryDate: string): boolean {
    if (!expiryDate) return false;
    const today = new Date();
    const expiry = new Date(expiryDate);
    return expiry < today;
  }

  // In báo cáo tồn kho
  printStockReport() {
    window.print();
  }
}
