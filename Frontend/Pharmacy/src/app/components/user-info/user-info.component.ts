import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DeliveryInforService } from 'src/app/service/delivery-info.service';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css'],
})
export class UserInfoComponent implements OnInit, OnDestroy {
  showAddressModal: boolean = false;
  private scrollY = 0;

  // Thông tin người dùng
  userInfo: any = {
    id: 1,
    fullName: 'Nguyễn Văn A',
    email: 'nguyenvana@gmail.com',
    phone: '0123456789',
    avatar: 'assets/img/avatar/default-avatar.jpg',
    joinDate: '2024-01-15',
  };
  userAddresses1: any;
  // Danh sách địa chỉ của người dùng
 

  // Form thêm địa chỉ
  addressForm: any = {
    phone: '',
    provinceCode: '',
    provinceName: '',
    districtCode: '',
    districtName: '',
    wardCode: '',
    wardName: '',
    addressDetail: '',
    isDefault: false,
  };

  // Dữ liệu tĩnh tỉnh thành
  provinces: any[] = [
    { code: 1, name: 'Thành phố Hà Nội' },
    { code: 2, name: 'Tỉnh Hà Giang' },
    { code: 4, name: 'Tỉnh Cao Bằng' },
    { code: 6, name: 'Tỉnh Bắc Kạn' },
    { code: 8, name: 'Tỉnh Tuyên Quang' },
    { code: 10, name: 'Tỉnh Lào Cai' },
    { code: 11, name: 'Tỉnh Điện Biên' },
    { code: 12, name: 'Tỉnh Lai Châu' },
    { code: 14, name: 'Tỉnh Sơn La' },
    { code: 15, name: 'Tỉnh Yên Bái' },
    { code: 17, name: 'Tỉnh Hoà Bình' },
    { code: 19, name: 'Tỉnh Thái Nguyên' },
    { code: 20, name: 'Tỉnh Lạng Sơn' },
    { code: 22, name: 'Tỉnh Quảng Ninh' },
    { code: 24, name: 'Tỉnh Bắc Giang' },
    { code: 25, name: 'Tỉnh Phú Thọ' },
    { code: 26, name: 'Tỉnh Vĩnh Phúc' },
    { code: 27, name: 'Tỉnh Bắc Ninh' },
    { code: 30, name: 'Tỉnh Hải Dương' },
    { code: 31, name: 'Thành phố Hải Phòng' },
    { code: 33, name: 'Tỉnh Hưng Yên' },
    { code: 34, name: 'Tỉnh Thái Bình' },
    { code: 35, name: 'Tỉnh Hà Nam' },
    { code: 36, name: 'Tỉnh Nam Định' },
    { code: 37, name: 'Tỉnh Ninh Bình' },
    { code: 38, name: 'Tỉnh Thanh Hóa' },
    { code: 40, name: 'Tỉnh Nghệ An' },
    { code: 42, name: 'Tỉnh Hà Tĩnh' },
    { code: 44, name: 'Tỉnh Quảng Bình' },
    { code: 45, name: 'Tỉnh Quảng Trị' },
    { code: 46, name: 'Tỉnh Thừa Thiên Huế' },
    { code: 48, name: 'Thành phố Đà Nẵng' },
    { code: 49, name: 'Tỉnh Quảng Nam' },
    { code: 51, name: 'Tỉnh Quảng Ngãi' },
    { code: 52, name: 'Tỉnh Bình Định' },
    { code: 54, name: 'Tỉnh Phú Yên' },
    { code: 56, name: 'Tỉnh Khánh Hòa' },
    { code: 58, name: 'Tỉnh Ninh Thuận' },
    { code: 60, name: 'Tỉnh Bình Thuận' },
    { code: 62, name: 'Tỉnh Kon Tum' },
    { code: 64, name: 'Tỉnh Gia Lai' },
    { code: 66, name: 'Tỉnh Đắk Lắk' },
    { code: 67, name: 'Tỉnh Đắk Nông' },
    { code: 68, name: 'Tỉnh Lâm Đồng' },
    { code: 70, name: 'Tỉnh Bình Phước' },
    { code: 72, name: 'Tỉnh Tây Ninh' },
    { code: 74, name: 'Tỉnh Bình Dương' },
    { code: 75, name: 'Tỉnh Đồng Nai' },
    { code: 77, name: 'Tỉnh Bà Rịa - Vũng Tàu' },
    { code: 79, name: 'Thành phố Hồ Chí Minh' },
    { code: 80, name: 'Tỉnh Long An' },
    { code: 82, name: 'Tỉnh Tiền Giang' },
    { code: 83, name: 'Tỉnh Bến Tre' },
    { code: 84, name: 'Tỉnh Trà Vinh' },
    { code: 86, name: 'Tỉnh Vĩnh Long' },
    { code: 87, name: 'Tỉnh Đồng Tháp' },
    { code: 89, name: 'Tỉnh An Giang' },
    { code: 91, name: 'Tỉnh Kiên Giang' },
    { code: 92, name: 'Thành phố Cần Thơ' },
    { code: 93, name: 'Tỉnh Hậu Giang' },
    { code: 94, name: 'Tỉnh Sóc Trăng' },
    { code: 95, name: 'Tỉnh Bạc Liêu' },
    { code: 96, name: 'Tỉnh Cà Mau' },
  ];

