import { Component } from '@angular/core';
import { environment } from '@environments/environment.development';

@Component({
  selector: 'gift-side-menu-header',
  imports: [],
  templateUrl: './side-menu-header.component.html',
})
export class SideMenuHeaderComponent {
  envs = environment;
 }
