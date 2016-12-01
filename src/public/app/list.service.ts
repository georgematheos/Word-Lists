import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

import { Observable, Observer } from 'rxjs/Rx';

import { AuthenticationService } from './authentication/authentication.service';

import { WordListData } from './types/WordListData';

@Injectable()
export class ListService {
    constructor(private http: Http, private authenticationService: AuthenticationService) { }

    getLists(username: string) {
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

    getWords(username: string, listTitle: string) {
        // get the token and throw an error if none is available
        let auth_token = this.authenticationService.getToken();
        if (!auth_token) {
            return Observable.throw(new Error('no auth token available from the authenticationService'));
        }

        let headers = new Headers();
        headers.append('Content-Type', 'application/json'); // add the content type to the headers
        headers.append('x-auth-token', auth_token); // add the token to the headers

        let url = 'http://' + location.host + `/api/word_lists/${username}/${listTitle}`;

        // return an observable of the array of word lists
        return this.http.get(url, { headers }).map((res: Response) => this.extractData(res, 'words'));
    }

    getWordListData (username: string, listTitle: string): Observable<WordListData> {
        // get the token and throw an error if none is available
        let auth_token = this.authenticationService.getToken();
        if (!auth_token) {
            return Observable.throw(new Error('no auth token available from the authenticationService'));
        }

        let headers = new Headers();
        headers.append('Content-Type', 'application/json'); // add the content type to the headers
        headers.append('x-auth-token', auth_token); // add the token to the headers

        let url = 'http://' + location.host + `/api/word_lists/${username}/${listTitle}`;

        // return an observable of the body returned by the server
        return this.http.get(url, { headers })
        .map(res => res.json());

    }

    createList(username: string, listData: WordListData): Observable<any> {
        // put together object to send to the server in case the one passed in is badly formatted and to strip off unneeded fields
        let requestBody = {title: listData.title, words: listData.words};

        // get the token and throw an error if none is available
        let auth_token = this.authenticationService.getToken();
        if (!auth_token) {
            return Observable.throw(new Error('no auth token available from the authenticationService'));
        }

        let headers = new Headers();
        headers.append('Content-Type', 'application/json'); // add the content type to the headers
        headers.append('x-auth-token', auth_token); // add the token to the headers

        let url = 'http://' + location.host + `/api/word_lists/${username}`;

        return this.http.post(url, requestBody, { headers })
        .map(res => res.json());

    }

    updateList(username: string, oldListTitle: string, updateData: WordListData): Observable<any> {
        // put together object to send to the server in case the one passed in is badly formatted and to strip off unneeded fields
        let requestBody = {title: updateData.title, words: updateData.words};

        // get the token and throw an error if none is available
        let auth_token = this.authenticationService.getToken();
        if (!auth_token) {
            return Observable.throw(new Error('no auth token available from the authenticationService'));
        }

        let headers = new Headers();
        headers.append('Content-Type', 'application/json'); // add the content type to the headers
        headers.append('x-auth-token', auth_token); // add the token to the headers

        let url = 'http://' + location.host + `/api/word_lists/${username}/${oldListTitle}`;

        // return an observable of the extracted json body
        return this.http.put(url, requestBody, { headers })
        .map(res => res.json());
    }

    deleteList(username: string, listTitle: string) {
        // get the token and throw an error if none is available
        let auth_token = this.authenticationService.getToken();
        if (!auth_token) {
            return Observable.throw(new Error('no auth token available from the authenticationService'));
        }

        let headers = new Headers();
        headers.append('Content-Type', 'application/json'); // add the content type to the headers
        headers.append('x-auth-token', auth_token); // add the token to the headers

        let url = 'http://' + location.host + `/api/word_lists/${username}/${listTitle}`;

        // return an observable of the extracted json body
        return this.http.delete(url, { headers })
        .map(res => res.json());
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