  districts: any[] = [];
  wards: any[] = [];

  // Loading states
  loadingProvinces: boolean = false;
  loadingDistricts: boolean = false;
  loadingWards: boolean = false;
  isSubmitting: boolean = false;

  constructor(
    private http: HttpClient,
    private delioveryInfoService: DeliveryInforService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Không cần load provinces từ API nữa vì đã có dữ liệu tĩnh
    this.getDeliveryInfoByAccountId(this.authService.getAccount().id);
  }

  ngOnDestroy(): void {
    if (this.showAddressModal) {
      this.enableBodyScroll();
    }
  }

  // Thêm địa chỉ mới - Cập nhật để sử dụng API

  // Load danh sách quận huyện (dữ liệu tĩnh)
  loadDistricts(provinceCode: string): void {
    if (!provinceCode) {
      this.districts = [];
      this.wards = [];
      return;
    }

    this.loadingDistricts = true;

    // Simulate loading
    setTimeout(() => {
      // Dữ liệu mẫu cho các tỉnh thành chính
      const districtData: any = {
        '1': [
          // Hà Nội
          { code: 1, name: 'Quận Ba Đình' },
          { code: 2, name: 'Quận Hoàn Kiếm' },
          { code: 3, name: 'Quận Tây Hồ' },
          { code: 4, name: 'Quận Long Biên' },
          { code: 5, name: 'Quận Cầu Giấy' },
          { code: 6, name: 'Quận Đống Đa' },
          { code: 7, name: 'Quận Hai Bà Trưng' },
          { code: 8, name: 'Quận Hoàng Mai' },
          { code: 9, name: 'Quận Thanh Xuân' },
        ],
        '79': [
          // TP.HCM
          { code: 760, name: 'Quận 1' },
          { code: 769, name: 'Quận 2' },
          { code: 770, name: 'Quận 3' },
          { code: 771, name: 'Quận 4' },
          { code: 772, name: 'Quận 5' },
          { code: 773, name: 'Quận 6' },
          { code: 774, name: 'Quận 7' },
          { code: 775, name: 'Quận 8' },
          { code: 776, name: 'Quận 9' },
          { code: 777, name: 'Quận 10' },
          { code: 778, name: 'Quận 11' },
          { code: 779, name: 'Quận 12' },
          { code: 780, name: 'Quận Thủ Đức' },
          { code: 781, name: 'Quận Gò Vấp' },
          { code: 782, name: 'Quận Bình Thạnh' },
          { code: 783, name: 'Quận Tân Bình' },
          { code: 784, name: 'Quận Tân Phú' },
          { code: 785, name: 'Quận Phú Nhuận' },
        ],
        '48': [
          // Đà Nẵng
          { code: 490, name: 'Quận Hải Châu' },
          { code: 491, name: 'Quận Thanh Khê' },
          { code: 492, name: 'Quận Sơn Trà' },
          { code: 493, name: 'Quận Ngũ Hành Sơn' },
          { code: 494, name: 'Quận Liên Chiểu' },
          { code: 495, name: 'Quận Cẩm Lệ' },
        ],
      };

      this.districts = districtData[provinceCode] || [
        { code: 999, name: 'Quận/Huyện mẫu 1' },
        { code: 998, name: 'Quận/Huyện mẫu 2' },
        { code: 997, name: 'Quận/Huyện mẫu 3' },
      ];

      this.wards = [];
      this.addressForm.districtCode = '';
      this.addressForm.wardCode = '';
      this.loadingDistricts = false;
    }, 500);
  }

