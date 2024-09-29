import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Item, List, Lists } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class ListService {
  private listsUrl = 'http://localhost:3000/lists'
  private listUrl = 'http://localhost:3000/list'
  private selecteListSource = new BehaviorSubject<List>({
    id: "",
    name: "",
    idUser: "",
    items: [],
    shared: false
  });
  selecteList$ = this.selecteListSource.asObservable();

  constructor(private http: HttpClient, private authService: AuthService) { }

  
  getListById(idList: string): void {
    const request = this.http.get<List>(`${this.listUrl}/${idList}`, {
      headers: {
        Authorization: `Bearer ${this.authService.getToken()}`
      }
    });
    request.subscribe(
      (data) => {
        this.selecteListSource.next(data);
      },
      error => console.error('Erreur lors de la recuperation de la liste par id', error)
    );
  }

  getMyLists(): Observable<Lists> {
    return this.http.get<Lists>(`${this.listsUrl}/my`, {
      headers: {
        Authorization: `Bearer ${this.authService.getToken()}`
      }
    });
  }

  getSharedLists(): Observable<Lists> {
    return this.http.get<Lists>(`${this.listsUrl}/shared`, {});
  }

  createList(list: List): void {
    this.http.post(
      this.listUrl,
      list,
      {
        headers: {
          Authorization: `Bearer ${this.authService.getToken()}`
        }
      }
    ).subscribe(
      (response) => {
        console.log('Liste ajouté avec succès', response); // Gérer la réponse ici
      },
      (error) => {
        console.error('Erreur lors de l\'ajout de la liste', error); // Gérer l'erreur ici
      }
    );
  }

  addItemToList(item: Item,listId: string): void {
    const url = `${this.listUrl}/${listId}`
    this.http.post(
      url,
      item,
      {
        headers: {
          Authorization: `Bearer ${this.authService.getToken()}`
        }
      }
    ).subscribe(
      (response) => {
        console.log('Item ajouté avec succès', response); // Gérer la réponse ici
      },
      (error) => {
        console.error('Erreur lors de l\'ajout de l\'item à la liste', error); // Gérer l'erreur ici
      }
    );
  }

  changeListStatus(status: boolean, listId: string): Observable<any> {
    const url = `${this.listUrl}/${listId}`
    return this.http.put(
      url,
      {
        "shared": status
      },
      {
        headers: {
          Authorization: `Bearer ${this.authService.getToken()}`
        }
      }
    );
  }

  removeItemFromList(idList: string, idItem: string): void {
    const url = `${this.listUrl}/${idList}/${idItem}`
    this.http.delete(
      url,
      {
        headers: {
          Authorization: `Bearer ${this.authService.getToken()}`
        }
      }
    ).subscribe(
      (response) => {
        console.log('Item ajouté avec succès', response); // Gérer la réponse ici
      },
      (error) => {
        console.error('Erreur lors de l\'ajout de l\'item à la liste', error); // Gérer l'erreur ici
      }
    );
  }
}
