import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

import { Observable, Observer } from 'rxjs/Rx';

import { AuthenticateBody } from './types/AuthenticateBody';


@Injectable()
export class AuthenticationService {
    private loggedIn = false;
    private username: string;

    constructor(private http: Http) {
        this.loggedIn = !!localStorage.getItem('auth_token'); // logged in is true if there is a token stored
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
        localStorage.removeItem('auth_token');
        this.loggedIn = false;
        this.username = null;
    }

    isLoggedIn() {
        // check to make sure the user is truly logged in
        this.loggedIn = !!localStorage.getItem('auth_token'); // logged in is true if there is a token stored
        // TODO: CHECK IF TOKEN IS STILL VALID

        return this.loggedIn;
    }

    // retrns the current auth_token or null if there is no tokens
    getToken(): string | null {
        if (this.isLoggedIn()) {
            return localStorage.getItem('auth_token');
        }

        // if the user is not logged in, the auth token is invalid, so return null
        return null;
    }

    getUsername() {
        return this.username;
    }

    private extractToken(res: Response, username: string): string {
        // extract the json body
        let body: AuthenticateBody = res.json() || {};

        // make sure a token is within the body (if no body provided, this error will be triggered)
        if (!body.token) {
            Observable.throw(new Error('no token in response body'));
        }

        // set the token in the local storage
        localStorage.setItem('auth_token', body.token);
        this.loggedIn = true; // set the logged in value
        this.username = username; // get the username

        // return the token
        return body.token;
    }
}
