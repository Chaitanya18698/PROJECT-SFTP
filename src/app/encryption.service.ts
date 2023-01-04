import { Injectable} from '@angular/core';
import {environment} from '../environments/environment';
import * as CryptoJS from 'crypto-js'

@Injectable({
    providedIn: 'root'
})

export class EncryptionService {
    encrypt(message: any) {
        return (CryptoJS.AES.encrypt(message, environment.ENCRYPTION_KEY).toString())
    }

    decrypt(message: any) {
        const bytes = CryptoJS.AES.decrypt(message, environment.ENCRYPTION_KEY);
        const dec  = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        return dec;
    }
}