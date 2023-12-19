import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Hero, Publisher } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, switchMap, tap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html'
})
export class NewPageComponent implements OnInit {

  public heroForm = new FormGroup({
    id: new FormControl(''),
    superhero: new FormControl<string>('', { nonNullable: true }),
    publisher: new FormControl<Publisher>(Publisher.DCComics),
    alter_ego: new FormControl(''),
    first_appearance: new FormControl(''),
    characters: new FormControl(''),
    alt_img: new FormControl(''),
  });

  public publishers = [
    { id: Publisher.DCComics, desc: 'DC - Comics' },
    { id: Publisher.MarvelComics, desc: 'Marvel - Comics' }
  ];

  public get currentHero(): Hero {
    return this.heroForm.value as Hero;
  }

  constructor(
    private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog) {
  }

  ngOnInit(): void {
    if (!this.router.url.includes('edit')) return;

    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.heroesService.getHero(id)))
      .subscribe(hero => {
        if (!hero) {
          return this.router.navigateByUrl('/');
        }

        // Set values to form
        this.heroForm.reset(hero);
        return;
      });
  }

  onSubmit(): void {
    if (!this.heroForm.valid) return;

    // Log data
    const value = this.heroForm.getRawValue();
    console.log({ value, isValid: this.heroForm.valid });

    // Update hero
    if (this.currentHero.id) {
      this.heroesService.updateHero(this.currentHero)
        .subscribe(hero => {
          this.showSnackBar(`Hero ${ hero.superhero } updated!`);
        });
      return;
    }

    // Add new hero
    this.heroesService.addHero(this.currentHero)
      .subscribe(hero => {
        this.showSnackBar(`New Hero ${hero.superhero} added!`);
        this.router.navigate(['/heroes/edit', hero.id]);
      });
  }

  onConfirmDeletion(): void {
    if (!this.currentHero.id) throw Error('Fatal Error');
    const ref = this.dialog.open(ConfirmDialogComponent, { data: this.currentHero });

    ref.afterClosed()
      .pipe(
        filter((result: boolean) => result),
        switchMap(() => this.heroesService.deleteHero(this.currentHero.id)),
        filter((wasDeleted: boolean) => wasDeleted),
      )
      .subscribe(() => this.router.navigateByUrl('/heroes'));

    // This worked but a shorter way using pipe was implemented above
    // ref.afterClosed().subscribe(result => {
    //   if (!result) return;
    //   this.heroesService.deleteHero(this.currentHero.id)
    //     .subscribe(wasDeleted => {
    //       if (wasDeleted) return this.router.navigateByUrl('/heroes');
    //     })
    // });
  }

  showSnackBar(message: string): void {
    this.snackBar.open(message, 'Done', {
      duration: 2000
    });
  }
}
