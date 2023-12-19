import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

import { FormsLayoutPageComponent } from "./pages/layout-page/layout-page.component";
import { FormsBasicPageComponent } from "./pages/basic-page/basic-page.component";
import { FormsDynamicPageComponent } from "./pages/dynamic-page/dynamic-page.component";
import { FormsRegisterPageComponent } from "./pages/register-page/register-page.component";
import { FormsSwitchesPageComponent } from "./pages/switches-page/switches-page.component";
import { FormsRoutingModule } from "./forms.routing.module";
import { RouterModule } from "@angular/router";
import { SideMenuComponent } from "./components/side-menu/side-menu.component";

@NgModule({
  declarations: [
    SideMenuComponent,
    FormsLayoutPageComponent,
    FormsBasicPageComponent,
    FormsDynamicPageComponent,
    FormsRegisterPageComponent,
    FormsSwitchesPageComponent
  ],
  imports: [
    FormsRoutingModule,

    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ]
})
export class FormsModule { }
