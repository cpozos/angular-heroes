import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { LngLat, Map, Marker } from 'mapbox-gl';
import { environments } from '../../../../environments/environments';
import { MarkerAndColor, MarkerStorage } from '../../interfaces/maps.interface';

@Component({
  selector: 'markers-page-component',
  templateUrl: './markers-page.component.html',
  styleUrl: './markers-page.component.css',
})
export class MarkersPageComponent implements AfterViewInit {

  @ViewChild('myDivMap')
  public myDivMap?: ElementRef;

  public markers: MarkerAndColor[] = [];

  map?: Map;
  public currentCenter: LngLat = new LngLat(-99.16, 19.32);

  ngAfterViewInit(): void {
    this.map = new Map({
      container:this.myDivMap?.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.currentCenter, // starting position [lng, lat]
      zoom: 10, // starting zoom
      accessToken: environments.mapbox_key
    });

    // const el = document.createElement('div');
    // el.className = 'marker';
    // const marker = new Marker(el).setLngLat(this.currentCenter).addTo(this.map);

    // const marker = new Marker()
    //   .setLngLat(this.currentCenter)
    //   .addTo(this.map);
    this.loadLocalStorage();
  }

  createMarker() {
    const color = '#xxxxxx'.replace(/x/g, y => (Math.random() * 16 | 0).toString(16));
    this.addMarker(this.currentCenter, color);
  }

  addMarker(lngLat : LngLat, color: string) {
    if (!this.map) return;

    const marker = new Marker({
      color: color,
      draggable: true,
    })
      .setLngLat(lngLat)
      .addTo(this.map);

    marker.on('dragend', () => this.saveLocalStorage());

    this.markers.push({ marker, color });
    this.saveLocalStorage();
  }

  deleteMarker(item : MarkerAndColor) {
    const index = this.markers.indexOf(item);
    item.marker.remove();
    this.markers.splice(index, 1);
  }

  flyTo(marker: Marker) {
    this.map?.flyTo({
      zoom: 14,
      center: marker.getLngLat()
    });
  }

  saveLocalStorage() : void {
    const storage: MarkerStorage[] = this.markers.map( ({ color, marker })=> {
      const lngLat = marker.getLngLat();
      return {
        color: color,
        lngLat: [ lngLat.lng, lngLat.lat ]
      }
    });

    localStorage.setItem('markers', JSON.stringify(storage));
  }

  loadLocalStorage() : void {
    const strValue = localStorage.getItem('markers') ?? '[]';
    const markers: MarkerStorage[] = JSON.parse(strValue);
    markers.forEach( ({ color, lngLat }) => this.addMarker(new LngLat(lngLat[0], lngLat[1]), color))
  }
}
