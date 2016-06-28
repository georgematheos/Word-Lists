import { provideRouter, RouterConfig } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ListComponent } from './list/list.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from "./signup/signup.component";
import { UnrecognizedPathComponent } from './unrecognized-path/unrecognized-path.component';

export const routes: RouterConfig = [
    {path: '', redirectTo: '/login', terminal: true},
    {path: 'home/:username', component: HomeComponent},
    {path: 'list/:username/:title', component: ListComponent},
    {path: 'login', component: LoginComponent},
    {path: 'signup', component: SignupComponent},
    {path: '**', component: UnrecognizedPathComponent}
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];
