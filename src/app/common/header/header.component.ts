import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router'
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor( public _route: Router,
    public route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  logOut() {
    sessionStorage.clear();
    this._route.navigate(['/login'])
  }

}
