import { LocalstorageService } from './services/localstorage.service';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '../../node_modules/@angular/forms';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RecaptchaModule } from 'ng-recaptcha';

import { AppRoutingModule } from './app-routing/app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { PDFExportModule } from '@progress/kendo-angular-pdf-export';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GMapModule } from 'primeng/gmap';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';

import { PublicService } from './services/public.service';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { RequirementsComponent } from './components/public-components/requirements/requirements.component';
import { ServicesComponent } from './components/public-components/services/services.component';
import { QuestionsComponent } from './components/public-components/questions/questions.component';
import { ContactsComponent } from './components/public-components/contacts/contacts.component';
import { LoginComponent } from './components/public-components/login/login.component';
import { DeclarationComponent } from './components/public-components/declaration/declaration.component';
import { ReservationComponent } from './components/public-components/reservation/reservation.component';
import { OverviewComponent } from './components/customer-components/overview/overview.component';
import { ReservationsComponent } from './components/admin-components/reservations/reservations.component';
import { ReferencesComponent } from './components/admin-components/references/references.component';


@NgModule({
	declarations: [
		AppComponent,
		HomeComponent,
		RequirementsComponent,
		ServicesComponent,
		QuestionsComponent,
		ContactsComponent,
		LoginComponent,
		DeclarationComponent,
		ReservationComponent,
		OverviewComponent,
		ReservationsComponent,
		ReferencesComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		HttpClientModule,
		ReactiveFormsModule,
		AppRoutingModule,
		RecaptchaModule.forRoot(),
		GMapModule,
		CalendarModule,
		NgbModule.forRoot(),
		PDFExportModule,
		BrowserAnimationsModule
	],
	providers: [
		PublicService,
		LocalstorageService
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
