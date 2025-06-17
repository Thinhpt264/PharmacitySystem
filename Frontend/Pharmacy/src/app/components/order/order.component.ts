import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { CheckoutService } from 'src/app/service/checkout.service';
import { DeliveryInforService } from 'src/app/service/delivery-info.service';

@Component({
  selector: 'app-root',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent implements OnInit, OnDestroy {
  activeTab: string = 'pending_confirm';
  showModal: boolean = false;
  selectedOrder: any = null;
  private scrollY = 0;
  constructor(
    private checkoutService: CheckoutService,
    private authService: AuthService,
    private deliveryInforService: DeliveryInforService // Dịch vụ để lấy địa chỉ giao hàng // Thay thế bằng dịch vụ thực tế
  ) {}
  getAddressById(id: number): string {
    var address = '';
    this.deliveryInforService.findById(id).then((res) => {
      console.log(res);
      address =
        res.data.province + ', ' + res.data.district + ', ' + res.data.ward;
      console.log(address);
    });
    return address;
  }

  // Danh sách đơn hàng mẫu
  orders: any[] = [];
  orders1: any[];

  tabs: any[] = [
    { key: 'pending_confirm', label: 'Chờ xác nhận', icon: '⏳', count: 0 },
    { key: 'pending_payment', label: 'Chờ thanh toán', icon: '💳', count: 0 },
    { key: 'ready_pickup', label: 'Chờ lấy hàng', icon: '📦', count: 0 },
    { key: 'shipping', label: 'Chờ giao hàng', icon: '🚚', count: 0 },
    { key: 'delivered', label: 'Đã giao', icon: '✅', count: 0 },
    { key: 'cancelled', label: 'Đã hủy', icon: '❌', count: 0 },
  ];

  ngOnInit(): void {
    this.updateTabCounts();
    this.findOrderByAccountId(this.authService.getId());
  }

  ngOnDestroy(): void {
    if (this.showModal) {
      this.enableBodyScroll();
    }
  }
  async findOrderByAccountId(accountId: any): Promise<void> {
    try {
      const response = await this.checkoutService.findByAccountIdAndStatus(
        accountId
      );
      this.orders1 = response.data || [];

      const statusMap: any = {
        0: 'pending_confirm',
        2: 'pending_payment',
        1: 'ready_pickup', // Trùng lặp, có thể bỏ qua
        // 2: 'ready_pickup',
        3: 'shipping',
        4: 'delivered',
        5: 'cancelled',
      };

      // 🔁 Duyệt qua đơn và lấy địa chỉ cho từng đơn hàng
      const enrichedOrders = await Promise.all(
        this.orders1.map(async (order) => {
          const items = order.orderDetails.map((detail: any) => ({
            name: `Sản phẩm ${detail.productId}`,
            quantity: detail.quantity,
            price: detail.unitPrice,
          }));

          // GỌI API LẤY ĐỊA CHỈ
          const addressRes = await this.deliveryInforService.findById(
            order.delivery_info_id
          );
          const address =
            addressRes.data.province +
            ', ' +
            addressRes.data.district +
            ', ' +
            addressRes.data.ward;

          return {
            id: `DH${String(order.id).padStart(3, '0')}`,
            customerName: this.authService.getUsername(),
            phone: this.authService.getPhone(),
            totalAmount: order.totalPrice,
            status: statusMap[order.status] || 'pending_confirm',
            createdDate: order.orderDate + ' 10:30',
            items,
            address,
            note: order.note,
          };
        })
      );

      this.orders = enrichedOrders;
      this.updateTabCounts();
    } catch (error) {
      console.error('Lỗi khi lấy đơn hàng hoặc địa chỉ:', error);
    }
  }

  updateTabCounts(): void {
    this.tabs.forEach((tab) => {
      tab.count = this.orders.filter(
        (order) => order.status === tab.key
      ).length;
    });
  }

  setActiveTab(tabKey: string): void {
    this.activeTab = tabKey;
  }

  getFilteredOrders(): any[] {
    return this.orders.filter((order) => order.status === this.activeTab);
  }

  getStatusText(status: string): string {
    const statusMap: any = {
      pending_confirm: 'Chờ xác nhận',
      pending_payment: 'Chờ thanh toán',
      ready_pickup: 'Chờ lấy hàng',
      shipping: 'Đang giao hàng',
      delivered: 'Đã giao thành công',
      cancelled: 'Đã hủy',
    };
    return statusMap[status] || status;
  }

  getStatusClass(status: string): string {
    const classMap: any = {
      pending_confirm: 'status-pending',
      pending_payment: 'status-payment',
      ready_pickup: 'status-pickup',
      shipping: 'status-shipping',
      delivered: 'status-delivered',
      cancelled: 'status-cancelled',
    };
    return classMap[status] || '';
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount);
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleString('vi-VN');
  }

  // Chỉ cho phép hủy đơn hàng ở 2 trạng thái đầu
  canCancelOrder(status: string): boolean {
    return status === 'pending_confirm' || status === 'pending_payment';
  }

  cancelOrder(order: any): void {
    if (!this.canCancelOrder(order.status)) {
      alert('Không thể hủy đơn hàng ở trạng thái này!');
      return;
    }

    const reason = prompt('Nhập lý do hủy đơn hàng:');
    if (reason && reason.trim()) {
      if (confirm(`Bạn có chắc chắn muốn hủy đơn hàng ${order.id}?`)) {
        order.status = 'cancelled';
        order.cancelledDate = new Date().toISOString();
        order.cancelReason = reason.trim();
        this.updateTabCounts();
        alert('Đã hủy đơn hàng thành công!');
      }
    }
  }

  viewOrderDetail(order: any): void {
    this.selectedOrder = order;
    this.showModal = true;
    this.disableBodyScroll();
  }

  closeModal(): void {
    this.showModal = false;
    this.selectedOrder = null;
    this.enableBodyScroll();
  }

  // Đóng modal khi click vào backdrop
  onBackdropClick(event: any): void {
    if (event.target === event.currentTarget) {
      this.closeModal();
    }
  }

  private disableBodyScroll(): void {
    // Lưu vị trí scroll hiện tại
    this.scrollY = window.scrollY;

    // Áp dụng style để ngăn scroll
    document.body.style.position = 'fixed';
    document.body.style.top = `-${this.scrollY}px`;
    document.body.style.width = '100%';
    document.body.classList.add('modal-open');
  }

  private enableBodyScroll(): void {
    // Khôi phục style ban đầu
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    document.body.classList.remove('modal-open');

    // Khôi phục vị trí scroll
    window.scrollTo(0, this.scrollY);
  }
}
