import { environment } from "src/environments/environment";

export class AppSettings {
    public static API = {
        LOGIN_APP: environment.apiUrl + '/login',
        GET_MODULES: environment.apiUrl + '/',
        ADD_MODULES: environment.apiUrl + '/',
        GET_LOGS: environment.apiUrl + '/',
        GET_CLIENTS: environment.apiUrl + '/',
        GET_IMPLEMENTORS: environment.apiUrl + '/',
        ADD_IMPLEMENTORS: environment.apiUrl + '/',
        ADD_CLIENTS: environment.apiUrl + '/',
        GET_USERS: environment.apiUrl + '/',
        ADD_USERS: environment.apiUrl + '/'
    }
}