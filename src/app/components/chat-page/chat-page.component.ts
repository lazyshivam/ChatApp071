import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { ChatService } from '../../service/chat.service';
import { Router } from '@angular/router';
import { AuthService } from '../../service';
import { ToastrService } from 'ngx-toastr';

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
  userList: any = [];
  messages: any[] = [
   
  ];
  showDropdown: boolean = false;
  
  userDetails: any = {};
  senderDetails:any = {};
  constructor(
    private chatService: ChatService,
    private _router: Router,
    private _authService: AuthService,
    private _toastr:ToastrService
    

  ) {}

  ngOnInit(): void{
    
    this.chatService.getNewMessage().subscribe((message: string) => {
      this.messages.push(message);
    });

    if (this._authService.isUserLoggedIn()) {
      this.userDetails = this._authService.getUserData();
    }
    console.log(this.userDetails);
    this.getUserMessage(this.userDetails._id);
    this.getAllUsers();
  }

  

  switchConversation(friend: any) {
    // Implement logic to switch conversation page with the selected friend
    this.getUserMessage(friend._id);
    this.senderDetails = friend;
    console.log('Switching conversation with:', friend.name);
  }
  
  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  logout() {
    // Implement logout functionality here
    console.log("Logout clicked");
    this._toastr.success('Logged out successfully')
    this._authService.userLogout();
    this._router.navigate(['auth/login'])
  
  }
  sendMsg() {
    if (this.newMessage.trim() !== '') {
      // this.messages.push({userId:this.userDetails._id, senderId: this.senderDetails._id, content: this.newMessage });
      this.chatService.sendMessage({userId:this.userDetails._id, senderId:this.senderDetails._id, content:this.newMessage})
      // Optionally, you can add code here to send the message to your backend or another user
      this.newMessage = '';
    }
  }
  
  getUserMessage(senderId:any) {
    this.chatService.getUserMessageById(senderId).subscribe(
      res => {
        if (res.code === 200) {
          console.log(res.data);
          this.messages = res.data;
        } else if(res.code===401) {
          this._router.navigate(['auth/login']);
          this._authService.userLogout();
        }
        else {
          console.log(res.message);
        }
      },
      err => {
        console.log(err);
        this._router.navigate(['auth/login']);
        this._authService.userLogout();
      }
    )
  }

  getAllUsers() {
    this.chatService.getAllUser().subscribe(
      res => {
        if (res.code === 200) {
          console.log(res.data);
          this.userList = res.data;
        } else if(res.code===401) {
          this._router.navigate(['/login']);
          this._authService.userLogout();
        }
        else {
          console.log(res.message);
        }
        console.log(res)
      },
      err => {
        console.log(err);
        this._router.navigate(['auth/login']);
        this._authService.userLogout();
      }
    )
  }

}
