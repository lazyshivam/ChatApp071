import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  // standalone: true,
  // imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  formData = {
    name: '',
    email: '',
    password: ''
  };

  onSubmit() {
    // Here you can implement the logic to handle user registration,
    // such as sending the form data to a backend API for processing.
    console.log('Form submitted:', this.formData);
    // Example: Call a service to register the user
  }
}
