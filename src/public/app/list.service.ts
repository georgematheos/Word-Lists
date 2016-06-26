import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

import { Observable, Observer } from 'rxjs/Rx';

import { AuthenticationService } from './authentication.service';

@Injectable()
export class ListService {
    constructor(private http: Http, private authenticationService: AuthenticationService) { }

    getLists(username) {
        // get the token and throw an error if none is available
        let auth_token = this.authenticationService.getToken();
        if (!auth_token) {
            return Observable.throw(new Error('no auth token available from the authenticationService'));
        }

        let headers = new Headers();
        headers.append('Content-Type', 'application/json'); // add the content type to the headers
        headers.append('x-auth-token', auth_token); // add the token to the headers

        let url = 'http://' + location.host + `/api/word_lists/${username}`;

        // return an observable of the array of word lists
        return this.http.get(url, { headers }).map((res: Response) => this.extractData(res, 'word-lists'));
    }

    // extracts from a response stream the json property with the name propertyName
    private extractData(res: Response, propertyName) {
        // extract the json body
        let body = res.json() || {};
        console.log(body);
        // make sure the property is within the body (if no body provided, this error will be triggered)
        if (!body[propertyName]) {
            Observable.throw(new Error(`no property named ${propertyName} in response body`));
        }

        // if all goes well, return the property
        return body[propertyName];
    }
}
