import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private users = ['Nguyễn Văn A', 'Trần Thị B', 'Lê Văn C'];
  private messagesMap: { [key: string]: any[] } = {};
  private selectedUserSubject = new BehaviorSubject<string | null>(null);
  selectedUser$ = this.selectedUserSubject.asObservable();

  constructor() {
    // Tạo một số tin nhắn mẫu
    this.users.forEach(user => {
      this.messagesMap[user] = [
        { sender: 'admin', content: `Chào ${user}!`, timestamp: new Date() },
        { sender: user, content: 'Chào admin!', timestamp: new Date() }
      ];
    });
  }

  getUsers(): string[] {
    return this.users;
  }

  selectUser(user: string) {
    this.selectedUserSubject.next(user);
  }

  getMessages(user: string): any[] {
    return this.messagesMap[user] || [];
  }

  sendMessage(user: string, content: string) {
    const message = {
      sender: 'admin',
      content,
      timestamp: new Date()
    };
    this.messagesMap[user] = this.messagesMap[user] || [];
    this.messagesMap[user].push(message);
  }
}
