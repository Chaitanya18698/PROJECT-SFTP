import { Component, OnInit } from '@angular/core';
import { SharedService } from '../common/services/shared.service';
import { EncryptionService } from '../encryption.service'
import { CommonService } from '../common.service'
import { Router, ActivatedRoute } from '@angular/router'
declare var $: any;

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  modulesData: any = [];
  spinner = false;
  actionType: any = 'table';
  userData: any = '';
  constructor(
    public _sharedService: SharedService,
    public _encDec: EncryptionService,
    public _commonService: CommonService,
    public _route: Router,
    public route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getUsers();
  }

  addUsers() {
    const body = {
      module_name: '',
    }
    this._commonService.add_user(body).subscribe((response) => {
      response = this._encDec.decrypt(response.edc)
      if (response.success) {
        this.getUsers();
      } else {
        this.spinner = false
      }
    })
  }

  getUsers() {
    this.spinner = true;
    const body = {
      loginType: 3
    }
    this._commonService.get_logs(body).subscribe((response) => {
      response = this._encDec.decrypt(response.edc)
      console.log('response', response)
      if (response.success) {
        this.modulesData = response.data;
        this.spinner = false;
      } else {
        this.spinner = false;
      }
    })
  }

  

  redirect(event: any) {
    console.log(event, 'form close event')
    this.actionType === 'table'
  }



  openForm() {
    this._route.navigate(['/add-form', {form: 'users'}])
  }

}
