import { ContactBindingModel } from '../models/shared-models/binding-models/contact-binding-model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { HotelProductViewModel } from '../models/public-models/view-models/hotel-product-view-model';
import { LoginBindingModel } from '../models/public-models/binding-models/login-binding-model';
import { HotelProductSimpleViewModel } from '../models/public-models/view-models/hotel-product-simple-view-model';

export const baseURL = 'http://213.91.182.203:8080/';

@Injectable()
export class PublicService {

	constructor(private httpClient: HttpClient) { }

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
}
