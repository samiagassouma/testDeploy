import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})



export class UsersService {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  createUser(user: any) {
    return this.http.post(`${this.apiUrl}/users`, user);
  }

  findAllUsers() {
    return this.http.get(`${this.apiUrl}/users`);
  }
findUserById(id: number) {
    return this.http.get(`${this.apiUrl}/users/${id}`);
}
  updateUser(id: number, user: any) {
    return this.http.patch(`${this.apiUrl}/users/${id}`, user);
  }

  deleteUser(id: number) {
    return this.http.delete(`${this.apiUrl}/users/${id}`);
  }
}
