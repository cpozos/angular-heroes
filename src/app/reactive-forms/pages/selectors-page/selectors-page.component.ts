import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CountriesService } from '../../services/countries.service';
import { Region, SmallCountry } from '../../interfaces/country.interface';
import { count, filter, switchMap, tap } from 'rxjs';

@Component({
  selector: 'forms-selectors-page',
  templateUrl: './selectors-page.component.html'
})
export class FormsSelectorsPageComponent implements OnInit {
  public countriesByRegion: SmallCountry[] = [];
  public borderCountries: SmallCountry[] = [];

  public reactiveForm: FormGroup = this.builder.group({
    region: ['', Validators.required],
    country: ['', Validators.required],
    border: ['', Validators.required]
  });

  constructor(
    private builder: FormBuilder,
    private countryService: CountriesService) { }

  ngOnInit(): void {
    this.reactiveForm.controls['region'].valueChanges
      .pipe(
        tap(() => this.reactiveForm.controls['country'].setValue('')),
        filter(region => !!region),
        switchMap(region => this.countryService.getCountries(region))
      )
      .subscribe(countries => {
        this.countriesByRegion = countries;
      }
    );

    this.reactiveForm.controls['country'].valueChanges
      .pipe(
        tap(() => this.reactiveForm.controls['border'].setValue('')),
        filter(country => !!country),
        switchMap(country => this.countryService.getCountryByAlphaCode(country)),
        switchMap(country => this.countryService.getBorders(country))
      )
      .subscribe(borders => {
        this.borderCountries = borders;
        console.log(borders);
      });
  }

  get regions(): Region[] {
    return this.countryService.regions;
  }
}
