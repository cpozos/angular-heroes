import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { delay, switchMap } from 'rxjs';
import { Hero } from '../../interfaces/hero.interface';
import { Location as AngularCommonLocation } from '@angular/common';

@Component({
  selector: 'app-hero-page',
  templateUrl: './hero-page.component.html',
  styles: ``
})
export class HeroPageComponent implements OnInit{

  private canGoBack: boolean;
  public hero?: Hero;

  constructor(
    private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private location: AngularCommonLocation)
  {
    // This is where the check is done. Make sure to do this
    // here in the constructor, otherwise `getCurrentNavigation()`
    // will return null.
    this.canGoBack = !!(this.router.getCurrentNavigation()?.previousNavigation);
  }

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        delay(2000),
        switchMap(({ id }) => this.heroesService.getHero(id))
      )
      .subscribe( hero => {
        if (!hero) return this.router.navigate(['/heroes/list']);

        this.hero = hero;
        return;
    });
  }

  goBack() {
    if (this.canGoBack) {
      // We can safely go back to the previous location as
      // we know it's within our app.
      this.location.back();
    }
    else {
      // There's no previous navigation.
      // Here we decide where to go. For example, let's say the
      // upper level is the index page, so we go up one level.
      this.router.navigate(['..'], {relativeTo: this.activatedRoute});
    }
  }
}
