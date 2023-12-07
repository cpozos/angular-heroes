import { Pipe, PipeTransform } from "@angular/core";
import { Hero } from "../interfaces/hero.interface";

@Pipe({
  name: 'heroImage'
})
export class HeroImagePipe implements PipeTransform {
  transform(hero: Hero) : string {
    if (!hero) {
      return 'assets/no-image.png';
    }

    return hero.alt_img
      ? `assets/${hero.alt_img}`
      : `assets/heroes/${hero.id}.jpg`;
  }
}
