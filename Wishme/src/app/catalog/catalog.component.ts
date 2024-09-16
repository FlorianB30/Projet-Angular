import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent {

  title = 'Catalogue des cadeaux'

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

}
