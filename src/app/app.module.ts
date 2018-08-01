import { AdminModule } from './modules/admin/admin.module';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '../../node_modules/@angular/forms';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RecaptchaModule } from 'ng-recaptcha';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { RequirementsComponent } from './components/requirements/requirements.component';
import { ServicesComponent } from './components/services/services.component';
import { QuestionsComponent } from './components/questions/questions.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { LoginComponent } from './components/login/login.component';
import { PDFExportModule } from '@progress/kendo-angular-pdf-export';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DeclarationComponent } from './components/declaration/declaration.component';
import {GMapModule} from 'primeng/gmap';
import {CalendarModule} from 'primeng/calendar';
import { ReservationComponent } from './components/reservation/reservation.component';
import { PublicService } from './services/public.service';
import { CustomerModule } from './modules/customer/customer.module';


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
		ReservationComponent
	],
	imports: [
		BrowserModule,
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
		PublicService
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
