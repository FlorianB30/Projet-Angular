import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemService } from '../../shared/services/item.service';
import { Item } from '../../shared/models/item.model';
import { Form, FormGroup } from '@angular/forms';

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
    private route: ActivatedRoute,
    private router: Router,
    private itemService: ItemService
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.itemService.getItem(id).subscribe(
        item => this.item = item,
        error => console.error('Erreur lors du chargement de l\'item', error)
      );
    } else {
      console.error('ID is null');
    }
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
