import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { NabvarComponent } from './Components/Nabvar/nabvar/nabvar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NabvarComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontendTest';
 
}
