import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ListComponent } from './list/list.component';
import { LoginComponent } from './authentication/login/login.component';
import { SignupComponent } from "./authentication/signup/signup.component";
import { UnrecognizedPathComponent } from './unrecognized-path/unrecognized-path.component';


@NgModule({
    imports: [
        RouterModule.forRoot([
            {path: '', pathMatch: 'full', redirectTo: '/login'},
            {path: 'home/:username', component: HomeComponent},
            {path: 'list/:username', component: ListComponent}, // new list
            {path: 'list/:username/:title', component: ListComponent}, // already-created list
            {path: 'login', component: LoginComponent},
            {path: 'signup', component: SignupComponent},
            {path: '**', component: UnrecognizedPathComponent}
        ])
    ],
    exports: [ RouterModule ]
})
export class AppRoutingModule { }
