import { Component, OnInit, AfterViewInit } from '@angular/core';
import { BaseUrlService } from 'src/app/service/baseUrl.service';
import { ProductService } from 'src/app/service/product.service';

declare var $: any;

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit, AfterViewInit {
    constructor(
        private productService: ProductService,
        private baseUrl : BaseUrlService
    ) {}
    products: any[] = [];
    link : any = this.baseUrl.getProductUrl();

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
          console.log(fullPath)
        })
        .catch((err) => {
          console.error('Image fetch error for product', product.id, err);
        });
      });
    }
    
    findAll() {
        this.productService.findAll().then(
            (res) => {
                this.products = res;
                console.log(res);
                this.findImageForObj()
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

  deleteProduct(id: number): void {
   
  }

  addProduct(): void {
    console.log('Add new product');
    // Logic thêm sản phẩm mới
  }
  
}
