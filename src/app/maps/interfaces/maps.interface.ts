import { Marker } from "mapbox-gl";

export interface MarkerAndColor {
  color: string;
  marker: Marker;
}

export interface MarkerStorage{
  color: string;
  lngLat: [number, number];
}
