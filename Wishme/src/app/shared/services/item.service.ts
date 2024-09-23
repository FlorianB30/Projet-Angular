import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Item, Items } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private apiUrl = 'http://localhost:3000/catalogue'; 
  private selectedItemSource = new BehaviorSubject<Item | null>(null);
  selectedItem$ = this.selectedItemSource.asObservable();
  private itemsSource = new BehaviorSubject<Items>([]);
  items$ = this.itemsSource.asObservable();

  constructor(private http: HttpClient) {
    this.selectedItemSource.next(null);
    this.itemsSource.next([]);
  }

  selectItem(selectedItem: Item){
    this.selectedItemSource.next(selectedItem);
  }

  getItems(): void {
    const items = this.http.get<Items>(this.apiUrl);
    items.subscribe(
      (data) => {
        this.itemsSource.next(data);
      },
      error => console.error('Erreur lors de la recuperation des items', error)
    );
  }

  getItem(id: string): Observable<Item> {
    return this.http.get<Item>(`${this.apiUrl}/${id}`);
  }

  addItem(item: Item): Observable<Item> {
    return this.http.post<Item>(this.apiUrl, item);
  }

  updateItem(item: Item): Observable<Item> {
    return this.http.put<Item>(`${this.apiUrl}/${item.id}`, item);
  }

  deleteItem(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}