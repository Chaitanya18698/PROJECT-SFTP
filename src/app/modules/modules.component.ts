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
  spinner = false;
  isFileView = false;
  selectedItem: any = null
  moduleForm: any = FormGroup

  constructor(
    public _sharedService: SharedService,
    public _encDec: EncryptionService,
    public _commonService: CommonService,
    public _route: Router,
    public route: ActivatedRoute, public _fb: FormBuilder) {
    // Create form group 
    this.createModuleForm()
  }

  ngOnInit(): void {
    this.getModules();

  }

  // Create form for module
  createModuleForm() {
    this.moduleForm = this._fb.group({
      name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(200)]],
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
        const body = {
          name: data.name,
          parent_id: null
        }
        this._commonService.add_module(body).subscribe((response) => {
          response = this._encDec.decrypt(response.edc)
          console.log(response)
          if (response.success) {
            this.getModules();
            $('#addNewModal').modal('hide')
          } else {
            this.spinner = false
          }
        })
      } else {
        const body = {
          name: data.name,
          dir_id: data.dir_id
        }
        this._commonService.update_module(body).subscribe((response) => {
          response = this._encDec.decrypt(response.edc)
          console.log(response)

          if (response.success) {
            $('#addNewModal').modal('hide')
            this.getModules();
          } else {
            this.spinner = false
          }
        })
      }
    }
  }

  // Activate ||  Deactivate API's function
  acdcSubmit() {
    if (this.moduleForm.valid) {
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
          alert('Updated successfully...!')
          $('#acdcNewModal').modal('hide')
          this.getModules();
        } else {
          alert('Something went wrong...!')
        }
      }, (error: any) => {
        alert('Something went wrong...!')
      })
    }
  }


}
