import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserAuthRoutingModule } from './components/user-auth/user-auth-routing.module';
import { AppComponent } from './app.component';
import { ChatPageComponent } from './components/chat-page/chat-page.component';
import { AuthService } from './service/auth.service';
import { ChatService } from './service/chat.service';
import { RouterModule, RouterOutlet } from '@angular/router';
import { LoginComponent } from './components/user-auth/login/login.component';
import { ForgotPasswordComponent } from './components/user-auth/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/user-auth/reset-password/reset-password.component';
import { RegisterComponent } from './components/user-auth/register/register.component';
import { AppRoutingModule } from './app.routes';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
// import { appConfig } from './app.config';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    RegisterComponent,
    // ChatPageComponent
  ],
  imports: [
    CommonModule,
    UserAuthRoutingModule,
    AppRoutingModule,
    RouterOutlet,
    CommonModule,
    RouterModule,
    BrowserModule,
    FormsModule
  
  
  ],
  providers: [AuthService, ChatService],
  bootstrap: [AppComponent]
})
  
export class AppModule { }
