import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { User } from '../shared/interfaces'
import { StorageService } from '../shared/services/storage.service';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',

})
export class AuthService {
  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) { }

  register(user: User): void{
    // ajouter gestion erreur, verifier code retour requete
    this.http.post('http://localhost:3000/users', user).subscribe();
    this.connect()
  }

  login(user: User):  Observable<User> {
    return this.http.get<User>(`http://localhost:3000/users?email=${user.email}&password=${user.password}`);
  }

  connect(): void {
    this.storageService.setItem("connected", "true")
  }
  isConnected(): boolean {
    const connected = this.storageService.getItem("connected")
    return connected === "true";
  }
  disconnect(): void {
    this.storageService.removeItem("connected")
  }
}
