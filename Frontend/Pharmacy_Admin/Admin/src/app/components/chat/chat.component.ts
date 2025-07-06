import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { ChatService } from 'src/app/service/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, AfterViewChecked {
  users: string[] = [];
  selectedUser: string | null = null;
  messages: any[] = [];
  newMessage: string = '';
  @ViewChild('messages') messagesContainer!: ElementRef;

  constructor(private chatService: ChatService) {}

 ngOnInit() {
  this.users = this.chatService.getUsers();
  if (this.users.length > 0) {
    this.selectUser(this.users[0]); 
  }

  this.chatService.selectedUser$.subscribe(user => {
    this.selectedUser = user;
    this.messages = this.chatService.getMessages(user || '');
  });
}


  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  selectUser(user: string) {
    this.chatService.selectUser(user);
  }

  getInitials(name: string): string {
    return name ? name.split(' ').map(word => word[0]).join('').toUpperCase() : '';
  }

  formatTime(date: Date): string {
    return date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
  }

  sendMessage() {
    if (this.newMessage.trim() && this.selectedUser) {
      this.chatService.sendMessage(this.selectedUser, this.newMessage);
      this.newMessage = '';
    }
  }

  handleKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.sendMessage();
    }
  }

  private scrollToBottom() {
    if (this.messagesContainer) {
      this.messagesContainer.nativeElement.scrollTop = this.messagesContainer.nativeElement.scrollHeight;
    }
  }
}