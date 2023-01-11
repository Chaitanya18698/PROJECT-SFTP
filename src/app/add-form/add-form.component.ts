import { Component, EventEmitter, Inject, Injectable, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { CommonService } from '../common.service';
import { EncryptionService } from '../encryption.service';
import { DOCUMENT } from '@angular/common'
import { ActivatedRoute, Router } from '@angular/router';
declare var $: any;

@Injectable()
@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.scss'],
  providers: [Document]
})
export class AddFormComponent implements OnInit, OnChanges {
  @Input() userData: any = '';
  @Output() closeForm: any = new EventEmitter()
  implementationList: any = [];
  selectedImplementor: any = '';
  selectedClient: any = '';
  clientsList: any = [];
  selectedModule: any = '';
  modulesList: any = [];
  addUserForm: any = FormGroup;
  spinner = false;
  @Input() backTo: any = ''
  parent_id: any = null
  // Form 
  clientForm: any = FormGroup

  constructor(@Inject(Document) private document: Document, public _fb: FormBuilder, public _commonService: CommonService, public _encDec: EncryptionService, public _route: Router, public route: ActivatedRoute) {
    // initaling  Form
    this.CreateClientForm()
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.parent_id = this.backTo;
    if(this.userData) {
      this.CreateClientForm();
      this.clientForm.controls['password'].setErrors(null);
      this.clientForm.controls['password'].clearValidators();
      // this.clientForm.controls['password'].updateValueandValidity();
      this.clientForm.patchValue({
        display_id: this.userData.display_id,
        name: this.userData.name,
        password: this.userData.password,
      })
      if(this.userData.clients.length  > 1) {
        this.userData.clients.forEach((arg: any, index: any) => {
          if(index !== 0) {
            this.addaOneMore();
          }
          this.clientForm.controls['priv'].controls[index].controls['client_id'].setValue(arg);
          this.clientForm.controls['priv'].controls[index].controls['modules'].setValue(arg.modules);
        })
      } else {
        this.clientForm.controls['priv'].controls[0].controls['client_id'].setValue(this.userData.clients[0]);
        this.clientForm.controls['priv'].controls[0].controls['modules'].setValue(this.userData.clients[0].modules);
      }
    }
    console.log(changes, 'userData', this.userData, this.clientForm);

  }

  ngOnInit(): void {
    this.parent_id = this.backTo;

    // Request for data of from
    this.getClients();
    this.getModules()
  };



  // Get client list Data
  getClients() {
    this.spinner = true;
    const body = {}
    this._commonService.get_client(body).subscribe((response) => {
      response = this._encDec.decrypt(response.edc)
      if (response.success) {
        this.clientsList = response.data;
        this.spinner = false;
      } else {
        this.spinner = false;
      }
    })
  }

  // Get module list data
  getModules() {
    this.spinner = true;
    const body = {
      parent_id: null
    }
    this._commonService.getModulesPath(body).subscribe((response) => {
      response = this._encDec.decrypt(response.edc)
      console.log('module',response)
      if (response.success) {
        this.modulesList = response.data;
        this.spinner = false;
      } else {
        this.spinner = false;
      }
    })
  }

  // onOpenForm(formName: any) {
  //   this.addUserForm.controls[formName].markAsTouched();
  // }

  // Click submit that before wheather its valid or not?
  checkValidation() {
    console.log(this.clientForm.controls.display_id.valid, this.clientForm.controls.password.valid,
      this.clientForm.controls.name.valid)
    if (this.clientForm.controls.display_id.valid && this.clientForm.controls.password.valid &&
       this.clientForm.controls.name.valid && this.checkFormArray()) {
      if(this.userData) {
        this.updateImplementor()
      } else {
        this.postImplementor()
      }
    } else {
      this.clientForm.markAllAsTouched();
      console.log(this.clientForm , 'form client')
    }
  }

  checkFormArray() {
    const output = this.clientForm.value.priv.every((ele: any) => {
      return ele.modules.length && ele.client_id.id
    })
    return output;
  }

  // addUser() {
  //   const formData = this.addUserForm.value;
  //   const body = {
  //     name: formData.userName,
  //     id: formData.userId,
  //     generate_for: formData.generate_for,
  //     client_id: formData.client.client_id,
  //     implementor_id: formData.implementor.implementor_id,
  //   }
  //   this._commonService.add_user(body).subscribe(response => {
  //     response = this._encDec.decrypt(response.edc)
  //     if (response.success) {
  //       this.closeForm.emit(true)
  //     } else {

  //     }
  //   })
  // }

