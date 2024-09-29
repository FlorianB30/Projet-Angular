import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Users } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-all-friends',
  templateUrl: './all-friends.component.html',
  styleUrls: ['./all-friends.component.scss']
})
export class AllFriendsComponent {
  @Input() friends: Users = []
  @Output() closePopUp = new EventEmitter<void>();
  @Output() deleteFriend = new EventEmitter<string>();


  emitDeleteFriend(email: string){
    this.deleteFriend.emit(email);
  }

  close(){
    this.closePopUp.emit();
  }
}
