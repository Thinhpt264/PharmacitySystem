import { Component, OnInit, AfterViewInit } from '@angular/core';
import { BaseUrlService } from 'src/app/service/baseUrl.service';
import { CategoryService } from 'src/app/service/category.service';
import { ProductService } from 'src/app/service/product.service';

declare var $: any;

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit, AfterViewInit {
  constructor(
    private productService: ProductService,
    private baseUrl: BaseUrlService,
    private categoryService: CategoryService
  ) {}
  categories: any = {};
  link: any = this.baseUrl.getBaseUrl();

  ngOnInit(): void {
    console.log('Product component initialized');
    this.findAll();
    this.findByCategoryId(1);
  }

  findAll() {
    this.categoryService.findAllCategory().then((res) => {
      this.categories = res.categories;
      console.log(res);
      this.categories.forEach((category: any) => {
        this.categoryService
          .findImageOfObjId(category.id, 'Category')
          .then((res) => {
            category.image = res.image;
            // console.log(category.image);
            console.log(category.id);
          });
        
      });

    });
  }
  findByCategoryId(id: number) { 
    this.categoryService.findCategoryByCategoryParent(id).then((res) => { 
      console.log(res);
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
}
