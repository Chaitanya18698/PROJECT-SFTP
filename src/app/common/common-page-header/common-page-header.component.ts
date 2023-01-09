import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EncryptionService } from 'src/app/encryption.service';
@Component({
  selector: 'app-common-page-header',
  templateUrl: './common-page-header.component.html',
  styleUrls: ['./common-page-header.component.scss']
})
export class CommonPageHeaderComponent implements OnInit {
  selectedOption: any = '';
  optionsList: any = [];
  isFileView:any = false;
  directoryData: any = [];
  @Input() refresh: any;
  @Output() sendonClickDirectory : any = new EventEmitter();
  @Output() moduleOption: any = new EventEmitter();
  @Output() directoryOption: any = new EventEmitter();
  constructor(public _encDec: EncryptionService) { }

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


  onDirectoryClick(item: any) {
    console.log(item, 'on click')
    this.sendonClickDirectory.emit(item)
  }

  selectModuleOption(item: any) {
    if(item.id === 1) {
      this.moduleOption.emit('add')
    }
    if(item.id == 2) {
      this.moduleOption.emit('file')
    }
  }

  selectDirectoryOption(item: any) {
    if(item.id === 1) {
      this.directoryOption.emit('add')
    }
    if(item.id == 2) {
      this.directoryOption.emit('file')
    }
  }



  selectClient(val: any) {
    this.selectedOption = val;
  }

  clear(val: any, e: any) {
    this.selectedOption = '';
  }

}
