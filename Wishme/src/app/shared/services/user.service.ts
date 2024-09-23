import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { throwError, Observable, of, BehaviorSubject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { User } from '../interfaces'
import { AuthService } from 'src/app/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private authUrl = 'http://localhost:3000/user'
  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {
  }

  verifyToken(): Observable<boolean> {
    const token = this.authService.getToken(this.tokenKey);
    return this.http.get(`${this.authUrl}/verify`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).pipe(
        tap(response => {
            console.log('Token validé', response);
            if (typeof token === 'string') {
                this.saveToken(token);
            }
        }),
        map(() => true),
        catchError((error) => {
            this.disconnect();
            console.error('Erreur lors de la vérification du token', error);
            return of(false);
        })
    );
  }
}
