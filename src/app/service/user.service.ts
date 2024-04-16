import { Injectable } from '@angular/core';
import {
    HttpClient,
    HttpHeaders,
    HttpErrorResponse,
    HttpInterceptor,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, tap, retry } from 'rxjs/operators';
import { environment } from '../../environment/environment';

@Injectable()
export class UserService {
    constructor(private http: HttpClient) { }

    apiUrl: any = environment.apiUrl;
    IsSideBarShow: boolean = true;

    extractData(res: any) {
        const body = res;
        return body || {};
    }

    //   register

    register(request: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/user/auth/register`, request).pipe(map(this.extractData));
    }
    // Login
    login(request: any): Observable<any> {
        return this.http
            .post(`${this.apiUrl}/user/auth/login`, request)
            .pipe(map(this.extractData));
    }
    // logOut
    logOut(request: any): Observable<any> {
        return this.http
            .post(`${this.apiUrl}/user/auth/logout`, request)
            .pipe(map(this.extractData));
    }
    // update user info
    updateUserInfo(id: any, request: any): Observable<any> {
        return this.http
            .patch(`${this.apiUrl}user/auth/profile/` + id, request)
            .pipe(map(this.extractData));
    }

    // forget Password
    forgotPassword(data: any): Observable<any> {
        return this.http
            .post(`${this.apiUrl}/user/auth/forgot-password`, data)
            .pipe(map(this.extractData));
    }

    // Reset Password
    resetPassword(token: any, body: any) {
        return this.http.post(
            this.apiUrl + '/user/auth/reset-password?token=' + token,
            body
        );
    }

    // Change Password
    changePassword(request: any): Observable<any> {
        return this.http
            .post(`${this.apiUrl}/auth/change-password`, request)
            .pipe(map(this.extractData));
    }


}
