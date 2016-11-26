import { Component } from '@angular/core';
// TODO: FIGURE OUT HTTP STUFF

// TODO: REMOVE?
import { AuthenticationService } from './authentication.service';
import { ListService } from './list.service';

@Component({
    selector: 'wl-app',
    moduleId: module.id,
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.css'],
    providers: [
        AuthenticationService,
        ListService
    ]
})
export class AppComponent { }
