import { Component, EventEmitter, Inject, Injectable, Input, OnInit, Output } from '@angular/core';
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
export class AddFormComponent implements OnInit {
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

  parent_id: any = null
  // Form 
  clientForm: any = FormGroup

  constructor(@Inject(Document) private document: Document, public _fb: FormBuilder, public _commonService: CommonService, public _encDec: EncryptionService, public _route: Router, public route: ActivatedRoute) {
    // initaling  Form
    this.CreateClientForm()
  }

  ngOnInit(): void {
    this.parent_id = this.route.snapshot.paramMap.get('form');

    // Request for data of from
    this.getClients();
    this.getModules()
  };

  // resetForm() {
  //   this.addUserForm = this._fb.group({
  //     userName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
  //     userId: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(10)]],
  //     generateFor: ['', [Validators.required]],
  //     module: ['', [Validators.required]],
  //     implementors: ['', [Validators.required]],
  //     client: ['', [Validators.required]]
  //   })
  // }

  // getImplementors() {
  //   this.spinner = true;
  //   const body = {}
  //   this._commonService.get_implementors(body).subscribe((response) => {
  //     response = this._encDec.decrypt(response.edc)
  //     if (response.success) {
  //       this.implementationList = response.data;
  //       this.spinner = false;
  //     } else {
  //       this.spinner = false;
  //     }
  //   })
  // }


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

    console.log(this.clientForm.value)
    if (this.clientForm.valid) {
      this.postImplementor()
    } else {
      this.clientForm.markAllAsTouched();
      alert('Please fill requried fields...')
    }

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
    this._route.navigateByUrl(`/${this.parent_id}`)
  }




  // Create Client login
  CreateClientForm() {
    this.clientForm = this._fb.group({
      display_id: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(200)]],
      name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(200)]],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(200)]],
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
      client_id: [null, Validators.required],
      modules: [[], Validators.required]
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
    } else if (this.parent_id == 'users') {
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
}
