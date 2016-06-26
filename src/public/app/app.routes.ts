import { provideRouter, RouterConfig } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { UnrecognizedPathComponent } from './unrecognized-path/unrecognized-path.component';


export const routes: RouterConfig = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: '*path', component: UnrecognizedPathComponent } // unrecognized url
]

export const APP_ROUTER_PROVIDERS = [
    provideRouter(routes)
]
