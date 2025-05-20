import { Routes } from '@angular/router';
import { LogginComponent } from './Components/loggin/loggin.component';
import { HomeComponent } from './Components/home/home.component';
import { authGuard } from './Services/guard.service';

export const routes: Routes = [

    { path: 'loggin', component: LogginComponent },
     { path: '', component: LogginComponent },
    
    { path: 'home', component: HomeComponent , canActivate: [authGuard] },
];
