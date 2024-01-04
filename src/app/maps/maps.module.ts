import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { MapsSideMenuComponent } from "./components/side-menu/side-menu.component";
import { MiniMapComponent } from "./components/mini-map/mini-map.component";
import { FullScreenPageComponent } from "./pages/full-screen-page/full-screen-page.component";
import { HousesPageComponent } from "./pages/houses-page/houses-page.component";
import { MarkersPageComponent } from "./pages/markers-page/markers-page.component";
import { ZoomPageComponent } from "./pages/zoom-page/zoom-page.component";
import { MapsLayoutComponent } from "./maps-layout.component";
import { MapsRoutingModule } from "./maps.routing.module";

@NgModule({
  declarations: [
    // Layouts
    MapsLayoutComponent,

    // Pages
    FullScreenPageComponent,
    HousesPageComponent,
    MarkersPageComponent,
    ZoomPageComponent,

    // Components
    MapsSideMenuComponent,
    MiniMapComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MapsRoutingModule,
  ],
})
export class MapsModule { }
