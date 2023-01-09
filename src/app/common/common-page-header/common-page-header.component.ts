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
  isFileView: any = false;
  directoryData: any = [];
  @Input() refresh: any;
  @Output() sendonClickDirectory : any = new EventEmitter();
  @Output() moduleOption: any = new EventEmitter();
  @Output() directoryOption: any = new EventEmitter();
  @Output() goBack: any = new EventEmitter();
  moduleForm: any = FormGroup;
  spinner = false;
  constructor(public _encDec: EncryptionService, public _fb: FormBuilder, public _commonService: CommonService,) { 
    this.createModuleForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes , 'changes...')
    this.directoryData = this._encDec.decrypt(sessionStorage.getItem('current_directory'));
    console.log(this.directoryData , 'current directory');
  }

  ngOnInit(): void {
    this.optionsList = [
      {
        itemName: 'New Module',
        id: 1,
        icon: 'folder-plus'
      },
      {
        itemName: 'File Upload',
        id: 2,
        icon: 'file-arrow-up'
      },
      {
        itemName: 'Clients',
        id: 3,
        icon: 'user-check',
        children: [
          {
            id: 1,
            itemName: 'Client 1'
          },
          {
            id: 2,
            itemName: 'Client 2'
          },
          {
            id: 3,
            itemName: 'Client 3'
          },
          {
            id: 4,
            itemName: 'Client 4'
          },
        ]
      },
    ]
    this.directoryData = this._encDec.decrypt(sessionStorage.getItem('current_directory'));
    console.log(this.directoryData , 'current directory');
  }


  onDirectoryClick(item: any, i: any) {
    if(
      i !== this.directoryData.length - 1
    ) {
      let dirData = this._encDec.decrypt(sessionStorage.getItem('current_directory'));
      dirData = dirData.slice(0, i + 1)
      sessionStorage.setItem('current_directory', this._encDec.encrypt(JSON.stringify(dirData)))
      console.log(item, 'on click',i, dirData)
      this.sendonClickDirectory.emit(item)
    }

  }

  selectModuleOption(item: any) {
    if(item.id === 1) {
      this.createModuleForm();
      this.moduleForm.patchValue({
        dir_id: null
      });
      $('#commonHeadModel').modal('show')
    }
    if(item.id == 2) {
      this.moduleOption.emit('file')
    }
  }

  selectDirectoryOption(type: any, item: any) {
    console.log(item);
    if(type.id === 1) {
      this.createModuleForm();
      this.moduleForm.patchValue({
        dir_id: item.dir_id
      });
      $('#commonHeadModel').modal('show')
    }
    if(type.id == 2) {
      this.directoryOption.emit('file')
    }
  }

  onModuleClick() {
    sessionStorage.setItem(
      'current_directory',
      this._encDec.encrypt(JSON.stringify([]))
    );
    this.goBack.emit(true)
  }

    // Create form for module
    createModuleForm() {
      this.moduleForm = this._fb.group({
        name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(200)]],
        status: 1,
        dir_id: null
      })
    }


      // Add || Update API's funtions
  addUpdateModules() {
    if (this.moduleForm.valid) {
      const data = this.moduleForm.value;
        const body = {
          name: data.name,
          dir_id: data.dir_id
        }
        this._commonService.update_module(body).subscribe((response) => {
          response = this._encDec.decrypt(response.edc)
          console.log(response)
          if (response.success) {
            $('#commonHeadModel').modal('hide')
          } else {
            this.spinner = false
          }
        })
      }
  }


  selectClient(val: any) {
    this.selectedOption = val;
  }

  clear(val: any, e: any) {
    this.selectedOption = '';
  }

}
