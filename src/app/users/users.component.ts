import { Component, OnInit } from '@angular/core';
import { SharedService } from '../common/services/shared.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  constructor(public _sharedService: SharedService) { }

  ngOnInit(): void {
  }

}
