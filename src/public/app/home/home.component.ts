import { Component, OnInit } from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';

import { AuthenticationService } from '../authentication.service';
import { ListService } from '../list.service';

@Component({
  moduleId: module.id,
  selector: 'wl-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],
  directives: [ROUTER_DIRECTIVES]
})
export class HomeComponent implements OnInit {
    private listTitles: Array<string>;
    private username: string;

    constructor(private router: Router, private authenticationService: AuthenticationService, private listService: ListService) {
        this.username = this.authenticationService.getUsername();
    }

    get token(): string {
        return localStorage.getItem('auth_token');
    }

    ngOnInit() {
        // if the user is not logged in, navigate to the login page
        // TODO: ACCOUNT FOR INVALID TOKENS
        if (!this.authenticationService.isLoggedIn()) {
            this.router.navigate(['/login']);
        }

        // get the word lists the user has
        this.listService.getLists(this.username).subscribe((lists) => {
            this.listTitles = lists;
            console.log(lists);
        }, (err) => {
            // TODO: NAVIGATE TO ERROR PAGE
            console.log(err);
        });
    }

    titleButtonClick(listTitle) {
        this.router.navigate(['/list', this.username, listTitle]);
    }

    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }
}
