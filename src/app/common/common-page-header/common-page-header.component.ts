import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'src/app/common.service';
import { EncryptionService } from 'src/app/encryption.service';
declare var $: any;
@Component({
  selector: 'app-common-page-header',
  templateUrl: './common-page-header.component.html',
  styleUrls: ['./common-page-header.component.scss']
})
export class CommonPageHeaderComponent implements OnInit, OnChanges {
  selectedOption: any = '';
  optionsList: any = [];
  optionsList1: any = [];
  isFileView: any = false;
  directoryData: any = [];
  @Input() refresh: any;
  @Output() sendonClickDirectory: any = new EventEmitter();
  @Output() moduleOption: any = new EventEmitter();
  @Output() refreshOption: any = new EventEmitter();
  @Output() goBack: any = new EventEmitter();
  moduleForm: any = FormGroup;
  spinner = false;
  modalSpinner = false;
  loginType: any = '';
  linkedClients: any = [];
  Number = Number
  constructor(public _encDec: EncryptionService, public _fb: FormBuilder, public _commonService: CommonService,) {
    this.createModuleForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes, 'changes...')
    this.loginType = sessionStorage.getItem('loginType');
    this.directoryData = this._encDec.decrypt(sessionStorage.getItem('current_directory'));
    console.log(this.directoryData, 'current directory');

    if(this.directoryData.length){
      $('#moduleDropMenu').hasClass('hide')
    };
  }

  ngOnInit(): void {
    $(document).on('click',(event:any)=>{

      if(!$(event.target).closest('#moduleDropMenu').length){
        $('#moduleDropMenu').dropdown('hide')
      }
      event.stopPropagation();
      event.stopImmediatePropagation();
    });
    this.loginType = sessionStorage.getItem('loginType');
    if(this.directoryData.length){
      $('#moduleDropMenu').hasClass('hide')
    }
    if (this.loginType === '2') {
      this.linkedClients = this._encDec.decrypt(sessionStorage.getItem('linked_tokens'))
      console.log(this.linkedClients, 'linked c lients');
      this.linkedClients.forEach((arg: any, index: any) => {
        arg['selected'] = index == 0 ? true : false
        if (index === 0) {
          this.selectedOption = arg.name
        }
      })
    }
    console.log(this.loginType)
    this.optionsList = [
      {
        itemName: 'New Module',
        id: 1,
        icon: 'folder-plus',
        privilage: [1]
      },
      {
        itemName: 'File Upload',
        id: 2,
        icon: 'file-arrow-up',
        privilage: [2, 3]

      }
    ]
    this.optionsList1 = [
      {
        itemName: 'New Module',
        id: 1,
        icon: 'folder-plus'
      }
    ]
    this.directoryData = this._encDec.decrypt(sessionStorage.getItem('current_directory'));
    console.log(this.directoryData, 'current directory');
  }


  onDirectoryClick(item: any, i: any) {
    if (
      i !== this.directoryData.length - 1
    ) {
      let dirData = this._encDec.decrypt(sessionStorage.getItem('current_directory'));
      dirData = dirData.slice(0, i + 1)
      sessionStorage.setItem('current_directory', this._encDec.encrypt(JSON.stringify(dirData)))
      console.log(item, 'on click', i, dirData)
      this.sendonClickDirectory.emit(item)
    }

  }

  selectModuleOption(item: any) {
    if (item.id === 1) {
      this.createModuleForm();
      this.moduleForm.patchValue({
        dir_id: null
      });
      $('#commonHeadModel').modal('show')
    }
    if (item.id == 2) {
      this.moduleOption.emit('file')
    }
  }

  selectDirectoryOption(type: any, item: any) {
    console.log(item);
    if (type.id === 1) {
      this.createModuleForm();
      this.moduleForm.patchValue({
        dir_id: item.dir_id
      });
      $('#commonHeadModel').modal('show')
    }
    if (type.id == 2) {
      $('#fileUpload').modal('show')
      this.modalSpinner = false

      this.fileData = null
    }
  }

  onModuleClick() {
    // const Cd = this._encDec.decrypt(sessionStorage.getItem('current_directory'))
    // if (Cd && Cd.length) {

      
    sessionStorage.setItem(
      'current_directory',
      this._encDec.encrypt(JSON.stringify([]))
    );
    this.goBack.emit(true)
    // }

    if(this.directoryData.length == 0 && this.loginType == '1'){
      if($('#moduleDropMenu').hasClass('show')){
        $('#moduleDropMenu').dropdown('hide');
      }else{
        $('#moduleDropMenu').dropdown('show')
      }
    }else{
    }
  }

  // Create form for module
  createModuleForm() {
    this.moduleForm = this._fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      status: 1,
      dir_id: null
    })
  }


  // Add || Update API's funtions
  addUpdateModules() {
    if (this.moduleForm.valid) {
      const data = this.moduleForm.value;
      const currentDir = this.directoryData.length ? this.directoryData[this.directoryData.length - 1] : null

      const body = {
        name: data.name,
        // dir_id: data.dir_id,
        parent_id: currentDir ? currentDir.dir_id : null
      }
      console.log('body', body)
      this._commonService.add_module(body).subscribe((response) => {
        response = this._encDec.decrypt(response.edc)
        console.log(response)
        if (response.success) {
          $('#commonHeadModel').modal('hide')
          alert("Added successfully...!")
          this.refreshOption.emit(true)
        } else {
          alert(response.message)
          this.spinner = false
        }
      })
    } else {
      this.moduleForm.markAllAsTouched();
    }
  }


  selectClient(val: any) {
    this.selectedOption = val.name;
    this.linkedClients.forEach((arg: any) => {
      arg['selected'] = arg.client_id === val.client_id ? true : false;
    })
    sessionStorage.setItem('token', val.token)
    this.onModuleClick();
  }

  clear(val: any, e: any) {
    this.selectedOption = '';
  }


  fileName: any = null
  fileData: any = null
  fileupload(event: any) {
    console.log(event)
    this.modalSpinner = true;

    const file: File = event.target.files[0];

    if (file) {

      this.fileName = file.name;

      const extention = this.fileName.split('.').pop()
      const accept = ["csv", "doc", "docx", "jpeg", "jpg", "m4v", "mp3", "mp4", "mp4v", "pdf", "png", "ppt", "xls", "xlsx"]
      if (accept.includes(extention)) {


        const formData = new FormData();

        formData.append("thumbnail", file);
        const data = this.directoryData[this.directoryData.length - 1]
        const body = {

          id: null,
          dir_id: data.dir_id,
        }

        const enc = this._encDec.encrypt(JSON.stringify(body))
        formData.append('edc', enc)
        this._commonService.fileUpload(formData).subscribe((response: any) => {
          console.log('before', response)
          response = this._encDec.decrypt(response.edc);
          console.log('ec', response)
          if (response.success) {
            this.refreshOption.emit(true)
            alert('Upload successfully...!')
            this.modalSpinner = false
            this.fileData = '';
            $('#fileUpload').modal('hide')
          }
        })
      } else {
        alert('invalid file upload')
        this.fileName = null;
        this.fileData = null;
        this.modalSpinner = false;
      }
    }
  }

  
}
