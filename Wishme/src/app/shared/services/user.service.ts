import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { throwError, Observable, of, BehaviorSubject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { User, Users } from '../interfaces'
import { AuthService } from 'src/app/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private usersUrl = 'http://localhost:3000/users'
  private selectedUserSource = new BehaviorSubject<User | null>(null);
  selectedUser$ = this.selectedUserSource.asObservable();
  private usersSource = new BehaviorSubject<Users>([]);
  users$ = this.usersSource.asObservable();
  
  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {
  }

  getUserById(id: string): void {
    const user = this.http.get<User>(`${this.usersUrl}/${id}`);
    user.subscribe(
      (data) => {
        this.selectedUserSource.next(data);
      },
      error => console.error('Erreur lors de la recuperation des items', error)
    );
  }

  getUserByEmail(email: string): void {
    const user = this.http.get<User>(`${this.usersUrl}/email/${email}`);
    user.subscribe(
      (data) => {
        this.selectedUserSource.next(data);
      },
      error => console.error('Erreur lors de la recuperation des items', error)
    );
  }

  getUsers(): void {
    const user = this.http.get<Users>(this.usersUrl);
    user.subscribe(
      (data) => {
        this.usersSource.next(data);
      },
      error => console.error('Erreur lors de la recuperation des items', error)
    );
  }
  // getUserById(): Observable<User> {
  //   const token = this.authService.getToken();
  //   return this.http.get(`${this.authUrl}/verify`, {
  //       headers: {
  //           Authorization: `Bearer ${token}`
  //       }
  //   }).pipe(
  //       tap(response => {
  //           console.log('Token validé', response);
  //           if (typeof token === 'string') {
  //               this.saveToken(token);
  //           }
  //       }),
  //       map(() => true),
  //       catchError((error) => {
  //           this.disconnect();
  //           console.error('Erreur lors de la vérification du token', error);
  //           return of(false);
  //       })
  //   );
  // }
}
