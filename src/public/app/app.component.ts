import { Component } from '@angular/core';
import { RouteConfig, ROUTER_DIRECTIVES } from '@angular/router-deprecated';
import { HTTP_PROVIDERS } from '@angular/http';

import { AuthenticationService } from './authentication.service';

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
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
        AuthenticationService
    ]
})
@RouteConfig([
    {path: '/', redirectTo: ['Login']}, // temp
    {path: '/login', name: 'Login', component: LoginComponent},
    {path: '/home', name: 'Home', component: HomeComponent},
    {path: '/*path', name: 'UnrecognizedPath', component: UnrecognizedPathComponent} // unrecognized url
])
export class AppComponent { }
