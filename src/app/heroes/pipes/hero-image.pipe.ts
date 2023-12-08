import { Pipe, PipeTransform } from "@angular/core";
import { Hero } from "../interfaces/hero.interface";

@Pipe({
  name: 'heroImage'
})
export class HeroImagePipe implements PipeTransform {
  transform(hero: Hero) : string {
    if (!hero?.id) {
      return 'assets/no-image.png';
    }

    const val =  hero.alt_img && !hero.alt_img.trim()
      ? hero.alt_img
      : `assets/heroes/${hero.id}.jpg`;
    console.log(val);
    return val;
  }
}
