import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.sass']
})
export class ContactComponent implements OnInit {

  messageForm: FormGroup;
  submitted = false;
  success = false;

  constructor(private formBuilder: FormBuilder){
    // form validation setup below
    this.messageForm = this.formBuilder.group({
      name: ['', Validators.required],
      // several validations are in the official docs for Angular 7
      message: ['', Validators.required]
    })
  }

  onSubmit() {
    this.submitted = true;
    if (this.messageForm.invalid){
      return;
    }
    // after this you'd usually connect to back-end data...
    this.success = true;
  }

  ngOnInit() {
  }

}
