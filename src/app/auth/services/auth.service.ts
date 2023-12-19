import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environments } from "../../../environments/environments";
import { User } from "../interfaces/user.interface";
import { Observable, catchError, map, of, switchMap, tap } from "rxjs";

@Injectable( { providedIn: 'root'})
export class AuthService {

  private baseUrl: string = environments.baseUrl;
  private user?: User;

  constructor(private httpClient: HttpClient) { }

  get currentUser(): User | undefined {
    return structuredClone(this.user);
  }

  login(email: string, password: string): Observable<User> {

    return this.httpClient.get<User>(`${this.baseUrl}/users/1`)
      .pipe(
        tap(user => this.user = user),
        tap(user => localStorage.setItem('token', user.id.toString()))
      );
  }

  logout(): void {
    this.user = undefined;
    localStorage.removeItem('token');
  }

  checkUserIsAuthenticated(): Observable<boolean> {
    if (!localStorage.getItem('token')) return of(false);
    const token = localStorage.getItem('token');

    return this.httpClient.get<User>(`${this.baseUrl}/users/1`)
      .pipe(
        tap(u => this.user = u),
        map(u => !!u),
        catchError(err => of(false))
      );
  }
}
