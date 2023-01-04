import { Injectable } from '@angular/core'
import {AppSettings} from './app.settings';
import { ApiService } from './api.service'

@Injectable({
    providedIn: 'root'
})
export class CommonService {
    constructor( public _apiservice: ApiService) {}

    loginapp(body: any) {
        const url = AppSettings.API.LOGIN_APP;
        return this._apiservice.callApi({url, method: 'POST', body})
    }

    add_client(body: any) {
        const url = AppSettings.API.ADD_CLIENTS;
        return this._apiservice.callApi({url, method: 'POST', body})
    }

    add_user(body: any) {
        const url = AppSettings.API.ADD_USERS;
        return this._apiservice.callApi({url, method: 'POST', body})
    }

    add_module(body: any) {
        const url = AppSettings.API.ADD_MODULES;
        return this._apiservice.callApi({url, method: 'POST', body})
    }

    get_user(body: any) {
        const url = AppSettings.API.GET_USERS;
        return this._apiservice.callApi({url, method: 'POST', body})
    }

    get_client(body: any) {
        const url = AppSettings.API.GET_CLIENTS;
        return this._apiservice.callApi({url, method: 'POST', body})
    }

    get_modules(body: any) {
        const url = AppSettings.API.GET_MODULES;
        return this._apiservice.callApi({url, method: 'POST', body})
    }

    get_implementors(body: any) {
        const url = AppSettings.API.GET_IMPLEMENTORS;
        return this._apiservice.callApi({url, method: 'POST', body})
    }

    add_implementors(body: any) {
        const url = AppSettings.API.ADD_IMPLEMENTORS;
        return this._apiservice.callApi({url, method: 'POST', body})
    }

    get_logs(body: any) {
        const url = AppSettings.API.GET_LOGS;
        return this._apiservice.callApi({url, method: 'POST', body})
    }
}