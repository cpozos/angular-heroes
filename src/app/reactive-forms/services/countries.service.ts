import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Country, Region, SmallCountry } from "../interfaces/country.interface";
import { Observable, combineLatest, map, of } from "rxjs";

@Injectable({ providedIn: 'root' })
export class CountriesService {
  private baseUrl : string = "https://restcountries.com/v3.1"
  constructor(private httpClient: HttpClient) { }

  get regions(): Region[] {
    return [ Region.Africa, Region.Americas, Region.Asia, Region.Europe, Region.Oceania ];
  }

  getCountries(region: Region) : Observable<SmallCountry[]> {
    if (!region) return of([]);

    return this.httpClient.get<Country[]>(`${this.baseUrl}/region/${region}?fields=cca3,name,borders`)
      .pipe(
        map(countries => countries.map<SmallCountry>(this.countryMapper))
      );
  }

  getCountryByAlphaCode(alphaCode: string): Observable<SmallCountry> {
    return this.httpClient.get<Country>(`${this.baseUrl}/alpha/${alphaCode}?fields=cca3,name,borders`)
      .pipe(
        map(this.countryMapper)
      );
  }

  getBorders(country : SmallCountry): Observable<SmallCountry[]> {
    if (!country?.borders || country.borders.length < 1) return of([]);

    const requests: Observable<SmallCountry>[] = [];

    country.borders.filter(b => !!b).forEach(b => {
      requests.push(this.getCountryByAlphaCode(b));
    });

    return combineLatest(requests);
  }

  countryMapper(country: Country, _index: number) : SmallCountry{
    return ({ name: country.name.common, cca3: country.cca3, borders: country.borders ?? [] });
  }
}
