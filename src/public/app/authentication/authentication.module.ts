import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // TODO: REACTIVE FORMS?
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AuthenticationService } from './authentication.service';

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { LogoutComponent } from './logout/logout.component';

@NgModule({
  imports: [ CommonModule, FormsModule, ReactiveFormsModule, RouterModule, HttpModule ],
  exports: [ LogoutComponent, LoginComponent, SignupComponent ], // TODO: do I have to export the LoginComponent and SignupComponent??
  declarations: [ LoginComponent, SignupComponent, LogoutComponent ],
  providers: [ AuthenticationService ]
})
export class AuthenticationModule { }
