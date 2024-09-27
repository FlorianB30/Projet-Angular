import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ListService {
  private listsUrl = 'http://localhost:3000/lists'
  private selectedListsSource = new BehaviorSubject<any | null>(null);
  selectedLists$ = this.selectedListsSource.asObservable();
  private listsSource = new BehaviorSubject<any>([]);
  users$ = this.listsSource.asObservable();

  constructor(private http: HttpClient, private authService: AuthService) { }

  getListByUser(): Observable<any> {
    return this.http.get<any>(`${this.listsUrl}/null`, {
      headers: {
        Authorization: `Bearer ${this.authService.getToken()}`
      }
    });
  }

  createList(list: any): void {
    this.http.put(this.listsUrl, 
      list,
      {
        headers: {
          Authorization: `Bearer ${this.authService.getToken()}`
        }
    });
    console.log(list)
  }
}
