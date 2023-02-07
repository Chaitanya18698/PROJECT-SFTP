import { Component, OnInit } from '@angular/core';
import { SharedService } from '../common/services/shared.service';
import { EncryptionService } from '../encryption.service'
import { CommonService } from '../common.service'
import { Router, ActivatedRoute } from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
declare var $: any;

@Component({
  selector: 'app-modules',
  templateUrl: './modules.component.html',
  styleUrls: ['./modules.component.scss']
})
export class ModulesComponent implements OnInit {
  modulesData: any = [];
  clientList: any = [];
  spinner = false;
  isFileView = false;
  selectedItem: any = null
  moduleForm: any = FormGroup
  selectedClient: any = '';
  isTableView: any = true;
  refresh = false;
  shimmer = false;
  modalSpinner = false;

  constructor(
    public _sharedService: SharedService,
    public _encDec: EncryptionService,
    public _commonService: CommonService,
    public _route: Router,
    public route: ActivatedRoute, public _fb: FormBuilder) {
    // Create form group 
    this.createModuleForm()
  }

  loginType: any = null
  ngOnInit(): void {
    this.loginType = sessionStorage.getItem('loginType')
    if (this.loginType === '1') {
      this.getModules();
    } else {
      this.getFilesDirs(null)
    }
    this.checkcurrentFolder()
    this.clientList = [
      {
        name: 'Client 1',
        id: 1
      },
      {
        name: 'Client 2',
        id: 2
      },
      {
        name: 'Client 3',
        id: 3
      },
      {
        name: 'Client 4',
        id: 4
      },
    ]
  }

  // Create form for module
  createModuleForm() {
    this.moduleForm = this._fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      status: 1,
      dir_id: null
    })
  }




  // click button for ADD, Update, Active  & Deactive
  clickToAction(type: string, item: any = null) {
    this.createModuleForm()
    this.selectedItem = item
    switch (type) {
      case 'add':
        this.selectedItem = null;
        break;
      case 'update':
        this.moduleForm.patchValue({
          name: item.name,
          status: item.status,
          dir_id: item.dir_id
        })
        break
      case 'acdc':
        this.moduleForm.patchValue({
          name: item.name,
          status: item.status,
          dir_id: item.dir_id
        })
        break;

      default:
        break;
    }
  }


  // Get modules list
  getModules() {
    this.spinner = true;
    const body = {
      parent_id: null
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



  // Add || Update API's funtions
  addUpdateModules() {
    if (this.moduleForm.valid) {
      const data = this.moduleForm.value;
      if (!this.selectedItem) {
        this.modalSpinner = true

        const body = {
          name: data.name,
          parent_id: null
        }
        this._commonService.add_module(body).subscribe((response) => {
          response = this._encDec.decrypt(response.edc)
          console.log(response)
          if (response.success) {
            this.getModules();
            alert('Added successfully...!')

            $('#addNewModal').modal('hide')
            this.modalSpinner = false
          } else {
            this.modalSpinner = false
            this.spinner = false
          }
        })
      } else {
        this.modalSpinner = true

        const body = {
          name: data.name,
          dir_id: data.dir_id
        }
        this._commonService.update_module(body).subscribe((response) => {
          response = this._encDec.decrypt(response.edc)
          console.log(response)

          if (response.success) {
            alert('Updated successfully...!')
            $('#addNewModal').modal('hide')
            this.modalSpinner = false
            this.getModules();
          } else {
            this.modalSpinner = false
            this.spinner = false
          }
        })
      }
    } else {
      this.moduleForm.markAllAsTouched();
    }
  }

  // Activate ||  Deactivate API's function
  acdcSubmit() {
    if (this.moduleForm.valid) {
      this.modalSpinner = true;
      const data = this.moduleForm.value;
      const body = {
        dir_id: data.dir_id,
        status: this.selectedItem.status ? 0 : 1
      }

      console.log(body)
      this._commonService.acdc_module(body).subscribe((response) => {
        response = this._encDec.decrypt(response.edc)
        console.log(response)
        if (response.success) {
          this.modalSpinner = false
          alert('Updated successfully...!')
          $('#acdcNewModal').modal('hide')
          this.getModules();
        } else {
          this.modalSpinner = false
          alert('Something went wrong...!')
        }
      }, (error: any) => {
        this.modalSpinner = false
        alert('Something went wrong...!')
      })
    }
  }

  openView(item: any) {
    const fileDirectory = this._encDec.decrypt(sessionStorage.getItem('current_directory'));
    fileDirectory.push(item)
    sessionStorage.setItem('current_directory', this._encDec.encrypt(JSON.stringify(fileDirectory)))
    this.refresh = !this.refresh;
    this.isFileView = true
  }

  backTo(event: any) {
    console.log(event)
    this.valuePicked = null;
    this.refresh = !this.refresh;
    if (this.loginType === '1') {
      this.getModules();
    } else {
      this.getFilesDirs(null)
    }

  }

  getFilesDirs(parent_id: any) {
    const body = {
      parent_id
    }
    this._commonService.getFilesDirsData(body).subscribe((response: any) => {
      response = this._encDec.decrypt(response.edc);
      console.log("dirs ", response)
      if (response.success) {
        this.modulesData = response.data['directories']
      }
    })
  }
  onOpenForm(val: any) {

  }
  clear(val: any, e: any) {

  }
  selectClient(item: any) {

  }


  // click on view 
  valuePicked: any = null
  clickOnView(item: any) {

    const fileDirectory = this._encDec.decrypt(sessionStorage.getItem('current_directory'));
    fileDirectory.push(item)
    sessionStorage.setItem('current_directory', this._encDec.encrypt(JSON.stringify(fileDirectory)))
    this.refresh = !this.refresh;

    this.valuePicked = item
  }


  filleEmitter() {
    setTimeout(() => {
      this.refresh = !this.refresh;

    }, 100);
  }

  checkcurrentFolder() {
    this.valuePicked = null
    setTimeout(() => {

      const fileDirectory = this._encDec.decrypt(sessionStorage.getItem('current_directory'));
      if (fileDirectory.length) {
        this.valuePicked = fileDirectory.pop()
      }
    }, 10);
    // this.getModules();
  }

  navigateTo(event: any) {
    this.valuePicked = event;
    console.log(event, 'navigate to')
    this.refresh = !this.refresh
  }

}
