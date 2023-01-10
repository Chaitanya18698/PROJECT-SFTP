import { Injectable } from '@angular/core'
import { AppSettings } from './app.settings';
import { ApiService } from './api.service'

@Injectable({
    providedIn: 'root'
})
export class CommonService {
    constructor(public _apiservice: ApiService) { }

    // Login API
    loginapp(body: any) {
        const url = AppSettings.API.LOGIN_APP;
        return this._apiservice.callApi({ url, method: 'POST', body })
    }

    // Clients API's functions 
    add_client(body: any) {
        const url = AppSettings.API.ADD_CLIENTS;
        return this._apiservice.callApi({ url, method: 'POST', body })
    }
    update_client(body: any) {
        const url = AppSettings.API.UPDATE_CLIENTS;
        return this._apiservice.callApi({ url, method: 'POST', body })
    }
    acdc_client(body: any) {
        const url = AppSettings.API.ACDC_CLIENTS;
        return this._apiservice.callApi({ url, method: 'POST', body })
    }
    //  Clients API"S END

    add_user(body: any) {
        const url = AppSettings.API.ADD_USERS;
        return this._apiservice.callApi({ url, method: 'POST', body })
    }


    // Module API's  functions
    get_modules(body: any) {
        const url = AppSettings.API.GET_MODULES;
        return this._apiservice.callApi({ url, method: 'POST', body })
    }

    add_module(body: any) {
        const url = AppSettings.API.ADD_MODULES;
        return this._apiservice.callApi({ url, method: 'POST', body })
    }

    update_module(body: any) {
        const url = AppSettings.API.UPDATE_MODULES;
        return this._apiservice.callApi({ url, method: 'POST', body })
    }

    acdc_module(body: any) {
        const url = AppSettings.API.ACDC_MODULES;
        return this._apiservice.callApi({ url, method: 'POST', body })
    }
    // Module API's END

    get_user(body: any) {
        const url = AppSettings.API.GET_USERS;
        return this._apiservice.callApi({ url, method: 'POST', body })
    }

    get_client(body: any) {
        const url = AppSettings.API.GET_CLIENTS;
        return this._apiservice.callApi({ url, method: 'POST', body })
    }


    //  Implementors  API's functions
    get_implementors(body: any) {
        const url = AppSettings.API.GET_IMPLEMENTORS;
        return this._apiservice.callApi({ url, method: 'POST', body })
    }

    add_implementors(body: any) {
        const url = AppSettings.API.ADD_IMPLEMENTORS;
        return this._apiservice.callApi({ url, method: 'POST', body })
    }

    add_clientUser(body: any) {
        const url = AppSettings.API.ADD_CLIENTS_USERS;
        return this._apiservice.callApi({ url, method: 'POST', body })
    }

    // Get module with path 

    getModulesPath(body: any) {
        const url = AppSettings.API.GET_MODULES_WITH_PATH;
        return this._apiservice.callApi({ url, method: 'POST', body })
    }



    // get implementors || clients 
    get_logs(body: any) {
        const url = AppSettings.API.GET_LOGS;
        return this._apiservice.callApi({ url, method: 'POST', body })
    }


    codeGeneration(name: string) {
        if (name && name.trim()) {

            return name.trim().split(' ').join('_').toUpperCase()
        }
        return null
    }



    // Files 
    getFilesDirsData(body: any) {
        const url = AppSettings.API.GET_FILES_DIRS;
        return this._apiservice.callApi({ url, method: 'POST', body })
    }


    fileUpload(body: any) {
        const url = AppSettings.API.UPLOAD_FILES_DIRS;
        return this._apiservice.callApi({ url, method: 'FILE_UPLOAD', body })
    }

    downloadFile(body: any) {
        const url = AppSettings.API.DOWNLOAD_FILES;
        return this._apiservice.callApi({ url, method: 'POST', body })
    }

    // Client user login
     
    acdcLoginUser(body: any) {
        const url = AppSettings.API.ACDC_LOGIN_USER;
        return this._apiservice.callApi({ url, method: 'POST', body })
    }
}