
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/service/account.service';
import { BaseUrlService } from 'src/app/service/baseUrl.service';
import { CategoryService } from 'src/app/service/category.service';
import { OrderService } from 'src/app/service/order.service';
import { ProductService } from 'src/app/service/product.service';
declare var $: any;
@Component({
  selector: 'app-root',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent implements OnInit, AfterViewInit {
  // Khai báo các biến và dịch vụ cần thiết
  constructor(
    private productService: ProductService,
    private baseUrl: BaseUrlService,
    private orderService: OrderService,
    private accountService: AccountService,
  ) {}
  orders: any = {};
  link: any = this.baseUrl.getBaseUrl();

  ngOnInit(): void {
    this.findAll();
  }

  findAll() {
    this.orderService.findAll().then((res) => {
      this.orders = res.data;
      this.orders = res.data.filter((order: any) => order.status === 0);
      this.orders.forEach((order: any) => {
        // Lấy thông tin người dùng từ dịch vụ accountService
        this.accountService.findById(order.accountId).then((res) => {
          order.user = res; 
          console.log(order.user.username);
        });
       
      });
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

  editProduct(id: number): void {
    console.log('Edit product:', id);
    // Logic sửa sản phẩm
  }

  deleteProduct(id: number): void {}

  addProduct(): void {
    console.log('Add new product');
    // Logic thêm sản phẩm mới
  }
    approveOrder(orderId: number) {
        this.orderService.acceptOrder(orderId).then((res) => { 
            console.log(res);
            if (res.status) {
                this.findAll(); // Cập nhật danh sách đơn hàng sau khi duyệt
                alert('Đơn hàng đã được duyệt thành công!');
            } else {
                alert('Duyệt đơn hàng thất bại: ' + res.message);
            }
        });
     }

}
