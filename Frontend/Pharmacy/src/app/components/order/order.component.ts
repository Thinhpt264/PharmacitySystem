import { Component, OnInit, OnDestroy } from '@angular/core';

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

  // Danh sách đơn hàng mẫu
  orders: any[] = [
    {
      id: 'DH001',
      customerName: 'Nguyễn Văn A',
      phone: '0123456789',
      totalAmount: 250000,
      status: 'pending_confirm',
      createdDate: '2024-06-15 10:30',
      items: [
        { name: 'Paracetamol 500mg', quantity: 2, price: 15000 },
        { name: 'Vitamin C 1000mg', quantity: 1, price: 220000 },
      ],
      address: '123 Nguyễn Trãi, Quận 1, TP.HCM',
    },
    {
      id: 'DH001',
      customerName: 'Nguyễn Văn B',
      phone: '0123456789',
      totalAmount: 250000,
      status: 'pending_confirm',
      createdDate: '2024-06-15 10:30',
      items: [
        { name: 'Paracetamol 500mg', quantity: 2, price: 15000 },
        { name: 'Vitamin C 1000mg', quantity: 1, price: 220000 },
      ],
      address: '123 Nguyễn Trãi, Quận 1, TP.HCM',
    },
    {
      id: 'DH001',
      customerName: 'Nguyễn Văn C',
      phone: '0123456789',
      totalAmount: 250000,
      status: 'pending_confirm',
      createdDate: '2024-06-15 10:30',
      items: [
        { name: 'Paracetamol 500mg', quantity: 2, price: 15000 },
        { name: 'Vitamin C 1000mg', quantity: 1, price: 220000 },
      ],
      address: '123 Nguyễn Trãi, Quận 1, TP.HCM',
    },
    {
      id: 'DH002',
      customerName: 'Trần Thị B',
      phone: '0987654321',
      totalAmount: 180000,
      status: 'pending_payment',
      createdDate: '2024-06-15 11:15',
      items: [
        { name: 'Thuốc ho Am Bảo', quantity: 1, price: 45000 },
        { name: 'Gel bôi ngoài da', quantity: 1, price: 135000 },
      ],
      address: '456 Lê Lợi, Quận 3, TP.HCM',
    },
    {
      id: 'DH003',
      customerName: 'Lê Văn C',
      phone: '0369852147',
      totalAmount: 320000,
      status: 'ready_pickup',
      createdDate: '2024-06-14 14:20',
      items: [
        { name: 'Thuốc kháng sinh', quantity: 1, price: 150000 },
        { name: 'Thuốc giảm đau', quantity: 2, price: 85000 },
      ],
      address: '789 Hai Bà Trưng, Quận 1, TP.HCM',
    },
    {
      id: 'DH004',
      customerName: 'Phạm Thị D',
      phone: '0741258963',
      totalAmount: 195000,
      status: 'shipping',
      createdDate: '2024-06-14 09:45',
      items: [
        { name: 'Thuốc tiêu hóa', quantity: 1, price: 95000 },
        { name: 'Thuốc bổ máu', quantity: 1, price: 100000 },
      ],
      address: '321 Võ Văn Tần, Quận 3, TP.HCM',
    },
    {
      id: 'DH005',
      customerName: 'Hoàng Văn E',
      phone: '0258147369',
      totalAmount: 420000,
      status: 'delivered',
      createdDate: '2024-06-13 16:30',
      completedDate: '2024-06-14 10:15',
      items: [
        { name: 'Thuốc tim mạch', quantity: 1, price: 280000 },
        { name: 'Thuốc huyết áp', quantity: 1, price: 140000 },
      ],
      address: '654 Nguyễn Huệ, Quận 1, TP.HCM',
    },
    {
      id: 'DH006',
      customerName: 'Vũ Thị F',
      phone: '0147852369',
      totalAmount: 160000,
      status: 'cancelled',
      createdDate: '2024-06-13 13:20',
      cancelledDate: '2024-06-13 15:45',
      cancelReason: 'Khách hàng hủy do không cần nữa',
      items: [{ name: 'Thuốc cảm cúm', quantity: 2, price: 80000 }],
      address: '987 Lý Tự Trọng, Quận 1, TP.HCM',
    },
  ];

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
  }

  ngOnDestroy(): void {
    if (this.showModal) {
      this.enableBodyScroll();
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

  confirmOrder(order: any): void {
    if (confirm(`Xác nhận đơn hàng ${order.id}?`)) {
      order.status = 'pending_payment';
      this.updateTabCounts();
      alert('Đã xác nhận đơn hàng thành công!');
    }
  }

  cancelOrder(order: any): void {
    const reason = prompt('Nhập lý do hủy đơn hàng:');
    if (reason) {
      order.status = 'cancelled';
      order.cancelledDate = new Date().toISOString();
      order.cancelReason = reason;
      this.updateTabCounts();
      alert('Đã hủy đơn hàng!');
    }
  }

  shipOrder(order: any): void {
    if (confirm(`Giao đơn hàng ${order.id}?`)) {
      order.status = 'shipping';
      this.updateTabCounts();
      alert('Đã chuyển đơn hàng sang trạng thái giao hàng!');
    }
  }

  completeOrder(order: any): void {
    if (confirm(`Xác nhận đã giao thành công đơn hàng ${order.id}?`)) {
      order.status = 'delivered';
      order.completedDate = new Date().toISOString();
      this.updateTabCounts();
      alert('Đã hoàn thành đơn hàng!');
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
