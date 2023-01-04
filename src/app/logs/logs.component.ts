import { Component, OnInit } from '@angular/core';
import { SharedService } from '../common/services/shared.service';
import { EncryptionService } from '../encryption.service'
import { CommonService } from '../common.service'
import {Router, ActivatedRoute} from '@angular/router'
declare var $: any;

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss']
})
export class LogsComponent implements OnInit {
  logsData: any = [];
  spinner = false;
  constructor(
    public _sharedService: SharedService,
    public _encDec: EncryptionService,
    public _commonService: CommonService,
    public _route: Router,
    public route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getLogs();
  }


  getLogs() {
    this.spinner = true;
    const body = {}
    this._commonService.get_logs(body).subscribe((response) => {
      response = this._encDec.decrypt(response.edc)
      if (response.success) {
        this.logsData = response.data;
        this.spinner = false;
      } else {
        this.spinner = false;
      }
    })
  }

}
