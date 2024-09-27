import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.scss']
})
export class ListPageComponent {
  @Input() sharedList: boolean = false;
  listItems!: any[];
}
