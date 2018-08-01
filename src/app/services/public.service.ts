import { ContactModel } from './../models/binding-models/public-models/contact-model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { HotelProduct } from '../models/view-models/public-models/hotel-product';
import { LoginModel } from '../models/binding-models/public-models/login-model';

@Injectable()
export class PublicService {

	constructor(private httpClient: HttpClient) { }

	getHotelServices(): Observable<HotelProduct[]> {
		return this.httpClient.get<HotelProduct[]>('http://192.168.10.221:8080/api/getHotelServices');
	}

	sendMessage(model: ContactModel, captchaToken: string): Observable<void> {
		const httpParams = new HttpParams().append('g-recaptcha-response', captchaToken);
		return this.httpClient.post<void>('http://192.168.10.221:8080/api/sendEmail', model, { params: httpParams });
	}

	login(model: LoginModel): Observable<string> {
		return this.httpClient.post<string>('http://192.168.10.221:8080/api/login', model);
	}
}
