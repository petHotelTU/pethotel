import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { BaseAuthorizedService } from '../base-services/base-authorized.service';

import { ContactViewModel } from '../../models/shared-models/view-models/contact-view-model';

import { baseURL } from '../public.service';
import { AccountViewModel } from '../../models/admin-models/view-models/account-view-model';
import { AccountEditBindingModel } from '../../models/admin-models/binding-models/account-edit-binding-model';
import { HotelProductBindingModel } from '../../models/admin-models/binding-models/hotel-product-binding-model';
import { RoomViewModel } from '../../models/admin-models/view-models/room-view-model';
import { RoomExtendedViewModel } from '../../models/admin-models/view-models/room-extended-view-model';
import { RoomBindingModel } from '../../models/admin-models/binding-models/room-binding-model';
import { HotelProductViewModel } from '../../models/public-models/view-models/hotel-product-view-model';
import { HotelProductSimpleViewModel } from '../../models/public-models/view-models/hotel-product-simple-view-model';

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

	editHotelService(serviceId: number, model: HotelProductBindingModel): Observable<void> {
		return this.httpClient.post<void>(baseURL + 'api/hotel-services/' + serviceId , model, {headers: this.httpAuthorized} );
	}

	getHotelService(serviceId: number): Observable<HotelProductViewModel> {
		return this.httpClient.get<HotelProductViewModel>(baseURL + 'api/hotel-services/' + serviceId, {headers: this.httpAuthorized});
	}

	// Rooms modification methods
	getRooms(): Observable<RoomViewModel[]> {
		return this.httpClient.get<RoomViewModel[]>(baseURL + 'api/admin/rooms/getAll', { headers: this.httpAuthorized});
	}

	getRoomsDetailed(): Observable<RoomExtendedViewModel[]> {
		return this.httpClient.get<RoomExtendedViewModel[]>(baseURL + 'api/admin/rooms/getAllDetailed', { headers: this.httpAuthorized});
	}

	addRoom(model: RoomBindingModel): Observable<RoomBindingModel> {
		return this.httpClient.post<RoomBindingModel>(baseURL + 'api/admin/rooms/add', model, { headers: this.httpAuthorized});
	}

	editRoom(roomId: number, model: RoomBindingModel): Observable<RoomBindingModel> {
		return this.httpClient.post<RoomBindingModel>(baseURL + 'api/admin/rooms/' + roomId, model, { headers: this.httpAuthorized});
	}

	deleteRoom(roomId: number): Observable<void> {
		return this.httpClient.delete<void>(baseURL + 'api/admin/rooms/' + roomId + '/delete', { headers: this.httpAuthorized});
	}
}
