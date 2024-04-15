import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { ChatService } from '../../service/chat.service';

@Component({
  selector: 'app-chat-page',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './chat-page.component.html',
  styleUrl: './chat-page.component.css'
})
export class ChatPageComponent  {
  userName: string = "Shivam Goswami";
  newMessage: string = '';
  messages: any[] = [
    {userId:0, senderId: 'Friend1', content: 'Hello there!' },
    {userId:1, senderId: 'YourUserName', content: 'Hi! How are you?' },
    {userId:0, senderId: 'Friend1', content: 'I\'m good, thanks! How about you?' }
    // Add more messages as needed
  ];
  constructor(private chatService :ChatService) {}

  ngOnInit(): void{
    this.chatService.getNewMessage().subscribe((message: string) => {
      this.messages.push(message);
    })
  }
  
  sendMsg() {
    if (this.newMessage.trim() !== '') {
      this.messages.push({userId:0, senderId: this.userName, content: this.newMessage });
      this.chatService.sendMessage({userId:0, senderId:this.userName, content:this.newMessage})
      // Optionally, you can add code here to send the message to your backend or another user
      this.newMessage = '';
    }
 }

}
