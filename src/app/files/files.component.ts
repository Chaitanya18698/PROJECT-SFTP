import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { SharedService } from '../common/services/shared.service';
import { EncryptionService } from '../encryption.service';
import { CommonService } from '../common.service';
import { Router, ActivatedRoute } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.scss'],
})
export class FilesComponent implements OnInit {
  filesData: any = [];
  filesList: any = [];
  spinner = false;
  isTableView = false;
  @Input() inputData: any =  '';
  @Output() sendData: any = new EventEmitter();
  modulesData: any = [];
  constructor(
    public _sharedService: SharedService,
    public _encDec: EncryptionService,
    public _commonService: CommonService,
    public _route: Router,
    public route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getfiles();
    this.filesList = [
      {
        file_name: 'bulk_upload.pdf',
        file_id: 1,
      },
      {
        file_name: 'employee_profile_picture.png',
        file_id: 2,
      },
      {
        file_name: 'payslip.pdf',
        file_id: 3,
      },
    ];
    if(this.inputData && this.inputData.parent_id) {
      this.getModules();
    }
  }

  addfiles() {
    const body = {
      file_name: '',
    };
    // this._commonService.add_file(body).subscribe((response) => {
    //   response = this._encDec.decrypt(response.edc)
    //   if (response.success) {
    //     this.getfiles();
    //   } else {
    //     this.spinner = false
    //   }
    // })
  }

   // Get modules list
   getModules() {
    this.spinner = true;
    const body = {
      parent_id: this.inputData.parent_id
    }

    this._commonService.get_modules(body).subscribe((response) => {
      response = this._encDec.decrypt(response.edc)
      console.log('reponse', response)
      if (response.success) {
        this.modulesData = response.data;
        this.spinner = false;
        console.log(this.modulesData);
      } else {
        this.spinner = false;
      }
    })
  }

  outPutEmitter() {
    this.sendData.emit(false)
  }

  getfiles() {
    this.spinner = true;
    const body = {};
    // this._commonService.get_files(body).subscribe((response) => {
    //   response = this._encDec.decrypt(response.edc)
    //   if (response.success) {
    //     this.filesData = response.data;
    //     this.spinner = false;
    //     console.log(this.filesData);
    //   } else {
    //     this.spinner = false;
    //   }
    // })
  }
}
