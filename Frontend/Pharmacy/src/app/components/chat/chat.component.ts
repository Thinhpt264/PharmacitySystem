import {
  Component,
  ViewChild,
  ElementRef,
  AfterViewChecked,
  OnInit
} from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { ChatService, Message } from 'src/app/service/chat.service';

interface ChatMessage {
  text: string;
  isUser: boolean;
  timestamp: Date;
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, AfterViewChecked {
  showChatDialog = false;
  isLoadingChat = false;

  newMessage = '';
  messages: ChatMessage[] = [];
  @ViewChild('chatMessages') chatMessagesContainer!: ElementRef;

  adminId = 20;
  userId!: number;

  constructor(
    private chatService: ChatService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
  this.userId = this.authService.getId();
  console.log('[Chat] Current user ID:', this.userId);

  this.chatService.connectWebSocket(this.userId, (incomingMsg: Message) => {
    if (incomingMsg.senderId === this.adminId) {
      this.messages.push({
        text: incomingMsg.content,
        isUser: false,
        timestamp: new Date(incomingMsg.timestamp || new Date())
      });

      setTimeout(() => this.scrollToBottom(), 50);
    }
  });
}


  async openChatDialog(): Promise<void> {
  this.isLoadingChat = true; 

  try {
    await this.loadMessages(); 
    this.showChatDialog = true; 
  } catch (error) {
    console.error('[Chat] Không tải được tin nhắn:', error);
  } finally {
    this.isLoadingChat = false; 
  }
}


  async loadMessages(): Promise<void> {
    if (!this.userId || !this.adminId) {
      console.warn('[Chat] Thiếu userId hoặc adminId');
      return;
    }

    try {
      const messages = await this.chatService.getConversationDetail(this.userId, this.adminId);
      this.messages = messages.map(msg => ({
        text: msg.content,
        isUser: msg.senderId === this.userId,
        timestamp: new Date(msg.timestamp || new Date())
      }));
    } catch (error) {
      console.error('[Chat] Lỗi khi loadMessages:', error);
      throw error;
    }
  }

  async sendMessage(): Promise<void> {
    const content = this.newMessage.trim();
    if (!content || !this.adminId || !this.userId) return;

    const message: Message = {
      senderId: this.userId,
      receiverId: this.adminId,
      content
    };

    try {
      const sent = await this.chatService.sendMessage(message);

      this.messages.push({
        text: sent.content,
        isUser: true,
        timestamp: new Date(sent.timestamp || new Date())
      });

      this.newMessage = '';
    } catch (error) {
      console.error('[Chat] Không gửi được tin nhắn:', error);
    }
  }

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    if (this.chatMessagesContainer) {
      const el = this.chatMessagesContainer.nativeElement;
      el.scrollTop = el.scrollHeight;
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

}
