import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataStorageService } from 'src/app/shared/services/data-storage.service';
import { NewUser } from 'src/app/shared/models/newUser.model';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
})
export class UserEditComponent implements OnInit {
  isProfessor = false;
  isAdmin = false;

  isLoading = false;
  error: string = '';

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
    this.isLoading = true;
    this.dataStorageService.addNewUser(newUser).subscribe((resData) => {
      this.isLoading = false;
      console.log(resData);
      this.dataStorageService
        .addRoleToUser(username, 'ROLE_USER')
        .subscribe((resData) => {
          console.log(resData);
          this.isLoading = false;
        }, errorMessage => {
          console.log(errorMessage);
          this.error = errorMessage;
          this.isLoading = false;
        });
      if (this.isAdmin) {
        this.dataStorageService
          .addRoleToUser(username, 'ROLE_ADMIN')
          .subscribe((resData) => {
            console.log(resData);
            this.isLoading = false;
          }, errorMessage => {
            console.log(errorMessage);
            this.error = errorMessage;
            this.isLoading = false;
          });
      }
    }, errorMessage => {
      console.log(errorMessage);
      this.error = errorMessage;
      this.isLoading = false;
    });
    form.reset();
  }

  private errorHandler(errorMessage: string) {
    console.log('AICI');
    this.isLoading = false;
    console.log(errorMessage);
    this.error = errorMessage;
  }
}
