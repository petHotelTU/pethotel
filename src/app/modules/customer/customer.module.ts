import { NgModule } from '@angular/core';
import { HomeComponent } from './components/home/home.component';
import { CustomerRoutingModule } from './modules/customer-routing/customer-routing.module';

@NgModule({
	imports: [
		CustomerRoutingModule
	],
	declarations: [HomeComponent]
})
export class CustomerModule { }
