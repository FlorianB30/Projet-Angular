import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent {
  @Output() valueSubmitted  = new EventEmitter<boolean>();
  confirm: boolean = false

  constructor() {}
}
