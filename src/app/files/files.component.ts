import { Component, OnInit } from '@angular/core';
import { SharedService } from '../common/services/shared.service';
import { EncryptionService } from '../encryption.service'
import { CommonService } from '../common.service'
import {Router, ActivatedRoute} from '@angular/router'
declare var $: any;

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.scss']
})
export class FilesComponent implements OnInit {
  modulesData: any = [];
  modulesList: any = [];
  spinner = false;
  constructor(
    public _sharedService: SharedService,
    public _encDec: EncryptionService,
    public _commonService: CommonService,
    public _route: Router,
    public route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getModules();
    this.modulesList = [
      {
        module_name: 'Employee Management',
        module_id: 1
      },
      {
        module_name: 'Leave Management',
        module_id: 2
      },
      {
        module_name: 'Time & Attendace',
        module_id: 3
      },
    ]
  }

  addModules() {
    const body = {
      module_name : '',
    }
    this._commonService.add_module(body).subscribe((response) => {
      response = this._encDec.decrypt(response.edc)
      if (response.success) {
        this.getModules();
      } else {
        this.spinner = false
      }
    })
  }

  getModules() {
    this.spinner = true;
    const body = {}
    this._commonService.get_modules(body).subscribe((response) => {
      response = this._encDec.decrypt(response.edc)
      if (response.success) {
        this.modulesData = response.data;
        this.spinner = false;
        console.log(this.modulesData);        
      } else {
        this.spinner = false;
      }
    })
  }

}
