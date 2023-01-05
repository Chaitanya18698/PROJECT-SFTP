import { Component, EventEmitter, Inject, Injectable, Input, OnInit, Output } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from  '@angular/forms'
import  { CommonService } from '../common.service';
import { EncryptionService } from '../encryption.service';
import { DOCUMENT } from '@angular/common'
declare var $:any;

@Injectable()
@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.scss'],
  providers: [Document]
})
export class AddFormComponent implements OnInit {
  @Input() userData: any = '';
  @Output() closeForm: any =  new EventEmitter()
  implementationList: any = [];
  selectedImplementor: any = '';
  selectedClient: any = '';
  clientsList: any = [];
  selectedModule: any = '';
  modulesList: any = [];
  addUserForm: any =  FormGroup;
  spinner = false;

  constructor( @Inject(Document) private document: Document, public _fb: FormBuilder, public _commonService: CommonService, public _encDec: EncryptionService) { }

  ngOnInit(): void {
    this.resetForm();
    this.implementationList = [
      {
        itemName: 'Hyderabad',
        id: 1
      },
      {
        itemName: 'Dubai',
        id: 2
      },
      {
        itemName: 'Chennai',
        id: 3
      },
    ];
    this.modulesList = [
      {
        itemName: 'Hyderabad',
        id: 1
      },
      {
        itemName: 'Dubai',
        id: 2
      },
      {
        itemName: 'Chennai',
        id: 3
      },
    ];
    this.clientsList = [
      {
        itemName: 'MC Donals',
        id: 1
      },
      {
        itemName: 'Meloraa',
        id: 2
      },
      {
        itemName: 'Shemaroo',
        id: 3
      },
    ];
  };

  resetForm() {
    this.addUserForm = this._fb.group({
      userName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      userId: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(10)]],
      generateFor: ['', [Validators.required]],
      module: ['', [Validators.required]],
      implementors: ['', [Validators.required]],
      client: ['', [Validators.required]]
    })
  }

  getImplementors() {
    this.spinner = true;
    const body = {}
    this._commonService.get_implementors(body).subscribe((response) => {
      response = this._encDec.decrypt(response.edc)
      if (response.success) {
        this.implementationList = response.data;
        this.spinner = false;
      } else {
        this.spinner = false;
      }
    })
  }

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

  getModules() {
    this.spinner = true;
    const body = {}
    this._commonService.get_modules(body).subscribe((response) => {
      response = this._encDec.decrypt(response.edc)
      if (response.success) {
        this.modulesList = response.data;
        this.spinner = false;
      } else {
        this.spinner = false;
      }
    })
  }

  onOpenForm(formName: any) {
    this.addUserForm.controls[formName].markAsTouched();
  }

  checkValidation(){
    this.addUserForm.markAllAsTouched();
    console.log(this.addUserForm, 'userform')
    if(this.addUserForm.userName.valid && this.addUserForm.userId.valid && this.addUserForm.client.valid && this.addUserForm.implementors.valid) {

    }


  }

  addUser() {
    const formData = this.addUserForm.value;
    const body = {
      name : formData.userName,
      id: formData.userId,
      generate_for: formData.generate_for,
      client_id: formData.client.client_id,
      implementor_id : formData.implementor.implementor_id,
    }
    this._commonService.add_user(body).subscribe( response => {
      response = this._encDec.decrypt(response.edc)
      if(response.success) {
        this.closeForm.emit(true)
      } else {

      }
    })
  }

  selectImplementor(item: any) {
    this.selectedImplementor = item.itemName;
  }

  selectClient(item: any) {
    this.selectedClient = item.itemName;
  }

  selectModule(item: any) {
    this.selectedModule = item.itemName;
  }

  clear(item: any, event: any) {
    event.stopPropagation();
    if(item == 'Module'){
      this.selectedModule = '';
    }else if(item == 'Client'){
      this.selectedClient = '';
    }else{
      this.selectedImplementor = '';
    }
  }

}
