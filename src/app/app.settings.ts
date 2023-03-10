import { env } from "process";
import { environment } from "src/environments/environment";

export class AppSettings {
    public static API: any = {
        LOGIN_APP: environment.apiUrl + '/login',
        GET_MODULES: environment.apiUrl + '/dir/list',
        ADD_MODULES: environment.apiUrl + '/dir/add',
        UPDATE_MODULES: environment.apiUrl + '/dir/update',
        ACDC_MODULES: environment.apiUrl + '/dir/acdc',
        GET_LOGS: environment.apiUrl + '/logins/list',
        GET_CLIENTS: environment.apiUrl + '/clients/list',
        GET_MODULES_WITH_PATH: environment.apiUrl + '/dir/list/path',
        GET_IMPLEMENTORS: environment.apiUrl + '/',
        ADD_IMPLEMENTORS: environment.apiUrl + '/implementor/add',
        ADD_CLIENTS_USERS: environment.apiUrl + '/client/add',
        ADD_CLIENTS: environment.apiUrl + '/clients/add',
        UPDATE_CLIENTS: environment.apiUrl + '/clients/update',
        ACDC_CLIENTS: environment.apiUrl + '/clients/acdc',
        GET_USERS: environment.apiUrl + '/',
        ADD_USERS: environment.apiUrl + '/',

        // CLIENT USER LOGIN
        ACDC_LOGIN_USER: environment.apiUrl + '/login/acdc',

        // file Paths
        GET_FILES_DIRS: environment.apiUrl + '/dirs/files',
        UPLOAD_FILES_DIRS: environment.apiUrl + '/fileupload',
        DOWNLOAD_FILES: environment.apiUrl + '/downloadFile',
        LOGIN_DETAILS: environment.apiUrl + '/login/details',
        UPDATE_IMPLEMENTORS: environment.apiUrl + '/implementor/update',
        UPDATE_CLIENT: environment.apiUrl + '/client/update',
        DELETE_FILE_IN_FOLDER : environment.apiUrl + '/delete_file',
        RESET_PASSWORD: environment.apiUrl + '/password/reset'
    }
}