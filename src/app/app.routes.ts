import { RouterModule, Routes } from '@angular/router';
import { UserAuthComponent } from './components/user-auth/user-auth.component';
import { NgModule } from '@angular/core';
import { ChatPageComponent } from './components/chat-page/chat-page.component';
const routes: Routes = [
    {
        path: "",
        redirectTo:'/auth/login',
        pathMatch: 'full'
    },
    {
        path: "",
        component:UserAuthComponent,
        children: [
          {
            path: 'auth',
            loadChildren: () => import('./components/user-auth/user-auth.module').then(m => m.UserAuthModule)
          },
        ]
  },
    
  {
    path: "home",
    component:ChatPageComponent,
    
  },
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }