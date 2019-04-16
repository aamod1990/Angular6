import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login';
import { ForgotPasswordComponent } from './forgot-password';
import { RegistrationComponent } from './registration';
import { HomeComponent } from './home';

const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'registration', component: RegistrationComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);

