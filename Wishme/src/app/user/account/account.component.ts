import { Component } from '@angular/core';
import { User } from 'src/app/shared/interfaces';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent {

  currentUser: User | null = null

  constructor(
    private userService: UserService
  ){}
  ngOnInit(){
    this.currentUser = this.userService.getMyInformations()
  }
}
