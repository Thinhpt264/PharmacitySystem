import { Component, OnInit, AfterViewInit } from '@angular/core';
import { BaseUrlService } from 'src/app/service/baseUrl.service';
import { ProductService } from 'src/app/service/product.service';
import { WareHouseService } from 'src/app/service/warehouse.service';

declare var $: any;

@Component({
  selector: 'app-product',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.css'],
})
export class WareHouseComponent implements OnInit, AfterViewInit {
  products: any[] = [];
  productList: any[] = [];
  link: any;
  selectedBatch: any = null;
  stockDetails: any[] = [];
  batchs: any[] = [];

  // Biến lưu form nhập lô hàng mới
  addBatchForm = {
    batchCode: '',
    supplierName: '',
    importDate: '',
    note: '',
    items: [] as Array<{ productId: any; quantity: any; expiryDate: any }>
  };

  constructor(
    private productService: ProductService,
    private wareHouseService: WareHouseService,
    private baseUrl: BaseUrlService
  ) {
    this.link = this.baseUrl.getProductUrl();
  }

  ngOnInit(): void {
    this.findAll();
  }

  findAll() {
    this.wareHouseService.findAll().then((res) => {
      this.batchs = res.data;
    })
    .catch((error) => {
      this.batchs = [];
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

  openAddBatchModal() {
    // Reset form
    this.addBatchForm = {
      batchCode: '',
      supplierName: '',
      importDate: '',
      note: '',
      items: []
    };
    // Lấy danh sách sản phẩm
    this.productService.findAll().then(res => {
      this.productList = res;
      ($('#addBatchModal') as any).modal('show');
    });
  }

  addBatchItem() {
    this.addBatchForm.items.push({
      productId: '',
      quantity: '',
      expiryDate: ''
    });
  }

  removeBatchItem(i: number) {
    this.addBatchForm.items.splice(i, 1);
  }

  async submitAddBatch() {
    if (
      !this.addBatchForm.batchCode ||
      !this.addBatchForm.supplierName ||
      !this.addBatchForm.importDate ||
      this.addBatchForm.items.length === 0
    ) {
      alert('Vui lòng nhập đầy đủ thông tin và ít nhất 1 sản phẩm!');
      return;
    }
    try {
      await this.wareHouseService.createBatch(this.addBatchForm);
      alert('Thêm lô hàng thành công!');
      ($('#addBatchModal') as any).modal('hide');
      this.findAll();
    } catch (e) {
      alert('Thêm lô hàng thất bại!');
      console.error(e);
    }
  }

  async showBatchDetails(batch: any) {
    this.selectedBatch = batch;
    const items = batch.items ? [...batch.items] : [];
    const augmented = await Promise.all(
      items.map(async it => {
        try {
          const prodRes = await this.productService.findById(it.productId);
          it.productName = prodRes.data.name;
          const imgRes = await this.productService.findImageOfObjId(it.productId, 'Product');
          it.productImageUrl = this.baseUrl.getBaseUrl() + imgRes.image.path + imgRes.image.imageName;
        } catch (e) {
          it.productName = '—';
          it.productImageUrl = '';
        }
        return it;
      })
    );
    this.stockDetails = augmented;
    ($('#stockDetailModal') as any).modal('show');
  }
}