  // Load danh sách phường xã (dữ liệu tĩnh)
  loadWards(districtCode: string): void {
    if (!districtCode) {
      this.wards = [];
      return;
    }

    this.loadingWards = true;

    // Simulate loading
    setTimeout(() => {
      // Dữ liệu mẫu cho các quận huyện chính
      const wardData: any = {
        '760': [
          // Quận 1 - TP.HCM
          { code: 26734, name: 'Phường Bến Nghé' },
          { code: 26737, name: 'Phường Bến Thành' },
          { code: 26740, name: 'Phường Cầu Kho' },
          { code: 26743, name: 'Phường Cầu Ông Lãnh' },
          { code: 26746, name: 'Phường Cô Giang' },
          { code: 26749, name: 'Phường Đa Kao' },
          { code: 26752, name: 'Phường Nguyễn Cư Trinh' },
          { code: 26755, name: 'Phường Nguyễn Thái Bình' },
          { code: 26758, name: 'Phường Phạm Ngũ Lão' },
          { code: 26761, name: 'Phường Tân Định' },
        ],
        '769': [
          // Quận 2 - TP.HCM
          { code: 26764, name: 'Phường An Khánh' },
          { code: 26767, name: 'Phường An Lợi Đông' },
          { code: 26770, name: 'Phường An Phú' },
          { code: 26773, name: 'Phường Bình An' },
          { code: 26776, name: 'Phường Bình Khánh' },
          { code: 26779, name: 'Phường Bình Trưng Đông' },
          { code: 26782, name: 'Phường Bình Trưng Tây' },
          { code: 26785, name: 'Phường Cát Lái' },
          { code: 26788, name: 'Phường Thạnh Mỹ Lợi' },
          { code: 26791, name: 'Phường Thủ Thiêm' },
        ],
        '1': [
          // Quận Ba Đình - Hà Nội
          { code: 1, name: 'Phường Phúc Xá' },
          { code: 4, name: 'Phường Trúc Bạch' },
          { code: 6, name: 'Phường Vĩnh Phúc' },
          { code: 7, name: 'Phường Cống Vị' },
          { code: 8, name: 'Phường Liễu Giai' },
          { code: 10, name: 'Phường Nguyễn Trung Trực' },
          { code: 13, name: 'Phường Quán Thánh' },
          { code: 16, name: 'Phường Ngọc Hà' },
          { code: 19, name: 'Phường Điện Biên' },
          { code: 22, name: 'Phường Đội Cấn' },
          { code: 25, name: 'Phường Ngọc Khánh' },
          { code: 28, name: 'Phường Kim Mã' },
          { code: 31, name: 'Phường Giảng Võ' },
          { code: 34, name: 'Phường Thành Công' },
        ],
      };

      this.wards = wardData[districtCode] || [
        { code: 99999, name: 'Phường/Xã mẫu 1' },
        { code: 99998, name: 'Phường/Xã mẫu 2' },
        { code: 99997, name: 'Phường/Xã mẫu 3' },
        { code: 99996, name: 'Phường/Xã mẫu 4' },
        { code: 99995, name: 'Phường/Xã mẫu 5' },
      ];

      this.addressForm.wardCode = '';
      this.loadingWards = false;
    }, 300);
  }

