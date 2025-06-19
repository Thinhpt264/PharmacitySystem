import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseUrlService } from 'src/app/service/baseUrl.service';
import { ProductService } from 'src/app/service/product.service';
import { CategoryService } from 'src/app/service/category.service';
import { BrandService } from 'src/app/service/brand.service';

declare var $: any;

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit, AfterViewInit, OnDestroy {
  constructor(
    private productService: ProductService,
    private baseUrl: BaseUrlService,
    private categoryService: CategoryService,
    private fb: FormBuilder,
    private brandService: BrandService
  ) {}

  products: any[] = [];
  categories: any[] = [];
  brands: any[] = [];
  link: any = this.baseUrl.getProductUrl();

  // Form variables
  productForm!: FormGroup;
  selectedFile: File | null = null;
  selectedDescriptionImages: any[] = []; // Thêm array cho hình ảnh mô tả
  isSubmitting = false;

  productTypes: any[] = [];

  ngOnInit(): void {
    console.log('Product component initialized');
    this.initForm();
    this.loadData();
    this.loadProductTypes();
  }

  initForm() {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      categoryId: ['', Validators.required],
      brandId: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(1)]],
      type: [''],
      description: [''],
      manufacturer: [''],
      ingredients: [''],
      notes: [''],
      usage: [''],
      packaging: [''],
    });
  }

  loadData() {
    this.findAll();
    this.loadCategories();
    this.loadBrands();
  }

  loadCategories() {
    this.categoryService
      .findAll()
      .then((res) => {
        this.categories = res.categories;
      })
      .catch((error) => {
        console.error('Error loading categories:', error);
        this.categories = [];
      });
  }

  loadBrands() {
    // Giả sử có BrandService, nếu không thì tạo data mẫu
    this.brandService.findAll().then((res) => {
      this.brands = res;
    });
  }
  loadProductTypes() {
    this.productTypes = [
      { value: 1, label: 'Thuốc viên' },
      { value: 2, label: 'Thuốc nước' },
    ];
  }

  findImageForObj() {
    this.products.forEach((product, index) => {
      if (!product || !product.id) return;

      const tableName = 'Product';
      this.productService
        .findImageOfObjId(product.id, tableName)
        .then((imgRes) => {
          if (!this.products[index]) return;
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

        this.findImageForObj();

        this.products.forEach((product) => {
          this.productService
            .getQuantityRemaining(product.id)
            .then((res) => {
              console.log('Quantity for product', product.id, ':', res.data);
              product.quantity = res.data;
            })
            .catch((error) => {
              console.error(
                'Error getting quantity for product',
                product.id,
                ':',
                error
              );
              product.quantity = 0;
            });
        });
      })
      .catch((error) => {
        console.error('Error loading products:', error);
        this.products = [];
      });
  }

  onImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Vui lòng chọn file ảnh!');
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        alert('Kích thước file không được vượt quá 5MB!');
        return;
      }

      this.selectedFile = file;
      console.log('File selected:', file.name);
    }
  }

  // Thêm methods cho hình ảnh mô tả
  onDescriptionImagesSelected(event: any) {
    const files = Array.from(event.target.files) as File[];

    if (this.selectedDescriptionImages.length + files.length > 10) {
      alert('Chỉ được chọn tối đa 10 hình ảnh mô tả!');
      return;
    }

    files.forEach((file) => {
      if (!file.type.startsWith('image/')) {
        alert(`File ${file.name} không phải là ảnh!`);
        return;
  
      }

      if (file.size > 5 * 1024 * 1024) {
        alert(`File ${file.name} có kích thước quá lớn (>5MB)!`);
        return;
      }

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectedDescriptionImages.push({
          file: file,
          name: file.name,
          preview: e.target.result,
        });
      };
      reader.readAsDataURL(file);
    });

    // Reset input
    event.target.value = '';
  }

  removeDescriptionImage(index: number) {
    this.selectedDescriptionImages.splice(index, 1);
  }

  triggerDescriptionImageUpload() {
    const input = document.querySelector(
      '#descriptionImages'
    ) as HTMLInputElement;
    if (input) {
      input.click();
    }
  }

  addProduct() {
    if (this.productForm.invalid) {
      this.markFormGroupTouched();
      return alert('Vui lòng điền đầy đủ thông tin bắt buộc!');
    }

    this.isSubmitting = true;

    // 1. Tạo object productDTO
    const productDTO = {
      name: this.productForm.value.name,
      categoryId: +this.productForm.value.categoryId,
      brandId: +this.productForm.value.brandId,
      price: +this.productForm.value.price,
      type: this.productForm.value.type,

      description: this.productForm.value.description,

      manufacturer: this.productForm.value.manufacturer,
      ingredient: this.productForm.value.ingredients,
      note: this.productForm.value.notes,
      use: this.productForm.value.usage,
      packaging: this.productForm.value.packaging,
      status: true,
    };
    console.log('Product DTO:', productDTO);

    // 2. Ảnh chính
    const mainImage = this.selectedFile;

    // 3. Ảnh mô tả
    const extraImages = this.selectedDescriptionImages.map(
      (imgObj) => imgObj.file
    );

    // 4. Gọi service
    this.productService
      .createProduct(productDTO, mainImage!, extraImages)
      .then((res) => {
        this.isSubmitting = false;
        if (res.status) {
          alert('Thêm sản phẩm thành công!');
          $('#addProductModal').modal('hide');
          this.resetForm();
          this.findAll();
        } else {
          alert('Lỗi: ' + res.message);
        }
      })
      .catch((err) => {
        this.isSubmitting = false;
        console.error(err);
        alert('Có lỗi xảy ra khi thêm sản phẩm');
      });
  }

  resetForm() {
    this.productForm.reset();
    this.selectedFile = null;
    this.selectedDescriptionImages = []; // Reset description images

    const fileInput = document.getElementById('image') as HTMLInputElement;
    const descInput = document.getElementById(
      'descriptionImages'
    ) as HTMLInputElement;

    if (fileInput) {
      fileInput.value = '';
    }
    if (descInput) {
      descInput.value = '';
    }
  }

  markFormGroupTouched() {
    Object.keys(this.productForm.controls).forEach((key) => {
      this.productForm.get(key)?.markAsTouched();
    });
  }

  getCategoryName(categoryId: number): string {
    const category = this.categories.find((cat) => cat.id === categoryId);
    return category ? category.name : 'N/A';
  }

  getBrandName(brandId: number): string {
    const brand = this.brands.find((br) => br.id === brandId);
    return brand ? brand.name : 'N/A';
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

  getStatusText(status: any): string {
    if (status === true || status === 'true') {
      return 'Hoạt động';
    } else if (status === false || status === 'false') {
      return 'Tạm dừng';
    }
    return 'Không xác định';
  }

  editProduct(id: number): void {
    console.log('Edit product:', id);
    // TODO: Implement edit product logic
  }

  deleteProduct(id: number): void {
    if (confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
      this.productService
        .delete(id)
        .then((res) => {
          if (res && res.status !== false) {
            alert('Xóa sản phẩm thành công!');
            this.findAll();
          } else {
            alert('Xóa sản phẩm thất bại!');
          }
        })
        .catch((error) => {
          console.error('Error deleting product:', error);
          alert('Có lỗi xảy ra khi xóa sản phẩm!');
        });
    }
  }
}
