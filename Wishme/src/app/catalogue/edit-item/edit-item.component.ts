import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemService } from '../../shared/services/item.service';
import { Item } from '../../shared/interfaces';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.scss']
})
export class EditItemComponent implements OnInit {
  @Input() item!: Item;
  @Output() itemUpdated = new EventEmitter<boolean>();

  editItemForm!: FormGroup
  selectedItem: Item | null = null

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private itemService: ItemService
  ) { 
    this.editItemForm = this.fb.group({
      name: [''],
      description: [''],
      price: ['', [Validators.min(0)]]
    });
  }

  ngOnInit() {
    this.itemService.selectedItem$.subscribe(selectedItem => {
      if (selectedItem){
        this.editItemForm.patchValue({
          name: selectedItem.name,
          description: selectedItem.description,
          price: selectedItem.price,
        });
        if(selectedItem){
          this.selectedItem = selectedItem
        }
      }
    });
  }

  onSubmit() {
    if (this.editItemForm.valid && this.selectedItem) {
      const formValues = this.editItemForm.value;
      let updatedItem = this.selectedItem;
      if(formValues.name && formValues.name != "" ){
        updatedItem.name = formValues.name
      }
      if(formValues.description && formValues.description != "" ){
        updatedItem.description = formValues.description
      }
      if(formValues.price && formValues.price != "" ){
        updatedItem.price = formValues.price
      }
      this.itemService.updateItem(updatedItem).subscribe(
        () => {
          this.itemService.getItems()
        },
        error => console.error('Erreur lors de l\'ajout de l\'item', error)
      );
    }
    this.itemUpdated.emit(true);
  }

  get priceControl() {
    return this.editItemForm.get('price');
  }

  close(){
    this.itemUpdated.emit(false);
  }
  
}
