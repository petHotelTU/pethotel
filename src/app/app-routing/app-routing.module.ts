import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from '../components/home/home.component';
import { RequirementsComponent } from '../components/requirements/requirements.component';
import { ServicesComponent } from '../components/services/services.component';
import { ContactsComponent } from '../components/contacts/contacts.component';
import { LoginComponent } from '../components/login/login.component';
import { ReservationComponent } from '../components/reservation/reservation.component';

const routes: Routes = [
	{ path: '', redirectTo: '/home', pathMatch: 'full' },
	{ path: 'home', component: HomeComponent },
	{ path: 'requirements', component: RequirementsComponent },
	{ path: 'services', component: ServicesComponent },
	{ path: 'reservation', component: ReservationComponent },
	{ path: 'contacts', component: ContactsComponent },
	{ path: 'login', component: LoginComponent },
	{ path: 'admin', loadChildren: '../modules/admin/admin.module#AdminModule' },
	{ path: 'customer', loadChildren: '../modules/customer/customer.module#CustomerModule' }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
