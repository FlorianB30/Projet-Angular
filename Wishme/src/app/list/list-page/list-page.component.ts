import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { List } from 'src/app/shared/interfaces';
import { ListService } from 'src/app/shared/services/list.service';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.scss']
})
export class ListPageComponent implements OnInit {
  list: List = {
    id: "",
    name: "",
    idUser: "",
    items: [],
    shared: false
  }
  listId: null | string = "";
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private listService: ListService
  ) {
    
  }
  ngOnInit(): void {
    this.loadList()
  }

  loadList(): void {
    this.route.paramMap.subscribe(params => {
      this.listId = params.get('listId');
    });
    this.listService.selecteList$.subscribe(selecteList => {
      if (selecteList){
        this.list = selecteList
      }
    });
    if(this.listId){
      this.listService.getListById(this.listId);
    }
  }

  openCatalogue(): void {
    this.router.navigate(['/catalogue', this.listId], { relativeTo: this.route });
  }

  handleDelete(idItems: string): void {
    if(this.listId){
      this.listService.removeItemFromList(this.listId,idItems)
      this.list.items = this.list.items.filter(item => item.id !== idItems);
    }
  }
}
