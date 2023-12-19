import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, map, of } from "rxjs";
import { Hero } from "../interfaces/hero.interface";
import { environments } from "../../../environments/environments";

@Injectable({providedIn: 'root'})
export class HeroesService {
  private baseUrl: string = environments.baseUrl;

  constructor(private httpClient: HttpClient) { }

  getHeroes(): Observable<Hero[]> {
    return this.httpClient.get<Hero[]>(`${this.baseUrl}/heroes`);
  }

  getHero(id: string): Observable<Hero | undefined> {
    return this.httpClient.get<Hero>(`${this.baseUrl}/heroes/${id}`)
      .pipe(
        catchError(error => {
          return of(undefined);
        })
      );
  }

  getSuggestions(query: string): Observable<Hero[]> {
    return this.httpClient.get<Hero[]>(`${this.baseUrl}/heroes?q=${query}&_limit=6}`);
  }

  addHero(hero: Hero): Observable<Hero>{
    return this.httpClient.post<Hero>(`${this.baseUrl}/heroes`, hero);
  }

  updateHero(hero: Hero): Observable<Hero>{
    if (!hero.id) throw new Error('Hero id is required');
    return this.httpClient.patch<Hero>(`${this.baseUrl}/heroes/${hero.id}`, hero);
  }

  deleteHero(id: string): Observable<boolean>{
    return this.httpClient.delete(`${this.baseUrl}/heroes/${id}`)
      .pipe(
        map(response => true),
        catchError(error => of(false))
      );
  }
}
