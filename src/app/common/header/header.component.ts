import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router'
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  userName : any= 'Admin'
  constructor( public _route: Router,
    public route: ActivatedRoute) { }

  ngOnInit(): void {
    this.userName = sessionStorage.getItem('userName') ? sessionStorage.getItem('userName') : 'Admin'
  }

  logOut() {
    sessionStorage.clear();
    this._route.navigate(['/login'])
  }

}
