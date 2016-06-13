import { Component } from '@angular/core';
import { RouteConfig, ROUTER_DIRECTIVES } from '@angular/router-deprecated';

import { LoginComponent } from './login/login.component'

@Component({
    selector: 'wl-app',
    moduleId: module.id,
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.css'],
    directives: [
        LoginComponent
    ]
})
@RouteConfig([
])
export class AppComponent { }
