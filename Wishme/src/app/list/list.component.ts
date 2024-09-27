import { Component } from '@angular/core';
import { ListService } from '../shared/services/list.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  lists$!: Observable<any>;

  constructor(private listService: ListService) {
    this.lists$ = this.listService.getListByUser()
    // .subscribe(
    //   (lists) => {
    //     this.lists = lists
    //   },
    //   error => console.error('Erreur lors de la recuperation des listes', error)
    // );
  }
}
