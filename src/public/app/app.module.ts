import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent }  from './app.component';
import { AppRoutingModule } from './app-routing.module'

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ListComponent } from './list/list.component';
import { SignupComponent } from './signup/signup.component';
import { LogoutComponent } from './logout/logout.component';
import { UnrecognizedPathComponent } from './unrecognized-path/unrecognized-path.component';


@NgModule({
  imports:      [
      BrowserModule,
      FormsModule,
      ReactiveFormsModule,
      HttpModule,
      AppRoutingModule
  ],
  declarations: [
      AppComponent,
      HomeComponent,
      LoginComponent,
      ListComponent,
      LogoutComponent,
      SignupComponent,
      UnrecognizedPathComponent
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
