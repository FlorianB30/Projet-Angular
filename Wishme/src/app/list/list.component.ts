import { Component } from '@angular/core';
import { ListService } from '../shared/services/list.service';
import { Observable } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  lists$!: Observable<any>;
  formList: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(1)]),
    shared: new FormControl(false)
  });

  constructor(private listService: ListService) {
    this.lists$ = this.listService.getMyLists();
  }

  createList(): void {
    const list = {
      name: this.formList.value.name,
      id: "null",
      idUser: "",
      shared: this.formList.value.shared,
      items: []
    }
    this.listService.createList(list);
    this.lists$ = this.listService.getMyLists();
  }
  changeListStatus(status: boolean, id: string){
    this.listService.changeListStatus(status, id).subscribe(() => {
      this.lists$ = this.listService.getMyLists();
    });
  }
}
