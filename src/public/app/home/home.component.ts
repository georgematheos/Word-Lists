import { Component, OnInit } from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router-deprecated';

import { AuthenticationService } from '../authentication.service';

@Component({
  moduleId: module.id,
  selector: 'wl-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],
  directives: [ROUTER_DIRECTIVES]
})
export class HomeComponent implements OnInit {
    listTitles: Array<string>;

    constructor(private router: Router, private authenticationService: AuthenticationService) {
        this.listTitles = ['Victor\'s Words', 'Ingredients', 'Strangest Plant Names', 'Shoe Brands', 'Cookie Types']; // TODO: GET THIS FROM SERVER RATHER THAN HARDCODING IT
    }

    get token(): string {
        return localStorage.getItem('auth_token');
    }

    ngOnInit() {
        // if the user is not logged in, navigate to the login page
        // TODO: ACCOUNT FOR INVALID TOKENS
        if (!this.authenticationService.isLoggedIn()) {
            this.router.parent.navigate(['Login']);
        }
    }

    logout() {
        this.authenticationService.logout();
        this.router.parent.navigate(['Login']);
    }
}
