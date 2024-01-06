import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Map, Marker } from 'mapbox-gl';
import { environments } from '../../../../environments/environments';

@Component({
  selector: 'mini-map',
  templateUrl: './mini-map.component.html',
  styleUrl: './mini-map.component.css',
})
export class MiniMapComponent implements AfterViewInit {

  @ViewChild('myDivMap')
  myDivMap?: ElementRef;

  @Input()
  public lngLat: [number, number] = [0, 0];

  ngAfterViewInit(): void {
    const map = new Map({
      container:this.myDivMap?.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: this.lngLat,
      zoom: 9,
      accessToken: environments.mapbox_key,
      dragPan: false,
      interactive: false
    });

    const marker = new Marker()
      .setLngLat(this.lngLat)
      .addTo(map);
  }
}
