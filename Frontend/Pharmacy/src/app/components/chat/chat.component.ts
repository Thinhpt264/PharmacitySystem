import { Component, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
   import { TranslateService } from '@ngx-translate/core';

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
   export class ChatComponent implements AfterViewChecked {
     showChatDialog: boolean = false;
     newMessage: string = '';
     messages: ChatMessage[] = [];
     @ViewChild('chatMessages') chatMessagesContainer!: ElementRef;

     constructor(private translate: TranslateService) {}

     openChatDialog() {
       this.showChatDialog = true;
     }

     sendMessage() {
       if (this.newMessage.trim()) {
         this.messages.push({
           text: this.newMessage,
           isUser: true,
           timestamp: new Date()
         });
         // Simulate admin response (replace with actual API call)
         setTimeout(() => {
           this.messages.push({
             text: this.translate.instant('admin_response'),
             isUser: false,
             timestamp: new Date()
           });
         }, 1000);
         this.newMessage = '';
       }
     }

     ngAfterViewChecked() {
       this.scrollToBottom();
     }

     private scrollToBottom(): void {
       if (this.chatMessagesContainer) {
         this.chatMessagesContainer.nativeElement.scrollTop = this.chatMessagesContainer.nativeElement.scrollHeight;
       }
     }
   }