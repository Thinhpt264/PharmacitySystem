import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';
import { CheckoutService } from 'src/app/service/checkout.service';
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
  account : any;
  formValues : any = {};

  constructor(
    private cartService: CartService,
    private checkoutService: CheckoutService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.selectedItems = this.cartService.getSelectedItems();
    console.log('✅ Selected items:', this.selectedItems);
    this.totalPrice = this.selectedItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  const accountData = this.authService.getAccount()
  if (accountData) {
    this.account = accountData
    console.log('🧑 Account loaded from session:', this.account);
  } else {
    console.warn('⚠️ Không tìm thấy thông tin tài khoản trong sessionStorage');
  }
  }

async onSubmit(formValues: any) {
  try {
    const orderDTO = {
      accountId: this.account?.id || 0,
      note: formValues.note || '',
      orderDate: new Date(),
      status: 0,
      totalPrice: this.totalPrice,
      orderDetails: this.selectedItems.map(item => ({
        productId: item.id,
        quantity: item.quantity,
        unitPrice: item.price
      }))
    };

    const result = await this.checkoutService.createOrder(orderDTO);
    console.log('📦 Kết quả trả về từ API:', result);

    if (result.status) {
      if (formValues.paymentMethod === 'vnpay') {
        const payUrl = await this.checkoutService.payWithVNPay(result.data.id);
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
