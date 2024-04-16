import { Component, OnInit } from '@angular/core';
import { AuthService, UserService } from '../../../service';
import { ToastrService } from 'ngx-toastr';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  // standalone: true,
  // imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  formData = {
    email: '',
    password: ''
  };
  showError: boolean = false;
  
  constructor(private _userService: UserService,
    private toastr: ToastrService,
    private _authService: AuthService,
         private _router:Router
  ) { }
  
  ngOnInit(): void {
    if (this._authService.isUserLoggedIn()) {
        this._router.navigate(['/home']);
    };
    
  }
  onSubmit(valid: any) {
    this.showError = true;
    if (valid) {
      this._userService.login(this.formData).subscribe(
        res => {
          if (res.code === 200) {
            console.log(res);
            this.toastr.success('Logged in successfully');
            this._authService.setDataUser(res.data.user);
            this._authService.setTokenUser(res.data.tokens.access.token);
          }
          else {
            this.toastr.error(res.message);
          }
        },
        err => {
          console.log(err);
        }
      )
    }
    // Here you can implement the logic to handle user registration,
    // such as sending the form data to a backend API for processing.
    console.log('Form submitted:', this.formData);
    // Example: Call a service to register the user
  }
}
