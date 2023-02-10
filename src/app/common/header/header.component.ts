import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router'
import { CommonService } from 'src/app/common.service';
import { EncryptionService } from 'src/app/encryption.service';
declare var $:any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  userName : any= 'Admin'
  isReset = false;
  currentPassword: any = '';
  newPassword: any = '';
  confirmPassword: any = '';
  loginType: any = '';
  hidePassword2 = true;
  hidePassword1 = true;
  hidePassword = true;
  constructor( public _route: Router,
    public route: ActivatedRoute,
    public _encDec: EncryptionService,
    public _commonService: CommonService,) { }

  ngOnInit() {
    this.loginType = sessionStorage.getItem('loginType')
    $(document).on('click','.multi-dropdown .dropdown-menu',(event:any)=>{
      event.stopPropagation();
      event.stopImmediatePropagation();
    });
    this.userName = sessionStorage.getItem('userName') ? sessionStorage.getItem('userName') : 'Admin';
    if(this.userName) {
      this.userName = this.userName.trim();
      if(this.userName.split('').length > 0) {
        this.userName =  this.userName.split('').map((e: any) => e[0]).join('').substr(0,1).toUpperCase()
      }
    }
  }

  logOut() {
    sessionStorage.clear();
    this._route.navigate(['/login'])
  }

  showReset(){
    this.isReset = true;
  }

  resetPassword(){
    this.confirmPassword = '';
    this.currentPassword = '';
    this.newPassword = '';
  }

  togglePassword() {
    this.hidePassword = !this.hidePassword;
  }

  togglePassword1() {
    this.hidePassword1 = !this.hidePassword1;
  }

  togglePassword2() {
    this.hidePassword2 = !this.hidePassword2;
  }

  changePassword() {
    const body = {
      old_password: this.currentPassword,
      new_password: this.newPassword,
      confirm_password: this.confirmPassword
    }
    this._commonService.resetPassword(body).subscribe((response: any) => {
      response = this._encDec.decrypt(response.edc)
      console.log('acdc', response)
      if (response.success) {
        $('#passwordModal').modal('hide')
        alert('Update successfuly...!')
      }else{
        alert(response.message)

      }
    })
  }

}
