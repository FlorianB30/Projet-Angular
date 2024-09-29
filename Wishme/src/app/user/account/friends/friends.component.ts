import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss']
})
export class FriendsComponent {
  @Output() addFriend = new EventEmitter<string>();
  @Output() closePopUp = new EventEmitter<void>();

  friendsUserForm!: FormGroup
  
  
  constructor(
    private fb: FormBuilder
  ) { 
    this.friendsUserForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }
  get getErrorLabel(): string {
    if (!!this.friendsUserForm.controls?.['email']?.errors?.['email']) return 'Email doit être valide.';
    return 'Un problème est survenu';
  }
  onSubmit() {
    if (this.friendsUserForm.valid) {
      const formValues = this.friendsUserForm.value;
      this.addFriend.emit(formValues.email);
    }
  }

  close(){
    this.closePopUp.emit();
  }
}
