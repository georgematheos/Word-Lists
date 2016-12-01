import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

import { Observable, Observer } from 'rxjs/Rx';

import { AuthenticateBody } from '../types/AuthenticateBody';


@Injectable()
export class AuthenticationService {
    private loggedIn = false;

    constructor(private http: Http) {
        this.loggedIn = !!localStorage.getItem('wl-auth_token'); // logged in is true if there is a token stored
    }

    login(username, password): Observable<string> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        let url = 'http://' + location.host + '/api/authenticate/local';

        let body = JSON.stringify({
            username: username,
            password: password
        });

        return this.http.post(url, body, { headers })
            .map(res => this.extractToken(res, username));
    }

    logout() {
        localStorage.removeItem('wl-auth_token');
        this.loggedIn = false;

        localStorage.removeItem('wl-username');
        localStorage.removeItem('wl-token_exp');
    }

    isLoggedIn() {
        // check to make sure the user is truly logged in
        this.loggedIn = this.loggedIn || !!localStorage.getItem('wl-auth_token'); // logged in is true if there is a token stored (if this.loggedIn is already true, we are good to go, so don't worry about checking localStorage)

        if (this.loggedIn) {
            // if the token has expired, the user is NOT logged in
            let token_exp = localStorage.getItem('wl-token_exp');
            if (token_exp && new Date() > new Date(token_exp)) {
                this.logout(); // logout the user
                this.loggedIn = false;
            }
        }

        return this.loggedIn;
    }

    // retrns the current auth_token or null if there is no tokens
    getToken(): string | null {
        if (this.isLoggedIn()) {
            return localStorage.getItem('wl-auth_token');
        }

        // if the user is not logged in, the auth token is invalid, so return null
        return null;
    }

    getUsername() {
        return localStorage.getItem('wl-username');
    }

    private extractToken(res: Response, username: string): string {
        // extract the json body
        let body: AuthenticateBody = res.json() || {};

        // make sure a token is within the body (if no body provided, this error will be triggered)
        if (!body.token) {
            Observable.throw(new Error('no token in response body'));
        }

        // set the token in the local storage
        localStorage.setItem('wl-auth_token', body.token);
        this.loggedIn = true; // set the logged in value

        // set the username in local storage
        localStorage.setItem('wl-username', username);

        // if included, store the expiration date for the token
        if (body.exp) {
            localStorage.setItem('wl-token_exp', body.exp);
        }

        // return the token
        return body.token;
    }
}
