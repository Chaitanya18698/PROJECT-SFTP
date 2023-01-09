import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-common-page-header',
  templateUrl: './common-page-header.component.html',
  styleUrls: ['./common-page-header.component.scss']
})
export class CommonPageHeaderComponent implements OnInit {
  selectedOption: any = '';
  optionsList: any = [];
  isFileView:any = false;

  constructor() { }

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
  }

  selectClient(val: any) {
    this.selectedOption = val;
  }

  clear(val: any, e: any) {
    this.selectedOption = '';
  }

}
