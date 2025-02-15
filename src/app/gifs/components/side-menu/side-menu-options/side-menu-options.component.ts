import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GifService } from 'src/app/gifs/services/gifs.service';

interface MenuOption{
  icon: string
  label: string;
  route: string;
  subLabel: string;
}

@Component({
  selector: 'gifs-side-menu-options',
  imports: [RouterLink],
  templateUrl: './side-menu-options.component.html',
})
export class SideMenuOptionsComponent {

  //
  gifService = inject(GifService);

  menuOptions: MenuOption[] = [
    {
      icon: 'fa-solid fa-chart-line',
      label: 'Trending',
      subLabel: 'gifs populares',
      route: '/dashboard/trending'
    },
    {
      icon: 'fa-solid fa-magnifying-glass',
      label: 'Buscador',
      subLabel: 'buscar gifs',
      route: '/dashboard/search'
    },
  ];
 }
