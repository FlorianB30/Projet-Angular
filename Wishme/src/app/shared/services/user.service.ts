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
  private friendsSource = new BehaviorSubject<Users>([]);
  friends$ = this.friendsSource.asObservable();

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {
  }

  getMyInformations(): User {
    this.authService.verifyToken()
    return this.authService.getUserInfo()
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

  getFriends(): void {
    const token = this.authService.getToken();
    const friends = this.http.get<Users>(
      `${this.usersUrl}/friends`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    friends.subscribe(
      (data) => {
        this.friendsSource.next(data);
      },
      error => console.error('Erreur lors de la recuperation des items', error)
    );
  }

  updateUser(user: User): void {
    const token = this.authService.getToken();
    const response =this.http.put(
      this.usersUrl,
      user,
      {
        headers: {
          Authorization: `Bearer ${token}`
        },
        observe: 'response'
      }
    )
    response.subscribe(
      (data) => {
        console.log(data.status)
      },
      error => console.error('Erreur lors de la recuperation des items', error)
    );
  }

  addFriend(email: string): void {
    const token = this.authService.getToken();
    const response =this.http.put(
      `${this.usersUrl}/friend/add`,
      {email: email},
      {
        headers: {
          Authorization: `Bearer ${token}`
        },
        observe: 'response'
      }
    )
    response.subscribe(
      (data) => {
        this. getFriends();
        console.log(data.status)
      },
      error => console.error('Erreur lors de l\'ajout d\'un ami', error)
    );
  }

  removeFriend(email: string): void {
    const token = this.authService.getToken();
    const response =this.http.put(
      `${this.usersUrl}/friend/remove`,
      {email: email},
      {
        headers: {
          Authorization: `Bearer ${token}`
        },
        observe: 'response'
      }
    )
    response.subscribe(
      (data) => {
        this. getFriends();
        console.log(data.status)
      },
      error => console.error('Erreur lors de la suppression d\'un ami', error)
    );
  }


  deleteUser(): void {
    const token = this.authService.getToken();
    const response = this.http.delete(this.usersUrl, {
      headers: {
          Authorization: `Bearer ${token}`
      },
      observe: 'response'
    })
    response.subscribe(
      (data) => {
        console.log(data.status)
      },
      error => console.error('Erreur lors de la recuperation des items', error)
    );
  }
}
