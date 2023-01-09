import { Component, OnInit } from '@angular/core';
import { SharedService } from '../common/services/shared.service';
import { EncryptionService } from '../encryption.service'
import { CommonService } from '../common.service'
import { Router, ActivatedRoute } from '@angular/router'
declare var $: any;

@Component({
  selector: 'app-implementors',
  templateUrl: './implementors.component.html',
  styleUrls: ['./implementors.component.scss']
})
export class ImplementorsComponent implements OnInit {
  implementorsData: any = [];
  spinner = false;
  actionType = 'table';
  userData: any = '';
  constructor(
    public _sharedService: SharedService,
    public _encDec: EncryptionService,
    public _commonService: CommonService,
    public _route: Router,
    public route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getImplementors();
  }

  addImplementors() {
    const body = {
      client_name: '',
    }
    this._commonService.add_implementors(body).subscribe((response) => {
      response = this._encDec.decrypt(response.edc)
      if (response.success) {
        this.getImplementors();
      } else {
        this.spinner = false
      }
    })
  }

  getImplementors() {
    this.spinner = true;
    const body = {
      loginType: 2
    }
    this._commonService.get_logs(body).subscribe((response) => {
      response = this._encDec.decrypt(response.edc)
      console.log("response im", response)
      if (response.success) {
        this.implementorsData = response.data;
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
    this._route.navigate(['/add-form', {form: 'implementors'}])
  }

}
