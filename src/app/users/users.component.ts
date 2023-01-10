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

  onActionClick(item: any, type: any) {
    console.log(item, type)
    if(type === 'update') {
      this.get_login_details(item)
    }

  }


  get_login_details(item: any){
    const body = {
      id: item.id
    }
    this._commonService.get_login_details(body).subscribe((response) => {
      response = this._encDec.decrypt(response.edc)
      console.log(response)
      if (response.success) {
        this.userData = response.data;
        this.actionType = 'form'
      } else {
        alert('Something went wrong...!')
      }
    })
  }

  

  redirect(event: any) {
    console.log(event, 'form close event')
    this.actionType = 'table';
    if(event === 'client') {
      this.getUsers();
    }
  }



  openForm() {
    this._route.navigate(['/add-form', { form: 'users' }])
    this.userData = '';
    this.actionType = 'form'
  }

  // Click for actions
  valuPicked: any = null
  clickOnActions(item: any) {
    this.valuPicked = item
  }


  acdcLoginUser() {
    const body = {
      id: this.valuPicked.id,
      status: this.valuPicked.status == 1 ? 0 : 1
    }
    this._commonService.acdcLoginUser(body).subscribe((response: any) => {
      response = this._encDec.decrypt(response.edc)
      console.log('acdc', response)
      if (response.success) {
        alert('Update successfuly...!')
        $('#acdcNewModal').modal('hide')
        this.getUsers()
      }
    })
  }


}
