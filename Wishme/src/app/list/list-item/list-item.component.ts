import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent {
  @Input() item!: any;
  @Input() myList: boolean = false;
  @Input() currentUser: string = "";
  @Output() idItemToDelete = new EventEmitter<string>;
  @Output() idItemToGive = new EventEmitter<string>;
  @Output() idItemToUngive = new EventEmitter<string>;

  deleteItemFromList(): void {
    this.idItemToDelete.emit(this.item.id)
  }

  giveItem(itemId: string){
    this.idItemToGive.emit(this.item.id)
  }

  ungiveItem(itemId: string){
    this.idItemToUngive.emit(this.item.id)
  }

  didIGiveItem(): boolean{
    if(this.currentUser == this.item.giverId){
      return true
    }
    return false
  }
}
