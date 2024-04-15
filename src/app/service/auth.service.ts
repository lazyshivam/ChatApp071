import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable()
export class AuthService {
    isLoggedIn() {
      throw new Error("Method not implemented.");
    }

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
    ) { }

    setDataUser(data: any) {
        localStorage.setItem('go_d_r_a', JSON.stringify(data)); //This is use for admin data
    }

    setTokenUser(token: string) {
        localStorage.setItem('go_d_r_a_t', token); //This is use for admin token
    }

    getUserData() {        
        return JSON.parse(localStorage.getItem('go_d_r_a') || '{}');
    }

    getTokenUser() {
        return localStorage.getItem('go_d_r_a_t');
    }

    isUserLoggedIn() {
        return this.getTokenUser() !== null;
    }


   
    userLogout() {
        localStorage.removeItem('go_d_r_a_t');
        localStorage.removeItem('go_d_r_a');
    }
}
