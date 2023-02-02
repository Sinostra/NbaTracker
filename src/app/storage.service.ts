import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  public getData(key: string): string | null {
    return localStorage.getItem(key)
  }

  public saveData(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

}