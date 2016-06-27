import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { HTTP_PROVIDERS } from '@angular/http';

import { AuthenticationService } from './authentication.service';
import { ListService } from './list.service';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { UnrecognizedPathComponent } from './unrecognized-path/unrecognized-path.component';

@Component({
    selector: 'wl-app',
    moduleId: module.id,
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.css'],
    directives: [
        LoginComponent,
        HomeComponent,
        UnrecognizedPathComponent,
        ROUTER_DIRECTIVES
    ],
    providers: [
        HTTP_PROVIDERS,
        AuthenticationService,
        ListService
    ]
})
export class AppComponent { }
