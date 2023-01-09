import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.scss']
})
export class TopMenuComponent implements OnInit {
  routeActive: any = 'modules'
  loginType: any;
  constructor(public routerlink: Router) {
    this.loginType = Number(sessionStorage.getItem('loginType'))
  }

  ngOnInit(): void {
    this.routeActive = this.routerlink.url
    console.log(this.loginType, this.routerlink.url)
  }

  handleRoute(val: any) {
    this.routeActive = val;
  }


  // Login Type   1 admin 2 implementer,  3 client 
  mainTabList = [
    {
      tabName: 'Modules',
      routerLink: '/modules',
      router: 'modules',
      rolePrivilage: [1, 2, 3],
      defaultRoute: true
    },
    {
      tabName: 'Clients',
      routerLink: '/clients',
      router: 'clients',
      rolePrivilage: [1],
      defaultRoute: false
    },
    // {
    //   tabName: 'Client Users',
    //   routerLink: '/client-users',
    //   router: 'client-users',
    //   rolePrivilage: [1],
    //   defaultRoute: false
    // },
    {
      tabName: 'Implementors',
      routerLink: '/implementors',
      router: 'implementors',
      rolePrivilage: [1],
      defaultRoute: false
    },
    {
      tabName: 'Users',
      routerLink: '/users',
      router: 'users',
      rolePrivilage: [1],
      defaultRoute: false
    },
    {
      tabName: 'Logs',
      routerLink: '/logs',
      router: 'logs',
      rolePrivilage: [1],
      defaultRoute: false
    }

  ]

}
