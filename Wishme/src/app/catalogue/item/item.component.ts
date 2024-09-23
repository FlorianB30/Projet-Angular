import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Item } from 'src/app/shared/interfaces';
import { ItemService } from 'src/app/shared/services/item.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
  item!: Item;

  constructor(
    private route: ActivatedRoute,
    private itemService: ItemService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadItem(id);
    } else {
      console.error('ID is null');
    }
  }

  loadItem(id: string): void {
    this.itemService.getItem(id).subscribe(
      (item) => this.item = item,
      (error) => console.error('Erreur lors du chargement de l\'item', error)
    );
  }
}
