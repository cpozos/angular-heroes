import { Component } from '@angular/core';

interface MapsMenuItem {
  name : string;
  route: string;
}

@Component({
  selector: 'maps-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.css',
})
export class MapsSideMenuComponent
{
  public menuItems: MapsMenuItem[] = [
    { route: '/maps/full', name: 'FullScreen' },
    { route: '/maps/zoom', name: 'ZoomRange' },
    { route: '/maps/markers', name: 'Markers' },
    { route: '/maps/houses', name: 'Houses' },
  ];
}
