import { Component } from '@angular/core';
import { ItemService } from '../../shared/services/item.service';
import { Item } from '../../shared/models/item.model';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent {
  newItem: Item = { id: "0", name: '', description: '', price: 0 };
  addItem!: FormGroup;

  constructor(private itemService: ItemService, private router: Router, private fb: FormBuilder) { }

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
      this.itemService.getItems().subscribe(items => {
        const lastItem = items[items.length - 1];
        const newId = lastItem ? Number(lastItem.id) + 1 : 1;

        this.newItem = {
          id: newId.toString(),
          name: formValues.name,
          description: formValues.description,
          price: formValues.price
        };

        this.itemService.addItem(this.newItem).subscribe(
          () => {
        console.log('Item ajouté avec succès');
        this.router.navigate(['/catalogue']).then(() => {
          window.location.reload();
        });
        this.resetForm();
          },
          error => console.error('Erreur lors de l\'ajout de l\'item', error)
        );
      });
      
    }
  }
  
}
