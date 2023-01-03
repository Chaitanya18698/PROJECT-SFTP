import { Component, OnInit } from '@angular/core';
declare var $:any;

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.scss']
})
export class AddFormComponent implements OnInit {
  implementationList: any = [];
  selectedImplementor: any = '';
  selectedClient: any = '';
  clientsList: any = [];
  selectedModule: any = '';
  modulesList: any = [];

  constructor() { }

  ngOnInit(): void {
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
