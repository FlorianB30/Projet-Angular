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
}