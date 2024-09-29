import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ListService } from 'src/app/shared/services/list.service';

@Component({
  selector: 'app-list-friends',
  templateUrl: './list-friends.component.html',
  styleUrls: ['./list-friends.component.scss']
})
export class ListFriendsComponent {
  lists$!: Observable<any>;

  constructor(
    private listService: ListService
  ) {
    this.lists$ = this.listService.getMyFriendsLists();
  }

}
