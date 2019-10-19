import { Component, OnInit } from '@angular/core';
import {DataService} from '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  users: Object;

  // h1Style: boolean = false;
  // potato: boolean = true;

  // dependency injection in constructor
  constructor(private data: DataService) { }

  ngOnInit() {
    this.data.getUsers().subscribe(data => {
      this.users = data
      console.log(this.users)
    })
  }

  // makePotatoFalse(){
  //   this.potato = false;
  // }

  // firstClick(){
  //   this.data.secondClick();
  // }


}
