import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { NewUser } from 'src/app/shared/newUser.model';
import { threadId } from 'worker_threads';
import { User } from '../user.model';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
})
export class UserEditComponent implements OnInit {
  isProfessor = false;
  isAdmin = false;

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
    const username = form.value.email;
    console.log(newUser);
    this.dataStorageService.addNewUser(newUser).subscribe(
      (resData) => {
        console.log(resData);
        this.dataStorageService.addRoleToUser(username, 'ROLE_USER').subscribe(
          (resData) => {
            console.log(resData);
          },
          (error) => {
            console.log(error);
          }
        );
        if (this.isAdmin) {
          this.dataStorageService
            .addRoleToUser(username, 'ROLE_ADMIN')
            .subscribe(
              (resData) => {
                console.log(resData);
              },
              (error) => {
                console.log(error);
              }
            );
        }
      },
      (error) => {
        console.log(error);
      }
    );

    form.reset();
  }
}
