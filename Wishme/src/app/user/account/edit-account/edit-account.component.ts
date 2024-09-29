import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/shared/interfaces';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-edit-account',
  templateUrl: './edit-account.component.html',
  styleUrls: ['./edit-account.component.scss']
})
export class EditAccountComponent {
  @Input() user!: User;
  @Output() userUpdated = new EventEmitter<boolean>();

  editUserForm!: FormGroup
  
  
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) { 
    this.editUserForm = this.fb.group({
      name: [''],
      email: ['']
    });
  }

  onSubmit() {
    if (this.editUserForm.valid && this.user) {
      const formValues = this.editUserForm.value;
      let updatedUser = this.user;
      if(formValues.name && formValues.name != "" ){
        updatedUser.name = formValues.name
      }
      if(formValues.email && formValues.email != "" ){
        updatedUser.email = formValues.email
      }
      this.userService.updateUser(updatedUser)
      if(formValues.email){
        this.authService.disconnect()
        this.router.navigate(['/login']);
      }
    }
    this.userUpdated.emit(true);
  }

  close(){
    this.userUpdated.emit(true);
  }
}