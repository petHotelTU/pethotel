import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { BaseAuthorizedService } from '../base-services/base-authorized.service';

import { ContactViewModel } from '../../models/shared-models/view-models/contact-view-model';

import { baseURL } from '../public.service';
import { AccountViewModel } from '../../models/admin-models/view-models/account-view-model';
import { AccountEditBindingModel } from '../../models/admin-models/binding-models/account-edit-binding-model';
import { HotelProductBindingModel } from '../../models/admin-models/binding-models/hotel-product-binding-model';

@Injectable()
export class AdminService extends BaseAuthorizedService {

	constructor(private httpClient: HttpClient) {
		super();
	}
	// Message modification methods
	getReceivedMesseges(): Observable<ContactViewModel[]> {
		return this.httpClient.get<ContactViewModel[]>( baseURL + 'api/admin/getMessages', {headers: this.httpAuthorized});
	}

	// Accounts modification methods
	getAccounts(): Observable<AccountViewModel[]> {
		return this.httpClient.get<AccountViewModel[]>( baseURL + 'api/admin/accounts/getAll', {headers: this.httpAuthorized});
	}

	activateAccount(accountId: number): Observable<void> {
		return this.httpClient.post<void>( baseURL + 'api/admin/accounts/' + accountId + '/activate', null , {headers: this.httpAuthorized});
	}

	updateAccount(model: AccountEditBindingModel, accountId: number): Observable<void> {
		return this.httpClient.post<void>(baseURL + 'api/admin/accounts/' + accountId , model, {headers: this.httpAuthorized} );
	}

	deleteAccount(accountId: number): Observable<void> {
		return this.httpClient.delete<void>(baseURL + 'api/admin/accounts/' + accountId + '/delete', {headers: this.httpAuthorized} );
	}

	// HotelServices modification methods
	deleteHotelService(serviceId: number): Observable<void> {
		return this.httpClient.delete<void>(baseURL + 'api/hotel-services/' + serviceId + '/delete', {headers: this.httpAuthorized} );
	}

	addHotelService(model: HotelProductBindingModel): Observable<void> {
		return this.httpClient.post<void>(baseURL + 'api/hotel-services/add' , model, {headers: this.httpAuthorized} );
	}

}
