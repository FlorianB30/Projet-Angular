import { Component, OnInit } from '@angular/core';
import { ItemService } from '../shared/services/item.service';
import { Item } from '../shared/models/item.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.scss']
})
export class CatalogueComponent implements OnInit {
  catalogue: Item[] = [];
  isEditing = false;

  constructor(
    private itemService: ItemService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.loadCatalogue();
  }

  loadCatalogue(): void {
    this.itemService.getItems().subscribe(
      (catalogue) => this.catalogue = catalogue,
      (error) => console.error('Erreur lors du chargement des items', error)
    );
  }
  addItem(): void {
    this.isEditing = false;
    this.router.navigate(['addItem'], { relativeTo: this.route });
  }
  viewDescription(itemId: string): void {
    this.router.navigate(['/catalogue', itemId], { relativeTo: this.route });
  }
  editItem(selectedItem: Item): void {
    this.isEditing = true;
    this.itemService.selectItem(selectedItem);
    // this.router.navigate(['editItem', itemId], { relativeTo: this.route });
  }
  deleteItem(itemId: string): void {
    this.itemService.deleteItem(itemId).subscribe(
      () => {
        console.log('Item supprimé avec succès');
        this.loadCatalogue();
      },
      (error) => console.error('Erreur lors de la suppression de l\'item', error)
    );
  }
}