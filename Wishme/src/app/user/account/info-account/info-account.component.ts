import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User, Users } from 'src/app/shared/interfaces'

@Component({
  selector: 'app-info-account',
  templateUrl: './info-account.component.html',
  styleUrls: ['./info-account.component.scss']
})
export class InfoAccountComponent {
  @Input() user!: User;
  @Input() friends: Users = [];
  @Output() addAFriend = new EventEmitter<string>();
  @Output() deleteAFriend = new EventEmitter<string>();
  isDeleting = false
  isEditing= false
  addFriend = false
  myFriends = false

  handleAddFriend(email: string){
    this.addAFriend.emit(email);
    this.addFriend = false
  }
  handleDeleteFriend(email: string){
    this.deleteAFriend.emit(email);
    this.myFriends = false
  }
}