import { Routes } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { PortalComponent } from './components/portal/portal.component';
import { FormuComponent } from './components/formu/formu.component';

export const routes: Routes = [
    { path: '', redirectTo: 'portal', pathMatch: 'full' },
    { path: 'navbar', component: NavbarComponent },
    { path: 'footer', component: FooterComponent },
    { path: 'portal', component: PortalComponent },
    { path: 'formu', component: FormuComponent },

];
