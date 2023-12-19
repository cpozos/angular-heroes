import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FormsBasicPageComponent } from "./pages/basic-page/basic-page.component";
import { FormsDynamicPageComponent } from "./pages/dynamic-page/dynamic-page.component";
import { FormsSwitchesPageComponent } from "./pages/switches-page/switches-page.component";
import { FormsRegisterPageComponent } from "./pages/register-page/register-page.component";
import { FormsLayoutPageComponent } from "./pages/layout-page/layout-page.component";

const routes: Routes = [
  {
    path: '',
    component: FormsLayoutPageComponent,
    children: [
      { path: 'login', component: FormsRegisterPageComponent },
      { path: 'basic', component: FormsBasicPageComponent },
      { path: 'dynamic', component: FormsDynamicPageComponent },
      { path: 'switches', component: FormsSwitchesPageComponent },
      { path: '**', redirectTo: 'login' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [ RouterModule ]
})
export class FormsRoutingModule { }
