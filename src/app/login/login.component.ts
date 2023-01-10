import { Component, OnInit } from '@angular/core';
declare var $: any;
import { JwtHelperService } from '@auth0/angular-jwt';
import { EncryptionService } from '../encryption.service';
import { CommonService } from '../common.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  JwtHelper = new JwtHelperService();
  password_status: any = 'password';
  hidePassword: any = true;
  password_status1: any = 'password';
  hidePassword1: any = true;
  login_type: any = 'login';
  username: any = '';
  loading = false;
  error = '';
  errMsg = true;
  password1: any = '';

  constructor(
    public _encDec: EncryptionService,
    public _commonService: CommonService,
    public _route: Router,
    public route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    $('.otp-set-input').keyup((e: any) => {});
    sessionStorage.setItem(
      'current_directory',
      this._encDec.encrypt(JSON.stringify([]))
    );
  }
  togglePassword() {
    this.hidePassword = !this.hidePassword;
  }

  togglePassword1() {
    this.hidePassword1 = !this.hidePassword1;
  }

  handleLogin(val: any) {
    this.login_type = val;
  }

  handleOTP(e: any) {
    if ($(e.target).value.length === e.maxLength) {
      let next = $(e).data('next');
      $('#n' + next).focus();
    }
  }

  login() {
    this.loading = true;
    this.username = this.username.trim();
    if (this.username == '' || this.password1 === '') {
      this.errMsg = true;
      this.loading = false;
      this.error = 'Username and Password are required';
      return;
    }

    const body = {
      display_id: this.username,
      password: this._encDec.encrypt(this.password1),
    };
    console.log(body);
    this._commonService.loginapp(body).subscribe((response) => {
      response = this._encDec.decrypt(response.edc);
      console.log('response', response)
      if (!response.error) {
        sessionStorage.setItem('token', response.data.current_token);
        sessionStorage.setItem('loginType', response.data.loginType);
        if(response.data.loginType === 2) {
          sessionStorage.setItem('linked_tokens', this._encDec.encrypt(JSON.stringify(response.data.linkedClients)))
        }
        //Decode token
        let userData = this.JwtHelper.decodeToken(response.data.current_token);
        console.log(userData, ' userdata', response, 'response');
        sessionStorage.setItem(
          'current_directory',
          this._encDec.encrypt(JSON.stringify([]))
        );
      }
      if (response.success) {
        this.loading = false;
        this._route.navigate(['/modules']);
      } else {
        this.errMsg = true;
        this.loading = false;
        this.error = 'Server timeout. Please try again';
      }
    });
  }
}
