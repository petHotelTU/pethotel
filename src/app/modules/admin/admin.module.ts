import { ReservationsComponent } from './components/reservations/reservations.component';
import { AdminRoutingModule } from './modules/admin-routing/admin-routing.module';
import { NgModule } from '@angular/core';
import { HomeComponent } from './components/home/home.component';

@NgModule({
	imports: [
		AdminRoutingModule
	],
	declarations: [
		HomeComponent,
		ReservationsComponent
	]
})
export class AdminModule { }
