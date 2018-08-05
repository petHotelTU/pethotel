import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { RequirementsComponent } from '../components/public-components/requirements/requirements.component';
import { ServicesComponent } from '../components/public-components/services/services.component';
import { ReservationComponent } from '../components/public-components/reservation/reservation.component';
import { ContactsComponent } from '../components/public-components/contacts/contacts.component';
import { LoginComponent } from '../components/public-components/login/login.component';
import { ReservationsComponent } from '../components/admin-components/reservations/reservations.component';
import { OverviewComponent } from '../components/customer-components/overview/overview.component';
import { ReferencesComponent } from '../components/admin-components/references/references.component';
import { MessegeBoxComponent } from '../components/admin-components/messege-box/messege-box.component';
import { AdminSettingsComponent } from '../components/admin-components/admin-settings/admin-settings.component';
import { AccountsComponent } from '../components/admin-components/accounts/accounts.component';

const routes: Routes = [
	{ path: '', redirectTo: '/home', pathMatch: 'full' },
	{ path: 'home', component: HomeComponent },
	{ path: 'requirements', component: RequirementsComponent },
	{ path: 'services', component: ServicesComponent },
	{ path: 'reservation', component: ReservationComponent },
	{ path: 'contacts', component: ContactsComponent },
	{ path: 'login', component: LoginComponent },
	{ path: 'admin/reservations', component: ReservationsComponent},
	{ path: 'admin/references', component: ReferencesComponent},
	{ path: 'admin/settings', component: AdminSettingsComponent},
	{ path: 'admin/messeges', component: MessegeBoxComponent},
	{ path: 'admin/accounts', component: AccountsComponent},
	{ path: 'customer/overview', component: OverviewComponent }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
