import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { BaseAuthorizedService } from '../base-services/base-authorized.service';

import { ContactViewModel } from '../../models/shared-models/view-models/contact-view-model';

import { baseURL } from '../public.service';

import { AccountEditBindingModel } from '../../models/admin-models/binding-models/account-edit-binding-model';
import { ExtendedReservationBindingModel } from '../../models/admin-models/binding-models/extended-reservation-binding-model';
import { HotelProductBindingModel } from '../../models/admin-models/binding-models/hotel-product-binding-model';
import { EmployeeBindingModel } from '../../models/admin-models/binding-models/employee-binding-model';
import { PetBindingModel } from '../../models/admin-models/binding-models/pet-binding-model';

import { AccountViewModel } from '../../models/admin-models/view-models/account-view-model';
import { RoomViewModel } from '../../models/admin-models/view-models/room-view-model';
import { RoomExtendedViewModel } from '../../models/admin-models/view-models/room-extended-view-model';
import { RoomBindingModel } from '../../models/admin-models/binding-models/room-binding-model';
import { HotelProductViewModel } from '../../models/public-models/view-models/hotel-product-view-model';
import { ReservationViewModel } from '../../models/admin-models/view-models/reservation-view-model';
import { EmployeeViewModel } from '../../models/admin-models/view-models/employee-view-model';
import { PetViewModel } from '../../models/admin-models/view-models/pet-view-model';
import { ContactBindingModel } from '../../models/admin-models/binding-models/contact-binding-model';
import { AccountActivationBindingModel } from '../../models/admin-models/binding-models/account-activation-binding-model';

@Injectable()
export class AdminService extends BaseAuthorizedService {

	constructor(private httpClient: HttpClient) {
		super();
	}
	// Message modification methods
	getReceivedMesseges(): Observable<ContactViewModel[]> {
		return this.httpClient.get<ContactViewModel[]>(baseURL + 'api/admin/messages/getMessages', { headers: this.httpAuthorized });
	}

	sendAnswerMessage(model: ContactBindingModel): Observable<void> {
		return this.httpClient.post<void>(baseURL + 'api/admin/messages/answer', model , {headers: this.httpAuthorized});
	}

	// Accounts modification methods
	getAccounts(): Observable<AccountViewModel[]> {
		return this.httpClient.get<AccountViewModel[]>(baseURL + 'api/admin/accounts/getAll', { headers: this.httpAuthorized });
	}

	activateAccount(accountId: number, model: AccountActivationBindingModel): Observable<void> {
		return this.httpClient.post<void>(baseURL + 'api/admin/accounts/' + accountId + '/activate', model, { headers: this.httpAuthorized });
	}

	updateAccount(model: AccountEditBindingModel, accountId: number): Observable<void> {
		return this.httpClient.post<void>(baseURL + 'api/admin/accounts/' + accountId, model, { headers: this.httpAuthorized });
	}

	deleteAccount(accountId: number): Observable<void> {
		return this.httpClient.delete<void>(baseURL + 'api/admin/accounts/' + accountId + '/delete', { headers: this.httpAuthorized });
	}

	// HotelServices modification methods
	deleteHotelService(serviceId: number): Observable<void> {
		return this.httpClient.delete<void>(baseURL + 'api/hotel-services/' + serviceId + '/delete', { headers: this.httpAuthorized });
	}

	addHotelService(model: HotelProductBindingModel): Observable<void> {
		return this.httpClient.post<void>(baseURL + 'api/hotel-services/add', model, { headers: this.httpAuthorized });
	}

	editHotelService(serviceId: number, model: HotelProductBindingModel): Observable<void> {
		return this.httpClient.post<void>(baseURL + 'api/hotel-services/' + serviceId, model, { headers: this.httpAuthorized });
	}

	getHotelService(serviceId: number): Observable<HotelProductViewModel> {
		return this.httpClient.get<HotelProductViewModel>(baseURL + 'api/hotel-services/' + serviceId, { headers: this.httpAuthorized });
	}

	// Rooms modification methods
	getRooms(): Observable<RoomViewModel[]> {
		return this.httpClient.get<RoomViewModel[]>(baseURL + 'api/admin/rooms/getAll', { headers: this.httpAuthorized });
	}

	getRoomsDetailed(): Observable<RoomExtendedViewModel[]> {
		return this.httpClient.get<RoomExtendedViewModel[]>(baseURL + 'api/admin/rooms/getAllDetailed', { headers: this.httpAuthorized });
	}

	addRoom(model: RoomBindingModel): Observable<RoomBindingModel> {
		return this.httpClient.post<RoomBindingModel>(baseURL + 'api/admin/rooms/add', model, { headers: this.httpAuthorized });
	}

	editRoom(roomId: number, model: RoomBindingModel): Observable<RoomBindingModel> {
		return this.httpClient.post<RoomBindingModel>(baseURL + 'api/admin/rooms/' + roomId, model, { headers: this.httpAuthorized });
	}

	deleteRoom(roomId: number): Observable<void> {
		return this.httpClient.delete<void>(baseURL + 'api/admin/rooms/' + roomId + '/delete', { headers: this.httpAuthorized });
	}

	// Reservations modification methods
	getReservations(): Observable<ReservationViewModel[]> {
		return this.httpClient.get<ReservationViewModel[]>(baseURL + 'api/admin/reservations/getAll', { headers: this.httpAuthorized });
	}

	getReservationDetails(reservationId: number): Observable<PetViewModel> {
		return this.httpClient.get<PetViewModel>(baseURL + 'api/admin/reservations/' + reservationId, { headers: this.httpAuthorized });
	}

	editReservation(reservationId: number, model: ExtendedReservationBindingModel): Observable<void> {
		return this.httpClient.post<void>(baseURL + 'api/admin/reservations/' + reservationId, model, { headers: this.httpAuthorized });
	}

	addReservationDetails(reservationId: number, model: PetBindingModel): Observable<void> {
		return this.httpClient.post<void>(baseURL + 'api/admin/reservations/' + reservationId + '/pet', model, { headers: this.httpAuthorized});
	}

	// Employees modification methods
	getEmployees(): Observable<EmployeeViewModel[]> {
		return this.httpClient.get<EmployeeViewModel[]>(baseURL + 'api/admin/employees/getAll', { headers: this.httpAuthorized });
	}

	addEmployee(model: EmployeeBindingModel): Observable<void> {
		return this.httpClient.post<void>(baseURL + 'api/admin/employees/add', model, { headers: this.httpAuthorized });
	}

	deleteEmployee(employeeId: number): Observable<void> {
		return this.httpClient.delete<void>(baseURL + 'api/admin/employees/' + employeeId + '/delete', { headers: this.httpAuthorized });
	}
}
