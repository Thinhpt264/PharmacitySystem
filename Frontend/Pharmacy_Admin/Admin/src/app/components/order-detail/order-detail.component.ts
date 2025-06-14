import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/service/account.service';
import { BaseUrlService } from 'src/app/service/baseUrl.service';
import { CategoryService } from 'src/app/service/category.service';
import { OrderDetailService } from 'src/app/service/order-detail.service';
import { OrderService } from 'src/app/service/order.service';
import { ProductService } from 'src/app/service/product.service';
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css'],
})
export class OrderDetailComponent implements OnInit, AfterViewInit {
  orders: any[] = [];
  selectedOrder: any = null;
  orderDetails: any[] = [];
  link: any = this.baseUrl.getBaseUrl();
  products: any[] = []; // Sửa từ {} thành []

  constructor(
    private productService: ProductService,
    private baseUrl: BaseUrlService,
    private orderService: OrderService,
    private accountService: AccountService,
    private orderDetailService: OrderDetailService
  ) {}

  ngOnInit(): void {
    this.loadProducts(); // Load products trước
    this.findAll();
  }

  findAll() {
    this.orderService.findAll().then((res) => {
      this.orders = res.data.filter((order: any) => order.status === 1); // Bỏ dòng duplicate
      this.orders.forEach((order: any) => {
        this.accountService.findById(order.accountId).then((res) => {
          order.user = res;
          console.log(order.user.username);
        });
      });
    });
  }

  // Load tất cả products một lần duy nhất
  loadProducts() {
    this.productService
      .findAll()
      .then((res) => {
        this.products = res;
        console.log('Products loaded:', this.products);
      })
      .catch((error) => {
        console.error('Error loading products:', error);
        this.products = [];
      });
  }

  // Hàm map tên sản phẩm vào orderDetails
  mapProductNames() {
    this.orderDetails.forEach((detail: any) => {
      // Tìm product theo productId
      const product = this.products.find((p) => p.id == detail.productId);

      if (product) {
        detail.productName = product.name;
      } else {
        detail.productName = 'Sản phẩm không tồn tại';
      }
    });

    console.log('Mapped orderDetails:', this.orderDetails);
  }

  // Mở modal và load chi tiết đơn hàng
  openOrderDetails(orderId: number) {
    // Tìm order được chọn
    this.selectedOrder = this.orders.find((order) => order.id === orderId);

    // Gọi API để lấy chi tiết đơn hàng
    this.orderDetailService
      .findByOrderId(orderId)
      .then((res) => {
        this.orderDetails = res.data || res || [];
        console.log('Order details:', this.orderDetails);

        // Map tên sản phẩm
        this.mapProductNames();

        // Khởi tạo DataTable cho modal sau khi có data
        setTimeout(() => {
          this.initModalDataTable();
        }, 200);
      })
      .catch((error) => {
        console.error('Error loading order details:', error);
        this.orderDetails = [];
      });
  }

  // Khởi tạo DataTable cho modal
  initModalDataTable() {
    if ($.fn.DataTable.isDataTable('#basic-datatable1')) {
      $('#basic-datatable1').DataTable().destroy();
    }

    setTimeout(() => {
      $('#basic-datatable1').DataTable({
        responsive: true,
        pageLength: 5,
        language: {
          decimal: '',
          emptyTable: 'Không có sản phẩm nào trong đơn hàng',
          info: 'Hiển thị _START_ đến _END_ của _TOTAL_ sản phẩm',
          infoEmpty: 'Hiển thị 0 đến 0 của 0 sản phẩm',
          infoFiltered: '(lọc từ _MAX_ tổng số sản phẩm)',
          lengthMenu: 'Hiển thị _MENU_ sản phẩm',
          search: 'Tìm kiếm sản phẩm:',
          zeroRecords: 'Không tìm thấy sản phẩm nào',
          paginate: {
            first: 'Đầu',
            last: 'Cuối',
            next: 'Tiếp',
            previous: 'Trước',
          },
        },
      });
    }, 200);
  }

  // Tính tổng số lượng
  getTotalQuantity(): number {
    return this.orderDetails.reduce(
      (total, detail) => total + (detail.quantity || 0),
      0
    );
  }

  // Tính tổng tiền - sử dụng unitPrice
  getTotalAmount(): number {
    return this.orderDetails.reduce(
      (total, detail) =>
        total + (detail.unitPrice || 0) * (detail.quantity || 0),
      0
    );
  }

  // Duyệt đơn hàng từ modal
  approveOrderFromModal() {
    if (this.selectedOrder) {
      this.approveOrder(this.selectedOrder.id);
      $('#orderDetailModal').modal('hide');
    }
  }

  // In đơn hàng
  printOrder() {
    window.print();
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
          lengthMenu: 'Hiển thị _MENU_ mục',
          search: 'Tìm kiếm:',
          zeroRecords: 'Không tìm thấy kết quả nào',
          paginate: {
            first: 'Đầu',
            last: 'Cuối',
            next: 'Tiếp',
            previous: 'Trước',
          },
        },
      });
    }, 200);
  }

  ngOnDestroy(): void {
    if ($.fn.DataTable.isDataTable('#basic-datatable')) {
      $('#basic-datatable').DataTable().destroy();
    }
    if ($.fn.DataTable.isDataTable('#basic-datatable1')) {
      $('#basic-datatable1').DataTable().destroy();
    }
  }

  approveOrder(orderId: number) {
    this.orderService.acceptOrder(orderId).then((res) => {
      console.log(res);
      if (res.status) {
        this.findAll();
        alert('Đơn hàng đã được duyệt thành công!');
      } else {
        alert('Duyệt đơn hàng thất bại: ' + res.message);
      }
    });
  }
}
