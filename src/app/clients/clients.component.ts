import { Component, OnInit } from '@angular/core';
import { SharedService } from '../common/services/shared.service';
import { EncryptionService } from '../encryption.service'
import { CommonService } from '../common.service'
import {Router, ActivatedRoute} from '@angular/router'
declare var $: any;
@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {
  clientName:  any = '';
  clientData: any = [];
  clientList: any = [];
  spinner = false;
  constructor(
    public _sharedService: SharedService,
    public _encDec: EncryptionService,
    public _commonService: CommonService,
    public _route: Router,
    public route: ActivatedRoute) { }
  

  ngOnInit(): void {
    this.getClients();
    this.clientList = [
      {
        client_name: 'MC Donald',
      },
      {
        client_name: 'Shemaroo',
      },
      {
        client_name: 'Meloraa',
      },
    ]
  }


  addClients() {
    const body = {
      client_name : '',
    }
    this._commonService.add_client(body).subscribe((response) => {
      response = this._encDec.decrypt(response.edc)
      if (response.success) {
        this.getClients();
      } else {
      }
    })
  }

  getClients() {
    const body = {}
    this._commonService.get_client(body).subscribe((response) => {
      response = this._encDec.decrypt(response.edc)
      if (response.success) {
        this.clientData = response.data;
        this.spinner = true;
      } else {
        this.spinner = false;
      }
    })
  }
}
