import { OverviewComponent } from './../../components/overview/overview.component';
import { HomeComponent } from './../../components/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{ path: '', component: HomeComponent,
	children: [
		{ path: '', component: OverviewComponent}
	]
},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class CustomerRoutingModule { }
