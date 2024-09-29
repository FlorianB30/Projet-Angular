import { Component } from '@angular/core';
import { User, Users } from 'src/app/shared/interfaces';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent {

  currentUser: User | null = null
  friends: Users = []

  constructor(
    private userService: UserService
  ){}
  ngOnInit(){
    this.currentUser = this.userService.getMyInformations()
    this.userService.getFriends()
    this.userService.friends$.subscribe(friends => {
      this.friends = friends;
    });
  }

  handleAddFriend(email: string){
    this.userService.addFriend(email)
  }
  handleDeleteFriend(email: string){
    this.userService.removeFriend(email)
    this.userService.friends$.subscribe(friends => {
      this.friends = friends;
    });
  }
}