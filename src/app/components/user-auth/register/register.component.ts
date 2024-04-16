import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../../service';



@Component({
  selector: 'app-register',
  // standalone: true,
  // imports: [],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {

  formData = {
    name: '',
    email: '',
    password: ''
  };

  showError: boolean = false;

  constructor(private toastr: ToastrService,
    private _userService: UserService
  ) { }

  ngOnInit(): void {
    // this.toastr.success('Registration page opened')
  }
  onSubmit(valid: any): void {
    this.showError = true;
    if (valid) {
      // this.toastr.success('Registered in successfully')
      console.log('Form submitted:', this.formData);
      this._userService.register(this.formData).subscribe(
        (res) => {
          if (res.code == 200) {
            this.toastr.success(res.message);
            console.log(res);
          }
          else {
            this.toastr.error(res.message);
          }
        }
        ,
        (err) => {
          console.log(err);
          this.toastr.error(err);
        }
      )
    }
    else {
      console.log("form not submitted:", this.formData);
      // this.showError = false;
    }
    // Here you can implement the logic to handle user registration,
    // such as sending the form data to a backend API for processing.
    // Example: Call a service to register the user
  }
}
