import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemService } from '../../shared/services/item.service';
import { Item } from '../../shared/models/item.model';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.scss']
})
export class EditItemComponent implements OnInit {
  @Input() item!: Item;
  @Output() itemUpdated = new EventEmitter<any>();

  
  // item!: Item;
  editItemForm!: FormGroup
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private itemService: ItemService
  ) { 
    this.editItemForm = this.fb.group({
      name: [''],
      description: [''],
      price: ['']
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
      }

    });
    const id = this.route.snapshot.paramMap.get('id');
  }

  onSubmit() {
    if (this.item) {
      this.itemService.updateItem(this.item).subscribe(
        () => {
          console.log('Item mis à jour avec succès');
          this.router.navigate(['/catalogue']);
        },
        error => console.error('Erreur lors de la mise à jour de l\'item', error)
      );
    }
  }
}
