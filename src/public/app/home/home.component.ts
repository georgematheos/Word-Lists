import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'wl-home',
  templateUrl: 'home.component.html',
})
export class HomeComponent {
  get token(): string {
      return localStorage.getItem('auth_token');
  }
}