  // Xử lý khi chọn tỉnh thành
  onProvinceChange(event: any): void {
    const provinceCode = event.target.value;
    const selectedProvince = this.provinces.find(
      (p) => p.code.toString() === provinceCode
    );

    this.addressForm.provinceCode = provinceCode;
    this.addressForm.provinceName = selectedProvince
      ? selectedProvince.name
      : '';

    this.loadDistricts(provinceCode);
  }

  // Xử lý khi chọn quận huyện
  onDistrictChange(event: any): void {
    const districtCode = event.target.value;
    const selectedDistrict = this.districts.find(
      (d) => d.code.toString() === districtCode
    );

    this.addressForm.districtCode = districtCode;
    this.addressForm.districtName = selectedDistrict
      ? selectedDistrict.name
      : '';

    this.loadWards(districtCode);
  }

  // Xử lý khi chọn phường xã
  onWardChange(event: any): void {
    const wardCode = event.target.value;
    const selectedWard = this.wards.find((w) => w.code.toString() === wardCode);

    this.addressForm.wardCode = wardCode;
    this.addressForm.wardName = selectedWard ? selectedWard.name : '';
  }

  // Mở modal thêm địa chỉ
  openAddressModal(): void {
    this.showAddressModal = true;
    this.resetAddressForm();
    this.disableBodyScroll();
  }

  // Đóng modal
  closeAddressModal(): void {
    this.showAddressModal = false;
    this.enableBodyScroll();
  }

  // Click vào backdrop
  onBackdropClick(event: any): void {
    if (event.target === event.currentTarget) {
      this.closeAddressModal();
    }
  }

  // Reset form
  resetAddressForm(): void {
    this.addressForm = {
      phone: '',
      provinceCode: '',
      provinceName: '',
      districtCode: '',
      districtName: '',
      wardCode: '',
      wardName: '',
      addressDetail: '',
      isDefault: false,
    };
    this.districts = [];
    this.wards = [];
  }

  // Validate form
  validateForm(): boolean {
    if (!this.addressForm.phone.trim()) {
      alert('Vui lòng nhập số điện thoại');
      return false;
    }
    if (!this.addressForm.provinceCode) {
      alert('Vui lòng chọn tỉnh thành');
      return false;
    }
    if (!this.addressForm.districtCode) {
      alert('Vui lòng chọn quận huyện');
      return false;
    }
    if (!this.addressForm.wardCode) {
      alert('Vui lòng chọn phường xã');
      return false;
    }
    if (!this.addressForm.addressDetail.trim()) {
      alert('Vui lòng nhập địa chỉ chi tiết');
      return false;
    }
    return true;
  }

