import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseUrlService } from './baseUrl.service';
import { lastValueFrom } from 'rxjs';
import { Client, IMessage, Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client/dist/sockjs';


export interface Message {
  id?: number;
  senderId: number;
  receiverId: number;
  content: string;
  timestamp?: string;
  sender?: string;
}

export interface ChatUser {
  id: number;
  username: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private readonly apiPrefix = 'api/messages';
  private stompClient: Client;
  private connected = false;

  constructor(
    private http: HttpClient,
    private baseUrl: BaseUrlService
  ) {}

  /** Gửi tin nhắn qua REST */
  async sendMessage(message: Message): Promise<Message> {
    const url = `${this.baseUrl.getBaseUrl()}${this.apiPrefix}`;
    return await lastValueFrom(this.http.post<Message>(url, message));
  }

  /** Lấy chi tiết đoạn chat giữa user và partner */
  async getConversationDetail(userId: number, partnerId: number): Promise<Message[]> {
    const url = `${this.baseUrl.getBaseUrl()}${this.apiPrefix}/conversation-detail?userId=${userId}&partnerId=${partnerId}`;
    return await lastValueFrom(this.http.get<Message[]>(url));
  }

  /** Kết nối WebSocket và lắng nghe tin nhắn đến */
  connectWebSocket(currentUserId: number, onMessageReceived: (msg: Message) => void): void {
    if (this.connected) return;

    const socket = new SockJS(`${this.baseUrl.getBaseUrl()}chat`); // endpoint từ BE
    this.stompClient = new Client({
      webSocketFactory: () => socket as WebSocket,
      onConnect: () => {
        this.connected = true;

        this.stompClient.subscribe(`/topic/messages/${currentUserId}`, (message: IMessage) => {
          const received: Message = JSON.parse(message.body);
          onMessageReceived(received);
        });
      }
    });

    this.stompClient.activate();
  }

  disconnectWebSocket(): void {
    if (this.stompClient && this.connected) {
      this.stompClient.deactivate();
      this.connected = false;
    }
  }
}
