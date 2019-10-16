import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  h1Style: boolean = false;
  potato: boolean = true;

  constructor() { }

  ngOnInit() {
  }

  makePotatoFalse(){
    this.potato = false;
  }

  firstClick(){
    this.h1Style = true;
  }


}
