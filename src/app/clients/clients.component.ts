import { Component, OnInit } from '@angular/core';
import { SharedService } from '../common/services/shared.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {
  
  constructor(public _sharedService: SharedService) { }

  ngOnInit(): void {
  }

}
