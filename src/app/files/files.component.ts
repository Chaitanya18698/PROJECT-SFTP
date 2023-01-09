import { Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { SharedService } from '../common/services/shared.service';
import { EncryptionService } from '../encryption.service';
import { CommonService } from '../common.service';
import { Router, ActivatedRoute } from '@angular/router';
declare var $: any;
import { saveAs } from 'file-saver'
// import { saveAs } from 'file-saver'
@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.scss'],
})
export class FilesComponent implements OnInit, OnChanges {
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

  ngOnChanges(changes: SimpleChanges): void {
    if (this.inputData && this.inputData.dir_id) {
      // this.getModules();
      this.getFilesDirs(this.inputData.dir_id)
    }
  }

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



  clickOndownload(item: any) {

    const body = {
      id: item.id, // File ID
      dir_id: item.dir_id,
      // login_id: Joi.number().required(),
      // client_id: Joi.number().required(),
      s3_key: item.s3_key,
      file_name: item.file_name,
    }

    this._commonService.downloadFile(body).subscribe((response: any) => {
      console.log('before', response);
      // response = this._encDec.decrypt(response.edc)
      // const blob = new Blob(response.Body.data)
      // saveAs(blob, item.file_name)


      const ab = new ArrayBuffer(response.Body.data.length);
      const view = new Uint8Array(ab);
      for (let i = 0; i < response.Body.data.length; i++) {
        view[i] = response.Body.data[i];
      }
      const file = new Blob([ab], { type: response.ContentType });
      saveAs(file, item.file_name);
      console.log(response);
    })

  }
}
