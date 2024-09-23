import { Component, EventEmitter, Output } from '@angular/core';
import { ItemService } from '../../shared/services/item.service';
import { Item } from '../../shared/interfaces';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent {
  @Output() itemAdded = new EventEmitter<boolean>();

  newItem: Item = { id: "0", name: '', description: '', price: 0 };
  addItem!: FormGroup;

  constructor(
    private itemService: ItemService,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.addItem = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]]
    });
  }

  resetForm() {
    this.addItem.reset();
  }

  onSubmit() {
    if (this.addItem.valid) {
      const formValues = this.addItem.value;
      this.newItem = {
        id: null,
        name: formValues.name,
        description: formValues.description,
        price: formValues.price
      };
      this.itemService.addItem(this.newItem).subscribe(
        () => {
          this.itemService.getItems()
          this.resetForm(); 
        },
        error => console.error('Erreur lors de l\'ajout de l\'item', error)
      );
    }
    this.itemAdded.emit(true);
  }

  close(){
    this.itemAdded.emit(false);
  }
  
}
