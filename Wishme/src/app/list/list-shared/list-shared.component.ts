import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ListService } from 'src/app/shared/services/list.service';

@Component({
  selector: 'app-list-shared',
  templateUrl: './list-shared.component.html',
  styleUrls: ['./list-shared.component.scss']
})
export class ListSharedComponent {
  sharedLists$!: Observable<any>;

  constructor(private listService: ListService) {
    this.sharedLists$ = this.listService.getSharedLists();
  }
}
