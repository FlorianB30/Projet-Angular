import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-delete-account',
  templateUrl: './delete-account.component.html',
  styleUrls: ['./delete-account.component.scss']
})
export class DeleteAccountComponent {
  @Output() stopDeleting = new EventEmitter<boolean>();

  close(){
    this.stopDeleting.emit(true);
  }
}
