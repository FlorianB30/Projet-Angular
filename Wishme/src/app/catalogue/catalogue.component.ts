import { Component, OnInit } from '@angular/core';
import { ItemService } from '../shared/services/item.service';
import { Item, Items } from '../shared/interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { ListService } from '../shared/services/list.service';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.scss']
})
export class CatalogueComponent implements OnInit {
  catalogue: Items = [];
  isEditing = false;
  isAddding = false;
  currentPage: number = 1;
  itemsPerPage: number = 10;
  listId: string | null = null;

  constructor(
    private itemService: ItemService,
    private listService: ListService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.loadCatalogue();
    this.route.paramMap.subscribe(params => {
      this.listId = params.get('listId');
      this.loadCatalogue();
    });
  }

  loadCatalogue(): void {
    this.itemService.getItems()
    this.itemService.items$.subscribe(items => {
      this.catalogue = items
    });
  }
  addItemToList(item: Item): void {
    if(this.listId){
      this.listService.addItemToList(item, this.listId)
      this.router.navigate(['/list', this.listId], { relativeTo: this.route });
    }
    
  }

  viewDescription(itemId: string): void {
    this.router.navigate(['/item', itemId], { relativeTo: this.route });
  }
  editItem(selectedItem: Item): void {
    this.isEditing = true;
    this.itemService.selectItem(selectedItem);
  }
  deleteItem(itemId: string): void {
    this.itemService.deleteItem(itemId).subscribe(
      () => {
        this.loadCatalogue();
      },
      (error) => console.error('Erreur lors de la suppression de l\'item', error)
    );
  }

  get paginatedCatalogue(): Items {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.catalogue.slice(startIndex, startIndex + this.itemsPerPage);
  }

  nextPage(): void {
    if ((this.currentPage * this.itemsPerPage) < this.catalogue.length) {
      this.currentPage++;
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  totalPages(): number {
    return Math.ceil(this.catalogue.length / this.itemsPerPage);
  }
}