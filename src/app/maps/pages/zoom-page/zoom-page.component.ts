import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { LngLat, Map } from 'mapbox-gl';
import { environments } from '../../../../environments/environments';

@Component({
  selector: 'zoom-page-component',
  templateUrl: './zoom-page.component.html',
  styleUrl: './zoom-page.component.css',
})
export class ZoomPageComponent implements AfterViewInit, OnDestroy {

  @ViewChild('myDivMap')
  public myDivMap?: ElementRef;

  map?: Map;
  public currentZoomValue: number = 5;
  public currentCenter: LngLat = new LngLat(-70, 40);

  ngAfterViewInit(): void {
    this.map = new Map({
      container:this.myDivMap?.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.currentCenter, // starting position [lng, lat]
      zoom: this.currentZoomValue, // starting zoom
      accessToken: environments.mapbox_key
    });

    this.map.on('zoom', (ev) => {
      this.currentZoomValue = this.map!.getZoom();
    });

    this.map.on('zoomend', (ev) => {
      if (this.map!.getZoom() < 18) return;
      this.map!.setZoom(18);
    });

    this.map.on('moveend', (ev) => {
      this.currentCenter = this.map!.getCenter();
    });
  }

  ngOnDestroy(): void {
    // Clean up all listeners
    this.map?.remove();
  }

  zoomIn() {
    this.map?.zoomIn();
  }

  zoomOut() {
    this.map?.zoomOut();
  }

  setZoom(value : string) {
    this.map?.zoomTo(Number(value));
  }
}
