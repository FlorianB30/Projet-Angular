import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { throwError, Observable, of, BehaviorSubject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { User } from '../shared/interfaces'
import { jwtDecode } from 'jwt-decode';
import { StorageService } from '../shared/services/storage.service';

@Injectable({
  providedIn: 'root',

})
export class AuthService {
  private authUrl = 'http://localhost:3000/auth'
  private tokenKey = 'wishMeToken';
  private userNameSource = new BehaviorSubject<string | null>(null);
  userName$ = this.userNameSource.asObservable();

  private userEmailSource = new BehaviorSubject<string | null>(null);
  userEmail$ = this.userEmailSource.asObservable();

  private userTokenSource = new BehaviorSubject<string | null>(null);
  userToken$ = this.userTokenSource.asObservable();

  private tokenIsVerifiedSource = new BehaviorSubject<boolean>(false);
  tokenIsVerified$ = this.tokenIsVerifiedSource.asObservable();

  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) {
    this.userNameSource.next(this.storageService.getItem("WishMeName"));
    this.userEmailSource.next(this.storageService.getItem("WishMeEmail"));
    this.userTokenSource.next(this.storageService.getItem("wishMeToken"));
    this.tokenIsVerifiedSource.next(false);
  }

  register(user: User): Observable<number> {
    return this.http.post(`${this.authUrl}/register`, user, { observe: 'response' }).pipe(
      map(response => {
        return response.status;
      }),
      catchError((error) => {
        console.error('Erreur lors de l\'enregistrement', error);
        return of(error.status);
      })
    );
  }

  login(credentials: User): Observable<any> {
    return this.http.post(`${this.authUrl}/login`, credentials, { observe: 'response' }).pipe(
      map((response: any) => {
        if (response.body.token) {
          this.saveToken(response.body.token);
          this.verifyToken();
        }
        return response.status;
      }),
      catchError((error) => {
        console.error('Erreur lors de la connexion', error);
        this.disconnect()
        return of(error.status);
      })
    );
  }

  verifyToken(): void {
    const token = this.getToken();
    const response = this.http.get(`${this.authUrl}/verify`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    response.subscribe(
      (res) => {
        this.tokenIsVerifiedSource.next(true);
        const token = this.getToken()
        if (token){
          this.saveToken(token);
        }
      },
      error =>{
        console.error('Erreur lors de la recuperation des items', error)
        this.tokenIsVerifiedSource.next(false);
      }
    );
  }

  private saveToken(token: string): void {
    this.storageService.setItem(this.tokenKey, token)
    this.userTokenSource.next(token);
    const userData = this.getDecodedToken()
    this.storageService.setItem("WishMeEmail", userData.email)
    this.storageService.setItem("WishMeName", userData.name)
    this.userNameSource.next(userData.name);
    this.userEmailSource.next(userData.email);
  }

  getToken(): string | null {
    return this.storageService.getItem(this.tokenKey);
  }

  getUserInfo(): User {
    let currentUser: User = {
      id: null,
      name: "",
      email: "",
      password: null
    }
    const email =  this.storageService.getItem("WishMeEmail")
    const name =  this.storageService.getItem("WishMeName")
    if(name){
      currentUser.name = name
    }
    if(email){
      currentUser.email = email
    }
    return currentUser

  }

  getDecodedToken(): any {
    const token = this.getToken();
    if (token) {
      return jwtDecode(token);
    }
    return null;
  }
  decodeToken(token: string): any {
    if (token) {
      return jwtDecode(token);
    }
    return null;
  }

  isConnected(): boolean {
    return !!this.getToken();
  }
  disconnect(): void {
    this.tokenIsVerifiedSource.next(false);
    this.storageService.removeItem(this.tokenKey)
    this.userTokenSource.next(null);
    this.storageService.removeItem("WishMeEmail")
    this.storageService.removeItem("WishMeName")
    this.userNameSource.next(null);
    this.userEmailSource.next(null);
  }
}
