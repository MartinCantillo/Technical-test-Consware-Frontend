import { Routes } from '@angular/router';
import { LogginComponent } from './Components/loggin/loggin.component';
import { HomeComponent } from './Components/home/home.component';

export const routes: Routes = [

    { path: 'loggin', component: LogginComponent },
    
    { path: 'home', component: HomeComponent },
];
