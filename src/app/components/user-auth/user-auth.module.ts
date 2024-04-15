import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserAuthRoutingModule } from './user-auth-routing.module';
import { UserAuthComponent } from './user-auth.component';
// import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';


@NgModule({
    declarations: [UserAuthComponent],
    imports: [
        CommonModule,
        UserAuthRoutingModule,
        FormsModule,
    ]
})
export class UserAuthModule { }
