import { Component, OnInit } from '@angular/core';
import { SharedService } from '../common/services/shared.service';

@Component({
  selector: 'app-modules',
  templateUrl: './modules.component.html',
  styleUrls: ['./modules.component.scss']
})
export class ModulesComponent implements OnInit {

  constructor(public _sharedService: SharedService) { }

  ngOnInit(): void {
  }

}
