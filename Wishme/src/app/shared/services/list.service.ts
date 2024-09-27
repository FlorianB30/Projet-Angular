import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListService {
  private listsUrl = 'http://localhost:3000/lists'
  private selectedListsSource = new BehaviorSubject<any | null>(null);
  selectedLists$ = this.selectedListsSource.asObservable();
  private listsSource = new BehaviorSubject<any>([]);
  users$ = this.listsSource.asObservable();

  constructor(private http: HttpClient) { }

  getListByUser(): Observable<any> {
    return this.http.get<any>(`${this.listsUrl}/my`);
  }
}
