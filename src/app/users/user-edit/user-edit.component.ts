import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { NewUser } from 'src/app/shared/newUser.model';
import { User } from '../user.model';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
})
export class UserEditComponent implements OnInit {
  isProfessor = false;

  constructor(private dataStorageService: DataStorageService) {}

  ngOnInit(): void {}

  onSwitchType() {
    this.isProfessor = !this.isProfessor;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    const newUser = new NewUser(
      form.value.name,
      form.value.surname,
      form.value.email,
      form.value.password,
      this.isProfessor,
      []
    );
    this.dataStorageService.addNewUser(newUser);
  }
}
