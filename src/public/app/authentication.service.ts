import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

import { Observable, Observer } from 'rxjs/Rx';

import { AuthenticateBody } from './types/AuthenticateBody';

@Injectable()
export class AuthenticationService {
    private loggedIn = false;

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
            .map(this.extractToken);
    }

    logout() {
        localStorage.removeItem('auth_token');
        this.loggedIn = false;
    }

    isLoggedIn() {
        return this.loggedIn;
    }

    extractToken(res: Response): string {
        // extract the json body
        let body: AuthenticateBody = res.json() || {};

        // make sure a token is within the body (if no body provided, this error will be triggered)
        if (!body.token) {
            Observable.throw(new Error('no token in response body'));
        }

        // set the token in the local storage
        localStorage.setItem('auth_token', body.token);
        this.loggedIn = true;

        // return the token
        return body.token;
    }
}
