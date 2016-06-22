import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

import { Observable, Observer } from 'rxjs/Rx';

@Injectable()
export class SignupService {
    constructor(private http: Http) {  }

    signup(username, password): Observable<Response> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        let url = 'http://' + location.host + '/api/users/';

        let body = JSON.stringify({
            username: username,
            password: password
        });


        return this.http.post(url, body, { headers });
    }
}
