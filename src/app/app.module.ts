import { LocalstorageService } from './services/localstorage.service';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
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
import { MessegeBoxComponent } from './components/admin-components/messege-box/messege-box.component';
import { AccountsComponent } from './components/admin-components/accounts/accounts.component';
import { AdminSettingsComponent } from './components/admin-components/admin-settings/admin-settings.component';
import { GridModule } from '@progress/kendo-angular-grid';
import { DialogsModule } from '@progress/kendo-angular-dialog';
import { AdminService } from './services/admin-services/admin.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DateInputsModule, DateRangeModule } from '@progress/kendo-angular-dateinputs';
import { ExtrasComponent } from './components/customer-components/extras/extras.component';
import { CustomerSettingsComponent } from './components/customer-components/customer-settings/customer-settings.component';





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
		ReferencesComponent,
		MessegeBoxComponent,
		AccountsComponent,
		AdminSettingsComponent,
		ExtrasComponent,
		CustomerSettingsComponent
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		GridModule,
		DialogsModule,
		FormsModule,
		HttpClientModule,
		ReactiveFormsModule,
		AppRoutingModule,
		RecaptchaModule.forRoot(),
		GMapModule,
		CalendarModule,
		NgbModule.forRoot(),
		PDFExportModule,
		FontAwesomeModule,
		DateInputsModule,
		DateRangeModule
	],
	providers: [
		PublicService,
		LocalstorageService,
		AdminService
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
