import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';
import { CheckoutService } from 'src/app/service/checkout.service';
import { DeliveryInforService } from 'src/app/service/delivery-info.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  selectedItems: any[] = [];
  totalPrice: number = 0;
  account: any;
  formValues: any = {};

  // Thêm các biến cho địa chỉ
  allAddresses: any[] = []; // Tất cả địa chỉ từ API
  defaultAddress: any = null; // Địa chỉ mặc định
  otherAddresses: any[] = []; // Các địa chỉ khác
  selectedAddressId: number | null = null;
  selectedAddress: any = null;
  loadingAddresses: boolean = false;
  showAllAddresses: boolean = false; // Biến để điều khiển hiển thị tất cả địa chỉ

  constructor(
    private cartService: CartService,
    private checkoutService: CheckoutService,
    private authService: AuthService,
    private deliveryInfoService: DeliveryInforService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.selectedItems = this.cartService.getSelectedItems();
    console.log('✅ Selected items:', this.selectedItems);
    this.totalPrice = this.selectedItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const accountData = this.authService.getAccount();
    if (accountData) {
      this.account = accountData;
      console.log('🧑 Account loaded from session:', this.account);

      // Load thông tin cá nhân vào form
      this.formValues = {
        fullName: this.account.fullName || '',
        email: this.account.email || '',
        phone: this.account.phone || '',
        paymentMethod: 'cash', // Default payment method
        note: '',
      };

      // Load danh sách địa chỉ
      this.loadUserAddresses();
    } else {
      console.warn(
        '⚠️ Không tìm thấy thông tin tài khoản trong sessionStorage'
      );
    }
  }

  // Load danh sách địa chỉ của user
  async loadUserAddresses(): Promise<void> {
    if (!this.account?.id) return;

    this.loadingAddresses = true;
    try {
      const response =
        await this.deliveryInfoService.findDeliveryInfoByAccountId(
          this.account.id
        );
      console.log('📍 Địa chỉ response:', response);

      if (response.status && response.data) {
        this.allAddresses = response.data.map((addr: any) => ({
          ...addr,
          fullAddress: `${addr.addressDetail}, ${addr.ward}, ${addr.district}, ${addr.province}`,
        }));

        // Tìm địa chỉ mặc định từ session
        this.setDefaultFromSession();
      }
    } catch (error) {
      console.error('❌ Error loading addresses:', error);
    } finally {
      this.loadingAddresses = false;
    }
  }

  // Thiết lập địa chỉ mặc định từ session
  private setDefaultFromSession(): void {
    const defaultAddressId = sessionStorage.getItem('defaultAddressId');
    const defaultAddressIndex = sessionStorage.getItem('defaultAddress');

    if (defaultAddressId && this.allAddresses.length > 0) {
      // Tìm theo ID trước
      this.defaultAddress = this.allAddresses.find(
        (addr) => addr.id.toString() === defaultAddressId
      );

      // Nếu không tìm thấy theo ID, tìm theo index
      if (!this.defaultAddress && defaultAddressIndex) {
        const index = parseInt(defaultAddressIndex);
        if (index >= 0 && index < this.allAddresses.length) {
          this.defaultAddress = this.allAddresses[index];
        }
      }
    }

    // Nếu vẫn không có địa chỉ mặc định, chọn địa chỉ đầu tiên
    if (!this.defaultAddress && this.allAddresses.length > 0) {
      this.defaultAddress = this.allAddresses[0];
    }

    // Tự động chọn địa chỉ mặc định
    if (this.defaultAddress) {
      this.selectAddress(this.defaultAddress.id);
    }

    // Lọc các địa chỉ khác (không phải mặc định)
    this.otherAddresses = this.allAddresses.filter(
      (addr) => addr.id !== this.defaultAddress?.id
    );

    console.log('📍 Default address:', this.defaultAddress);
    console.log('📍 Other addresses:', this.otherAddresses);
  }

  // Hiển thị/ẩn tất cả địa chỉ
  toggleShowAllAddresses(): void {
    this.showAllAddresses = !this.showAllAddresses;
  }

  // Chọn địa chỉ (không thay đổi địa chỉ mặc định trong session)
  selectAddress(addressId: number): void {
    this.selectedAddressId = addressId;
    this.selectedAddress = this.allAddresses.find(
      (addr) => addr.id === addressId
    );
    console.log('📍 Selected address for this order:', this.selectedAddress);
  }

  // Chọn phương thức thanh toán
  selectPaymentMethod(method: string): void {
    this.formValues.paymentMethod = method;
  }

  async onSubmit(formValues: any) {
    try {
      // Validation
      if (!this.selectedAddress) {
        alert('⚠️ Vui lòng chọn địa chỉ giao hàng!');
        return;
      }

      if (!formValues.paymentMethod) {
        alert('⚠️ Vui lòng chọn phương thức thanh toán!');
        return;
      }

      const orderDTO = {
        accountId: this.account?.id || 0,
        note: formValues.note || '',
        orderDate: new Date(),
        status: 0,
        totalPrice: this.totalPrice,
        delivery_info_id: this.selectedAddress.id,
        deliveryPhone: this.selectedAddress.phone,
        paymentMethod: formValues.paymentMethod,
        orderDetails: this.selectedItems.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
          unitPrice: item.price,
        })),
      };

      const result = await this.checkoutService.createOrder(orderDTO);
      console.log('📦 Kết quả trả về từ API:', result);

      if (result.status) {
        if (formValues.paymentMethod === 'vnpay') {
          const payUrl = await this.checkoutService.payWithVNPay(
            result.data.id
          );
          window.location.href = payUrl;
        } else {
          this.router.navigate(['/thank-you']);
        }
      } else {
        alert('❌ Lỗi khi lưu đơn hàng');
      }
    } catch (error) {
      console.error('❌ Lỗi khi xử lý đơn hàng:', error);
      alert('Đã xảy ra lỗi khi gửi đơn hàng!');
    }
  }
}
