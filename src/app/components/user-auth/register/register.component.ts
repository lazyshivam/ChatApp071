import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  // standalone: true,
  // imports: [],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  formData = {
    name: '',
    email: '',
    password: ''
  };

  showError:boolean = false;

  onSubmit(f:any):void {
    this.showError = true;
    if (f.valid) {
      
      console.log('Form submitted:', this.formData);
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