  // selectImplementor(item: any) {
  //   this.selectedImplementor = item.itemName;
  // }

  // selectClient(item: any) {
  //   this.selectedClient = item.itemName;
  // }

  // selectModule(item: any) {
  //   this.selectedModule = item.itemName;
  // }

  // clear(item: any, event: any) {
  //   event.stopPropagation();
  //   if (item == 'Module') {
  //     this.selectedModule = '';
  //   } else if (item == 'Client') {
  //     this.selectedClient = '';
  //   } else {
  //     this.selectedImplementor = '';
  //   }
  // }

  // Back to Imlementor screen
  backToUrl() {
    this.closeForm.emit(this.backTo)
  }




  // Create Client login
  CreateClientForm() {
    this.clientForm = this._fb.group({
      display_id: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(10)]],
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(100)]],
      priv: this._fb.array([this.creatFormArray()])
    })

  }

  // TO get form array in form group
  get priv() {
    return this.clientForm.controls["priv"] as FormArray;
  }

  // Creating form group in array
  creatFormArray() {
    return this._fb.group({
      client_id: [null, [Validators.required]],
      modules: [[], [Validators.required]]
    })
  }

  // click to Add more
  addaOneMore() {
    this.priv.push(this.creatFormArray())
  }

  // Click to remove  
  removeForm(index: any) {
    this.priv.removeAt(index)
  }

  // /implementor  add functionlity
  postImplementor() {
    const data = this.clientForm.value;
    if (this.parent_id == 'implementors') {

      const body: any = {
        display_id: data.display_id,
        name: data.name,
        password: data.password,
        priv: []
      }

      for (const item of data.priv) {
        const subData = {
          client_id: item.client_id ? item.client_id.id : null,
          modules: item.modules.map((ele: any) => ele.id)
        }
        body.priv.push(subData)
      }
      console.log(body)

      this._commonService.add_implementors(body).subscribe((response: any) => {
        response = this._encDec.decrypt(response.edc);
        console.log("post response", response);
        if (response.success) {
          alert('Added successfully')
          this.backToUrl()
        } else {
          alert('Something went to worng...!')
        }
      }, error => {
        alert('Something went to worng...!')

      })
    } else if (this.parent_id == 'client') {
      const body: any = {
        display_id: data.display_id,
        name: data.name,
        password: data.password,
        
      }

      for (const item of data.priv) {
        const subData = {
          client_id: item.client_id ? item.client_id.id : null,
          modules: item.modules.map((ele: any) => ele.id)
        }
        body['client_id'] = subData.client_id
        body['modules'] = subData.modules
      }
      console.log(body)

      this._commonService.add_clientUser(body).subscribe((response: any) => {
        response = this._encDec.decrypt(response.edc);
        console.log("post response", response);
        if (response.success) {
          alert('Added successfully')
          this.backToUrl()
        } else {
          alert('Something went to worng...!')
        }
      }, error => {
        alert('Something went to worng...!')

      })
    }
  }

  // update functionality

  updateImplementor() {
    const data = this.clientForm.value;
    if (this.parent_id == 'implementors') {

      const body: any = {
        id: this.userData.id,
        display_id: data.display_id,
        name: data.name,
        password: data.password,
        priv: []
      }

      for (const item of data.priv) {
        const subData = {
          client_id: item.client_id ? item.client_id.id : null,
          modules: item.modules.map((ele: any) => ele.id)
        }
        body.priv.push(subData)
      }
      console.log(body)

      this._commonService.update_implementors(body).subscribe((response: any) => {
        response = this._encDec.decrypt(response.edc);
        console.log("post response", response);
        if (response.success) {
          alert('Updated successfully')
          this.backToUrl()
        } else {
          alert('Something went to worng...!')
        }
      }, error => {
        alert('Something went to worng...!')

      })
    } else if (this.parent_id == 'client') {
      const body: any = {
        id: this.userData.id,
        display_id: data.display_id,
        name: data.name,
        password: data.password,
        
      }

      for (const item of data.priv) {
        const subData = {
          client_id: item.client_id ? item.client_id.id : null,
          modules: item.modules.map((ele: any) => ele.id)
        }
        body['client_id'] = subData.client_id
        body['modules'] = subData.modules
      }
      console.log(body)

      this._commonService.update_clientUser(body).subscribe((response: any) => {
        response = this._encDec.decrypt(response.edc);
        console.log("post response", response);
        if (response.success) {
          alert('Updated successfully')
          this.backToUrl()
        } else {
          alert('Something went to worng...!')
        }
      }, error => {
        alert('Something went to worng...!')

      })
    }
  }
}
