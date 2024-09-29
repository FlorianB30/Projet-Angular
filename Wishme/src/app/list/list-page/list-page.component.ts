import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
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
  currentUser = ""
  myList = false
  listId: null | string = "";
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private listService: ListService,
    private authService: AuthService
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
      this.listService.getListById(this.listId).subscribe(
        (data) => {
          this.list = data;
          const userData = this.authService.getDecodedToken()
          this.currentUser = userData.id
          if(this.currentUser == data.idUser){
            this.myList = true
          }
        },
        error => console.error('Erreur lors de la recuperation de la liste par id', error)
      );
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
  handleGive(idItems: string): void {
    if(this.listId){
      this.listService.giveItem(this.listId,idItems).subscribe(() => {
        this.loadList()
      });
    }
  }
  handleUngive(idItems: string): void {
    if(this.listId){
      this.listService.ungiveItem(this.listId,idItems).subscribe(() => {
        this.loadList()
      });
    }
  }
}
