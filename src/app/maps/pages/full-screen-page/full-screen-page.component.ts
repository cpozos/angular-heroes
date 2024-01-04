import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Map } from 'mapbox-gl';
import { environments } from '../../../../environments/environments';

@Component({
  selector: 'full-screen-page-component',
  templateUrl: './full-screen-page.component.html',
  styleUrl: './full-screen-page.component.css',
})
export class FullScreenPageComponent implements AfterViewInit {

  @ViewChild('myDivMap')
  public myDivMap?: ElementRef;

  ngAfterViewInit(): void {
    const map = new Map({
      container:this.myDivMap?.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [-74.5, 40], // starting position [lng, lat]
      zoom: 9, // starting zoom
      accessToken: environments.mapbox_key
    });
  }
}
