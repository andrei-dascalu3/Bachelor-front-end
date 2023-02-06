import { Component, OnInit } from '@angular/core';
import { Form } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  uploadedImage: File;
  description: string;

  constructor() { }

  ngOnInit(): void {
  }

  onImageUpload(event: any) {
    this.uploadedImage = event.target.files[0];
  }

  onImageSubmit(form: Form) {

  }

  onDescriptionSubmit(form: Form) {

  }

  onPasswordSubmit(form: Form) {
    
  }

}
