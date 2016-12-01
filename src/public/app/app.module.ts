import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent }  from './app.component';
import { AppRoutingModule } from './app-routing.module'

import { AuthenticationModule } from './authentication/authentication.module';

import { ListService } from './list.service';

import { HomeComponent } from './home/home.component';
import { ListComponent } from './list/list.component';
import { UnrecognizedPathComponent } from './unrecognized-path/unrecognized-path.component';

@NgModule({
  imports: [
      BrowserModule,
      FormsModule, // TODO: REMOVE THIS (if that is doable)
      HttpModule,
      AppRoutingModule,
      AuthenticationModule
  ],
  declarations: [
      AppComponent,
      HomeComponent,
      ListComponent,
      UnrecognizedPathComponent
  ],
  providers: [ ListService ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
