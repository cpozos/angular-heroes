import { Component } from '@angular/core';

interface MenuItem {
  title: string;
  route: string;
}

@Component({
  selector: 'shared-side-menu',
  templateUrl: './side-menu.component.html',
})
export class SideMenuComponent {
  public reactiveMenu: MenuItem[] = [
    { title: 'Basic', route: '/forms/basic' },
    { title: 'Dynamic', route: '/forms/dynamic' },
    { title: 'Switches', route: '/forms/switches' },
    { title: 'Selectors', route:'/forms/selectors' },
  ];

  public authMenu: MenuItem[] = [
    { title: 'Login', route: '/forms/login' },
  ];

}
