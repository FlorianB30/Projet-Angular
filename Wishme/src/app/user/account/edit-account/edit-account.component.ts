import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-edit-account',
  templateUrl: './edit-account.component.html',
  styleUrls: ['./edit-account.component.scss']
})
export class EditAccountComponent {
  @Output() itemUpdated = new EventEmitter<boolean>();

  close(){
    this.itemUpdated.emit(true);
  }
}
