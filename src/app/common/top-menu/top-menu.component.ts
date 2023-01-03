import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.scss']
})
export class TopMenuComponent implements OnInit {
  routeActive: any = 'Modules'

  constructor() { }

  ngOnInit(): void {
  }

  handleRoute(val: any) {
    this.routeActive = val;
  }

}
