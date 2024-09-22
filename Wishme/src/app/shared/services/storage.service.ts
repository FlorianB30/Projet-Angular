import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor() { }
  
  setItem(key: string, value: string): void {
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  getItem(key: string): string | null {
    const item = sessionStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  removeItem(key: string): void {
    sessionStorage.removeItem(key);
  }

  clearAll(): void {
    sessionStorage.clear();
  }
}
