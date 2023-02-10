import { Component, OnInit } from '@angular/core';
import { SharedService } from '../common/services/shared.service';
import { EncryptionService } from '../encryption.service'
import { CommonService } from '../common.service'
import { Router, ActivatedRoute } from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
declare var $: any;
@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {
  clientName: any = '';
  clientData: any = [];
  selectedItem: any = null
  spinner = false;
  modalSpinner = false;
  isReset = false;
  loginType: any = ''
  constructor(
    public _sharedService: SharedService,
    public _encDec: EncryptionService,
    public _commonService: CommonService,
    public _route: Router,
    public route: ActivatedRoute, public _fb: FormBuilder) {
    this.createClientForm()
  }

  clientForm: any = FormGroup


  ngOnInit(): void {
    this.loginType = sessionStorage.getItem('loginType')
    this.getClients();

  }

  // Form creation
  createClientForm() {
    this.clientForm = this._fb.group({
      client_name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      code: null,
      id: null,
      status: 1
    })
  }

  // Get clients list calling functions
  getClients() {
    this.spinner = true;
    const body = {}
    this._commonService.get_client(body).subscribe((response) => {
      response = this._encDec.decrypt(response.edc)
      console.log(response)
      if (response.success) {
        this.spinner = false;
        this.clientData = response.data;
      } else {
        this.spinner = false;
      }
    })
  }

  // click button for ADD, Update, Active  & Deactive
  clickToAction(type: string, item: any = null) {
    console.log(item, 'client item')
    this.createClientForm()
    this.selectedItem = item
    switch (type) {
      case 'add':
        this.selectedItem = null;
        break;
      case 'update':
        this.clientForm.patchValue({
          client_name: item.name,
          code: item.code,
          status: item.status,
          id: item.id
        })
        break
      case 'acdc':
        this.clientForm.patchValue({
          client_name: item.name,
          code: item.code,
          status: item.status,
          id: item.id
        })
        break;

      default:
        break;
    }
  }

  // Add  Client Data
  addClients() {
    if (this.clientForm.valid) {
      const data = this.clientForm.value

      if (!this.selectedItem) {

        const body = {
          name: data.client_name,
          code: this._commonService.codeGeneration(data.client_name)
        }
        this._commonService.add_client(body).subscribe((response) => {
          response = this._encDec.decrypt(response.edc)
          console.log(response)
          if (response.success) {
            alert('Added successfully...!')
            $('#addNewModal').modal('hide')
            this.getClients();
          } else {
            alert(response.message)

          }
        })
      } else {
        const body = {
          id: data.id,
          name: data.client_name
        }
        this._commonService.update_client(body).subscribe((response) => {
          response = this._encDec.decrypt(response.edc)
          console.log(response)
          if (response.success) {
            this.getClients();
            alert('Update successfully...!')
            $('#addNewModal').modal('hide')

          } else {
            alert(response.message)
          }
        })
      }
    } else {
      this.clientForm.markAllAsTouched();
    }
  }


  acdcSubmit() {
    if (this.clientForm.valid) {
      this.modalSpinner = true
      const data = this.clientForm.value;
      const body = {
        id: data.id,
        status: this.selectedItem.status ? 0 : 1
      }
      this._commonService.acdc_client(body).subscribe((response) => {
        response = this._encDec.decrypt(response.edc)
        console.log(response)
        if (response.success) {
          this.modalSpinner = false
          alert('Updated successfully...!')
          $('#acdcNewModal').modal('hide')
          this.getClients();
        } else {
          this.modalSpinner = false
          alert(response.message)
        }
      })
    }
  }

  showReset(){
    this.isReset = true;
  }

}
