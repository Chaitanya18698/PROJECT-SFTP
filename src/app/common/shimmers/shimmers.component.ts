import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shimmers',
  templateUrl: './shimmers.component.html',
  styleUrls: ['./shimmers.component.scss']
})
export class ShimmersComponent implements OnInit {
  numOfCols:any = 5;

  constructor() { }

  ngOnInit(): void {
  }

}