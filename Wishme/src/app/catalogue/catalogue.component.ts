// import { Component } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';

// @Component({
//   selector: 'app-catalog',
//   templateUrl: './catalog.component.html',
//   styleUrls: ['./catalog.component.scss']
// })
// export class CatalogComponent {

//   title = 'Catalogue des cadeaux'

//   constructor(
//     private router: Router,
//     private route: ActivatedRoute
//   ) { }

// }

import { Component, OnInit } from '@angular/core';
import { ItemService } from '../shared/services/item.service';
import { Item } from '../shared/models/item.model';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.css']
})
export class CatalogueComponent implements OnInit {
  items: Item[] = [];

  constructor(private itemService: ItemService) { }

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems(): void {
    this.itemService.getItems().subscribe(
      (items) => this.items = items,
      (error) => console.error('Erreur lors du chargement des items', error)
    );
  }
}