import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { BehaviorSubject, of, throwError, Observable } from 'rxjs';
import { EncryptionService } from './encryption.service';
declare var $: any;

@Injectable({
    providedIn: 'root',
})

export class ApiService {
    page = 'dashboard';
    sessionTimeout = new BehaviorSubject(false);
    public sessionValue: any = null;

    constructor(public _http: HttpClient, public _encDec: EncryptionService) {

    }

    callApi({
        url,
        method,
        body = null
    }: {
        url: any;
        method: any;
        body?: any
    }): Observable<any> {
        if (sessionStorage.getItem('token')) {
            this.token();
        }
        switch (method.toUpperCase()) {
            case 'LOGIN':
                return this._http.post(url, { edc: this._encDec.encrypt(JSON.stringify(body)) })
                    .pipe(map((response) => response),
                        catchError((error: any) => {
                            if (error.status === 401) {
                                this.sessionTimeout.next(true)
                            }
                            return of(false)
                        }));
                break;
            case 'POST':
                return this._http.post(url, { edc: this._encDec.encrypt(JSON.stringify(body)) }, this.token())
                    .pipe(map((response) => response),
                        catchError((error: any) => {
                            if (error.status === 401) {
                                this.sessionTimeout.next(true)
                            }
                            return of(false)
                        }));
                break;
            case 'GET':
                return this._http.get(url, this.token())
                    .pipe(map((response) => response),
                        catchError((error: any) => {
                            if (error.status === 401) {
                                this.sessionTimeout.next(true)
                            }
                            return of(false)
                        }));
                break;
        }
        return throwError(() => false)
    }

    token() {
        return {
            headers : new HttpHeaders ({
                'Content-Type': 'application/json',
                Authorization : 'BEARER' + sessionStorage.getItem('token')
            })
        }
    }
}