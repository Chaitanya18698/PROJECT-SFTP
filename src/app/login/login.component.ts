import { Component, OnInit } from '@angular/core';
declare var $:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  password_status:any = 'password';
  hidePassword:any = true;
  password_status1:any = 'password';
  hidePassword1:any = true;
  login_type:any = 'login';

  constructor() { }

  ngOnInit(): void {
    $('.otp-set-input').keyup((e:any) => {
  });
  }
  togglePassword(){
    this.hidePassword = !this.hidePassword;
  }

  togglePassword1(){
    this.hidePassword1 = !this.hidePassword1;
  }
  
  handleLogin(val:any){
    this.login_type = val;
  }
  
  handleOTP(e:any){
    if ($(e.target).value.length === e.maxLength) {
        let next = $(e).data('next');
        $('#n' + next).focus();
    }
  }
}
