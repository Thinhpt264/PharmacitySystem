import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewChecked
} from '@angular/core';
import { ChatService, Message, ChatUser } from 'src/app/service/chat.service';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, AfterViewChecked {
  users: ChatUser[] = [];
  selectedUser: ChatUser | null = null;
  messages: Message[] = [];
  newMessage: string = '';
  @ViewChild('messages') messagesContainer!: ElementRef;
userId!: number;
  
  constructor(private chatService: ChatService,
      private authService: AuthService
  ) {}
  /** Lấy ID người dùng hiện tại từ AuthService */

  async ngOnInit() {
     this.userId = this.authService.getId();
    await this.loadConversationUsers();
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  /** Tải danh sách người từng nhắn với user hiện tại */
  async loadConversationUsers() {
    try {
      this.users = await this.chatService.getConversationUsers( this.userId);
      if (this.users.length > 0) {
        await this.selectUser(this.users[0]);
      }
    } catch (error) {
      console.error('Lỗi tải danh sách người chat:', error);
    }
  }

  /** Chọn người dùng để hiện đoạn hội thoại */
  async selectUser(user: ChatUser) {
    this.selectedUser = user;

    try {
      const msgs = await this.chatService.getConversationDetail( this.userId, user.id);
      this.messages = msgs.map(msg => ({
        ...msg,
        sender: msg.senderId ===  this.userId ? 'me' : user.username
      }));
    } catch (error) {
      console.error('Lỗi lấy chi tiết hội thoại:', error);
    }
  }

  /** Gửi tin nhắn đến người đang chọn */
  async sendMessage() {
    if (!this.newMessage.trim() || !this.selectedUser) return;

    const message: Message = {
      senderId:  this.userId,
      receiverId: this.selectedUser.id,
      content: this.newMessage
    };

    try {
      const saved = await this.chatService.sendMessage(message);
      saved.sender = 'me';
      this.messages.push(saved);
      this.newMessage = '';
    } catch (error) {
      console.error('Gửi tin nhắn lỗi:', error);
    }
  }

  /** Xử lý khi nhấn Enter */
  handleKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.sendMessage();
    }
  }
formatTime(date: string | Date): string {
  const d = new Date(date);
  const now = new Date();

  const isToday =
    d.getDate() === now.getDate() &&
    d.getMonth() === now.getMonth() &&
    d.getFullYear() === now.getFullYear();

  if (isToday) {
    // Chỉ hiển thị giờ phút nếu là hôm nay
    return d.toLocaleTimeString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  // Hiển thị ngày + giờ nếu không phải hôm nay
  return d.toLocaleString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).replace(',', ''); // bỏ dấu phẩy
}

  /** Tạo chữ viết tắt */
  getInitials(name: string): string {
    return name
      ? name
          .split(' ')
          .map(word => word[0])
          .join('')
          .toUpperCase()
      : '';
  }

  /** Tự động cuộn xuống cuối */
  private scrollToBottom() {
    if (this.messagesContainer) {
      try {
        this.messagesContainer.nativeElement.scrollTop =
          this.messagesContainer.nativeElement.scrollHeight;
      } catch (err) {
        console.error(err);
      }
    }
  }
}
