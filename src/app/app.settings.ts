import { environment } from "src/environments/environment";

export class AppSettings {
    public static API = {
        LOGIN_APP: environment.apiUrl + '/login',
        GET_MODULES: environment.apiUrl + '/dir/list',
        ADD_MODULES: environment.apiUrl + '/dir/add',
        UPDATE_MODULES: environment.apiUrl + '/dir/update',
        ACDC_MODULES: environment.apiUrl + '/dir/acdc',
        GET_LOGS: environment.apiUrl + '/logins/list',
        GET_CLIENTS: environment.apiUrl + '/clients/list',
        GET_IMPLEMENTORS: environment.apiUrl + '/',
        ADD_IMPLEMENTORS: environment.apiUrl + '/implementor/add',
        ADD_CLIENTS: environment.apiUrl + '/clients/add',
        UPDATE_CLIENTS: environment.apiUrl + '/clients/update',
        ACDC_CLIENTS: environment.apiUrl + '/clients/acdc',
        GET_USERS: environment.apiUrl + '/',
        ADD_USERS: environment.apiUrl + '/'
    }
}