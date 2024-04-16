import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { ChatService } from '../../service/chat.service';
import { Router } from '@angular/router';
import { AuthService } from '../../service';

interface Friend {
  name: string;
  avatar: string;
  status: string;
}
@Component({
  selector: 'app-chat-page',
  // standalone: true,
  // imports: [CommonModule,FormsModule],
  templateUrl: './chat-page.component.html',
  styleUrl: './chat-page.component.css'
})
export class ChatPageComponent implements OnInit  {
  userName: string = "Shivam Goswami";
  newMessage: string = '';
  messages: any[] = [
    {userId:0, senderId: 'Friend1', content: 'Hello there!' },
    {userId:1, senderId: 'YourUserName', content: 'Hi! How are you?' },
    {userId:0, senderId: 'Friend1', content: 'I\'m good, thanks! How about you?' }
    // Add more messages as needed
  ];
  showDropdown: boolean = false;
  friends: Friend[] = [
    { name: 'Friend 1', avatar: 'https://picsum.photos/200/200', status: 'Online' },
    { name: 'Friend 2', avatar: 'https://picsum.photos/200/200', status: 'Away' },
    { name: 'Friend 3', avatar: 'https://picsum.photos/200/200', status: 'Offline' }
    // Add more friends as needed
  ];
 
  userDetails: any = {};
  constructor(
    private chatService: ChatService,
    private _router: Router,
    private _authService:AuthService
    

  ) {}

  ngOnInit(): void{
    
    this.chatService.getNewMessage().subscribe((message: string) => {
      this.messages.push(message);
    });

    if (this._authService.isUserLoggedIn()) {
      this.userDetails = this._authService.getUserData();
    }
    console.log(this.userDetails);
  }

  

  switchConversation(friend: Friend) {
    // Implement logic to switch conversation page with the selected friend
    console.log('Switching conversation with:', friend.name);
  }
  
  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  logout() {
    // Implement logout functionality here
  }
  sendMsg() {
    if (this.newMessage.trim() !== '') {
      this.messages.push({userId:this.userDetails._id, senderId: this.userDetails._id, content: this.newMessage });
      this.chatService.sendMessage({userId:this.userDetails._id, senderId:this.userDetails._id, content:this.newMessage})
      // Optionally, you can add code here to send the message to your backend or another user
      this.newMessage = '';
    }
 }

}
