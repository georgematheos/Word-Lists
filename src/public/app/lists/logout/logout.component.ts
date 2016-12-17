import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../../authentication/authentication.service';

@Component({
    moduleId: module.id,
    selector: 'wl-logout',
    templateUrl: 'logout.component.html',
    styleUrls: ['logout.component.css']
})
export class LogoutComponent {
    constructor(private authenticationService: AuthenticationService, private router: Router) {  }

    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }
}
