import { BaseAuthorizedService } from './base-services/base-authorized.service';
import { ContactBindingModel } from '../models/shared-models/binding-models/contact-binding-model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { HotelProductViewModel } from '../models/public-models/view-models/hotel-product-view-model';
import { LoginBindingModel } from '../models/public-models/binding-models/login-binding-model';
import { HotelProductSimpleViewModel } from '../models/public-models/view-models/hotel-product-simple-view-model';
import { ReservationFilterBindingModel } from '../models/public-models/binding-models/reservation-filter-binding-model';
import { FilteredReservationViewModel } from '../models/public-models/view-models/filtered-reservation-view-model';
import { ReservationBindingModel } from '../models/public-models/binding-models/reservation-binding-model';


export const baseURL = 'http://192.168.10.221:8080/';

@Injectable()
export class PublicService extends BaseAuthorizedService {

	constructor(private httpClient: HttpClient) {
		super();
	}

	getFilteredReservations(model: ReservationFilterBindingModel): Observable<FilteredReservationViewModel[]> {
		return this.httpClient.post<FilteredReservationViewModel[]>(baseURL + 'api/reservations/filter', model);
	}

	getHotelServices(): Observable<HotelProductViewModel[]> {
		return this.httpClient.get<HotelProductViewModel[]>(baseURL + 'api/hotel-services/getAll');
	}

	getHotelServicesOnly(): Observable<HotelProductViewModel[]> {
		return this.httpClient.get<HotelProductViewModel[]>(baseURL + 'api/hotel-services/services');
	}

	getHotelExtras(): Observable<HotelProductSimpleViewModel[]> {
		return this.httpClient.get<HotelProductSimpleViewModel[]>(baseURL + 'api/hotel-services/extras');
	}

	sendMessage(model: ContactBindingModel, captchaToken: string): Observable<void> {
		const httpParams = new HttpParams().append('g-recaptcha-response', captchaToken);
		return this.httpClient.post<void>(baseURL + 'api/sendEmail', model, { params: httpParams });
	}

	login(model: LoginBindingModel): Observable<string> {
		return this.httpClient.post<string>(baseURL + 'api/login', model);
	}

	doReservation(model: ReservationBindingModel, captchaToken: string): Observable<void> {
		const httpParams = new HttpParams().append('g-recaptcha-response', captchaToken);
		return this.httpClient.post<void>(baseURL + 'api/reservations/create', model, { params: httpParams });
	}
}
