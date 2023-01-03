import { Component, OnInit } from '@angular/core';
import { SharedService } from '../common/services/shared.service';

@Component({
  selector: 'app-implementors',
  templateUrl: './implementors.component.html',
  styleUrls: ['./implementors.component.scss']
})
export class ImplementorsComponent implements OnInit {

  constructor(public _sharedService: SharedService) { }

  ngOnInit(): void {
  }

}
