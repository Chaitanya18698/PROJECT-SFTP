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
  @Input() inputData: any = '';
  @Output() sendData: any = new EventEmitter();
  modulesData: any = [];
  constructor(
    public _sharedService: SharedService,
    public _encDec: EncryptionService,
    public _commonService: CommonService,
    public _route: Router,
    public route: ActivatedRoute
  ) { }

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
    if (this.inputData && this.inputData.dir_id) {
      // this.getModules();
      this.getFilesDirs(this.inputData.dir_id)
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
      parent_id: this.inputData.dir_id
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

  clickToOpen(item: any) {
    console.log(item)
    this.getFilesDirs(item.dir_id)
    const fileDirectory = this._encDec.decrypt(sessionStorage.getItem('current_directory'));
    fileDirectory.push(item)
    sessionStorage.setItem('current_directory', this._encDec.encrypt(JSON.stringify(fileDirectory)))
    this.outPutEmitter()
  }

  fileData: any[] = []

  getFilesDirs(parent_id: any) {
    const body = {
      parent_id
    }
    this._commonService.getFilesDirsData(body).subscribe((response: any) => {
      response = this._encDec.decrypt(response.edc);
      console.log("dirs ", response)
      if (response.success) {
        this.fileData = response.data['files']
        this.modulesData = response.data['directories']
      }
    })
  }
}
