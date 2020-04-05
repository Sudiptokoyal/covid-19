import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, timeout, catchError } from 'rxjs/operators';

@Injectable()
export class ApiService {
    baseApi: string = 'https://coronavirus-tracker-api.herokuapp.com/v2';
    timeoutCount: number = 100000;

    constructor(
        private http: HttpClient) { }

    get(...args): Observable<any> {
        const url = args[0] ? `${this.baseApi}/${args[0]}` : '';

        return this.http
            .get(url, {
                observe: 'body',
                responseType: 'json'
            })
            .pipe(timeout(this.timeoutCount));
    }

    post(...args): Observable<any> {
        const url = args[0] ? `${this.baseApi}/${args[0]}` : '';
        const payload = args[1];

        return this.http
            .post(url, payload, {
                observe: 'body',
                responseType: 'json'
            })
            .pipe(timeout(this.timeoutCount));
    }

    put(...args): Observable<any> {
        const url = args[0] ? `${this.baseApi}/${args[0]}` : '';
        const payload = args[1];

        return this.http
            .put(url, payload, {
                observe: 'body',
                responseType: 'json'
            })
            .pipe(timeout(this.timeoutCount));
    }

    upload(...args): Observable<any> {
        const url = args[0] ? `${this.baseApi}/${args[0]}` : '';
        const payload = args[1];

        return this.http
            .post(url, payload, {
                headers: new HttpHeaders().set('headerless', 'Yes'),
                observe: 'body',
                reportProgress: false
            })
            .pipe(timeout(this.timeoutCount));
    }

    download(...args): Observable<any> {
        const url = args[0] ? `${this.baseApi}/${args[0]}` : '';
        const payload = args[1];

        return this.http
            .post(url, payload, {
                responseType: 'blob' as 'json'
            })
            .pipe(timeout(this.timeoutCount));
    }

    postWOHeader(...args): Observable<any> {
        const url = args[0] ? `${this.baseApi}/${args[0]}` : '';
        const payload = args[1];

        return this.http
            .post(url, payload, {
                responseType: 'blob' as 'json'
            })
            .pipe(timeout(this.timeoutCount));
    }
}
