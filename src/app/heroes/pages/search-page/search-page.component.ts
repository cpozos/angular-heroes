import { Component } from '@angular/core';
import { Hero } from '../../interfaces/hero.interface';
import { FormControl } from '@angular/forms';
import { HeroesService } from '../../services/heroes.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html'
})
export class SearchPageComponent {
  public searchInput = new FormControl('');
  public heroes: Hero[] = [];
  public selectedHero?: Hero;

  public get searchValueIsNullOrWhitespace(): boolean {
    const value = this.searchValue;
    return !value || !value.trim();
  }

  public get searchValue(): string {
    return this.searchInput.value || '';
  }

  constructor(private heroesService: HeroesService) {}

  searchHero(): void {
    if (this.searchValueIsNullOrWhitespace) {
      return;
    }

    this.heroesService.getSuggestions(this.searchValue)
      .subscribe(heroes =>
      {
        console.log({ heroes });
        this.heroes = heroes
      });
  }

  onSelectedOption(event: MatAutocompleteSelectedEvent): void {
    this.selectedHero = event.option.value;
    if (this.selectedHero) {
      this.searchInput.setValue(this.selectedHero!.superhero);
    }
  }
}
