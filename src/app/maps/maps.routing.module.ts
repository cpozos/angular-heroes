import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MapsLayoutComponent } from "./maps-layout.component";
import { FullScreenPageComponent } from "./pages/full-screen-page/full-screen-page.component";
import { HousesPageComponent } from "./pages/houses-page/houses-page.component";
import { MarkersPageComponent } from "./pages/markers-page/markers-page.component";
import { ZoomPageComponent } from "./pages/zoom-page/zoom-page.component";

const routes: Routes = [
  {
    path: '',
    component: MapsLayoutComponent,
    children: [
      { path: 'full', component: FullScreenPageComponent },
      { path: 'houses', component: HousesPageComponent },
      { path: 'markers', component: MarkersPageComponent },
      { path: 'zoom', component: ZoomPageComponent },
      { path: '**', redirectTo: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [ RouterModule ]
})
export class MapsRoutingModule { }
