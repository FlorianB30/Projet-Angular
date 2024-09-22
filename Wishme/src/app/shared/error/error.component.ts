import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent {
  @Input() message: string = '';
  @Input() printcode: boolean = false;
  @Input() code: number | null = null;
  @Output() closePopup = new EventEmitter<void>();

  onOverlayClick() {
    this.closePopup.emit();
  }

  onCloseClick() {
    this.closePopup.emit();
  }
}
