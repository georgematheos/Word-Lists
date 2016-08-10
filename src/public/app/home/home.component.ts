import { Component, OnInit } from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';

import { LogoutComponent } from '../logout/logout.component';

import { AuthenticationService } from '../authentication.service';
import { ListService } from '../list.service';

// TODO: maybe make it easier to have special ones, like when there is 0 or 1 list
const listNumberMessagePrefix = 'You have ';
const listNumberMessageSuffix = ' lists';
const noListsMessage = 'You have no lists. Make one!';
const oneListMessage = 'You have 1 list';

@Component({
  moduleId: module.id,
  selector: 'wl-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],
  directives: [ROUTER_DIRECTIVES, LogoutComponent]
})
export class HomeComponent implements OnInit {
    private listTitles: Array<string>;
    private username: string;

    listNumberMessage: string;

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
            this.listTitles = lists.sort((a, b) => {
                let A = a.toLowerCase();
                let B = b.toLowerCase();
                if (A < B) { return -1; }
                else if (A > B) { return 1; }
                else {
                    if (a < b) { return -1; }
                    if (a > b) { return 1; }
                    else { return 0; }
                }
            }); // alphabetize the lists
            console.log(lists);

            let listNumber = this.listTitles.length;
            switch (listNumber) {
                case 0: this.listNumberMessage = noListsMessage; break;
                case 1: this.listNumberMessage = oneListMessage; break;
                default: this.listNumberMessage = listNumberMessagePrefix + String(listNumber) + listNumberMessageSuffix; break;
            }

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
