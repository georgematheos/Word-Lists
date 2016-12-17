import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent }  from './app.component';
import { AppRoutingModule } from './app-routing.module'

import { AuthenticationModule } from './authentication/authentication.module';
import { ListsModule } from './lists/lists.module';

import { UnrecognizedPathComponent } from './unrecognized-path/unrecognized-path.component';

@NgModule({
  imports: [
      BrowserModule,
      FormsModule, // TODO: REMOVE THIS (if that is doable)
      HttpModule,
      AppRoutingModule,
      AuthenticationModule,
      ListsModule
  ],
  declarations: [
      AppComponent,
      UnrecognizedPathComponent
  ],
  providers: [ ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