  // Thêm địa chỉ mới
  async addAddress(): Promise<void> {
    if (!this.validateForm()) {
      return;
    }

    // Ngăn submit nhiều lần
    if (this.isSubmitting) {
      return;
    }

    this.isSubmitting = true;

    try {
      // Tạo object theo format API yêu cầu
      const addressData = {
        accountId: this.authService.getAccount().id,
        addressDetail: this.addressForm.addressDetail.trim(),
        district: this.addressForm.districtName,
        phone: this.addressForm.phone.trim(),
        province: this.addressForm.provinceName,
        status: 1,
        ward: this.addressForm.wardName,
      };

      console.log('Sending address data:', addressData);

      // Gọi API create
      const response = await this.delioveryInfoService.create(addressData);

      console.log('Address created successfully:', response);

      // Nếu đặt làm địa chỉ mặc định, cập nhật các địa chỉ khác
      if (
        this.addressForm.isDefault &&
        this.userAddresses1 &&
        this.userAddresses1.length > 0
      ) {
        // Reset tất cả địa chỉ hiện tại về không mặc định
        this.userAddresses1.forEach((addr: any) => {
          addr.isDefault = false;
        });
      }

      // Thêm địa chỉ mới vào danh sách hiển thị
      const newAddress = {
        id: response.data ? response.data.id : Date.now(), // Sử dụng ID từ response hoặc timestamp
        phone: addressData.phone,
        province: addressData.province,
        district: addressData.district,
        ward: addressData.ward,
        addressDetail: addressData.addressDetail,
        fullAddress: `${addressData.addressDetail}, ${addressData.ward}, ${addressData.district}, ${addressData.province}`,
        isDefault: this.addressForm.isDefault,
        status: addressData.status,
      };

      if (!this.userAddresses1) {
        this.userAddresses1 = [];
      }

      this.userAddresses1.push(newAddress);

      // Lưu địa chỉ mặc định vào session nếu cần
      if (this.addressForm.isDefault) {
        const newIndex = this.userAddresses1.length - 1;
        sessionStorage.setItem('defaultAddress', newIndex.toString());
        sessionStorage.setItem('defaultAddressId', newAddress.id.toString());
        console.log(
          'Đã lưu địa chỉ mặc định mới vào session tại vị trí:',
          newIndex
        );
      }

      alert('Thêm địa chỉ thành công!');
      this.closeAddressModal();

      // Reload danh sách địa chỉ để đảm bảo dữ liệu đồng bộ
      this.getDeliveryInfoByAccountId(this.authService.getAccount().id);
    } catch (error) {
      console.error('Error creating address:', error);
      alert('Có lỗi xảy ra khi thêm địa chỉ. Vui lòng thử lại!');
    } finally {
      this.isSubmitting = false;
    }
  }

  // Đặt địa chỉ mặc định
  setDefaultAddress(addressId: number): void {
    let defaultIndex = -1;

    this.userAddresses1.forEach((addr, index) => {
      if (addr.id === addressId) {
        addr.isDefault = true;
        defaultIndex = index; // Lưu vị trí của phần tử được đặt làm mặc định
      } else {
        addr.isDefault = false;
      }
    });

    // Lưu vị trí vào sessionStorage
    if (defaultIndex !== -1) {
      sessionStorage.setItem('defaultAddress', defaultIndex.toString());
      sessionStorage.setItem('defaultAddressId', addressId.toString());
      console.log('Đã lưu địa chỉ mặc định tại vị trí:', defaultIndex);
    }

    alert('Đã đặt làm địa chỉ mặc định!');
  }

  // Xóa địa chỉ
  deleteAddress(addressId: number): void {
    if (confirm('Bạn có chắc chắn muốn xóa địa chỉ này?')) {
      this.userAddresses1 = this.userAddresses1.filter(
        (addr) => addr.id !== addressId
      );
      alert('Đã xóa địa chỉ!');
    }
  }

  // Upload avatar
  onAvatarChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.userInfo.avatar = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  // Scroll management
  private disableBodyScroll(): void {
    this.scrollY = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${this.scrollY}px`;
    document.body.style.width = '100%';
    document.body.classList.add('modal-open');
  }

  private enableBodyScroll(): void {
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    document.body.classList.remove('modal-open');
    window.scrollTo(0, this.scrollY);
  }

  private getDeliveryInfoByAccountId(accountId: any) {
    this.delioveryInfoService.findDeliveryInfoByAccountId(accountId).then(
      (response) => {
        console.log(response.data);
        this.userAddresses1 = response.data;
        var index = sessionStorage.getItem('defaultAddress');
        // Đặt địa chỉ đầu tiên là mặc định nếu không có địa chỉ nào được đánh dấu là mặc địnhi
        this.userAddresses1[index].isDefault = true; // Giả sử địa chỉ đầu tiên là mặc định
      },
      (error) => {
        console.error('Error fetching delivery info:', error);
      }
    );
  }
}
