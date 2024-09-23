import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent {
  constructor() {}
  confirm: boolean = false
  @Output() valueSubmitted  = new EventEmitter<boolean>();
}
