import { SharedService } from "../common/services/shared.service";
import { CommonService } from "../common.service";
import { Injectable } from "@angular/core";
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { JwtHelperService } from "@auth0/angular-jwt";
import { EncryptionService } from "../encryption.service";
import { Observable } from "rxjs";

@Injectable({
    providedIn : 'root'
})

export class AuthGuard implements CanActivate {
    JwtHelper = new JwtHelperService();
    token: any = sessionStorage.getItem('token');
    loginType: any = ''
    constructor(
        public router: Router,
        public _encDec: EncryptionService,
        public _route: ActivatedRoute,
        public _sharedService: SharedService,
    ) {}
    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<any> {
        let navUrl: any = state.url;
        if(sessionStorage.getItem('token')) {
            this.token = sessionStorage.getItem('token');
            if(this.JwtHelper.isTokenExpired(this.token)) {
                sessionStorage.clear();
                this.router.navigate(['/login'], {
                    queryParams : {returnUrl : state.url}
                })
            }
            this.loginType = sessionStorage.getItem('login_type')
            if(route.data['roles'].includes(this.loginType)) {
                return true;
            } else {
                sessionStorage.clear();
                this.router.navigate(['/login'])
            }
        } else {
            sessionStorage.clear();
            this.router.navigate(['/login'])
        }
    }
}