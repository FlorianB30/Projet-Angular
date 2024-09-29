import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent {
  @Input() item!: any;
  @Output() idItemToDelete = new EventEmitter<string>;

  deleteItemFromList(): void {
    this.idItemToDelete.emit(this.item.id)
  }
}
