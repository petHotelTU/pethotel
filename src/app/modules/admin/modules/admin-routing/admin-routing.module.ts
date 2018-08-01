import { HomeComponent } from './../../components/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReservationsComponent } from '../../components/reservations/reservations.component';

const routes: Routes = [
	{ path: '', component: HomeComponent,
	children: [
		{ path: '', pathMatch: 'full', component: ReservationsComponent}
	]
},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class AdminRoutingModule { }
