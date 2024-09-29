import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmComponent } from 'src/app/shared/popup/confirm/confirm.component';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-delete-account',
  templateUrl: './delete-account.component.html',
  styleUrls: ['./delete-account.component.scss']
})
export class DeleteAccountComponent {
  @Output() stopDeleting = new EventEmitter<boolean>();
  @ViewChild(ConfirmComponent) popup!: ConfirmComponent;

  validate: boolean = false
  constructor(
    private userService: UserService,
    private router: Router
  ){}

  close(){
    this.stopDeleting.emit(true);
  }

  async getResponse(response: boolean): Promise<void> {
    this.validate = response;
    if(this.validate){
      this.deleteMyAccount()
      this.router.navigate(['/register']);
    }else{
      this.validate = false;
      this.close()
    }
  }

  deleteMyAccount(){
    this.userService.deleteUser()
  }

}