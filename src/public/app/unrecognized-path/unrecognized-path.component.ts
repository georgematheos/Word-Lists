import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'wl-unrecognized-path',
  templateUrl: 'unrecognized-path.component.html',
  styleUrls: ['unrecognized-path.component.css']
})
export class UnrecognizedPathComponent {
  constructor(private router: Router) {  }

}
