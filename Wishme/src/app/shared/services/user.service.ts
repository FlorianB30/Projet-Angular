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

  updateUser(user: User): Observable<number> {
    return this.http.put(`${this.usersUrl}/${user.id}`, user, { observe: 'response' }).pipe(
      map(response => {
        return response.status;
      }),
      catchError((error) => {
        console.error('Erreur lors de l\'enregistrement', error);
        return of(error.status);
      })
    );
  }

  deleteUser(id: string): Observable<number> {
    const token = this.authService.getToken();
    return this.http.delete(`${this.usersUrl}/${id}`, {
      headers: {
          Authorization: `Bearer ${token}`
      },
      observe: 'response'
  }).pipe(
      map(response => {
        return response.status;
      }),
      catchError((error) => {
        console.error('Erreur lors de l\'enregistrement', error);
        return of(error.status);
      })
    );
  }

}
