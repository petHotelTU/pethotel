import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { BaseAuthorizedService } from '../base-services/base-authorized.service';
import { baseURL } from '../public.service';
import { Observable } from 'rxjs';
import { OverviewViewModel } from '../../models/customer-models/view-models/overview-view-model';
import { ReservationDateViewModel } from '../../models/customer-models/view-models/reservation-date-view-model';
import { ReservationDateBindingModel } from '../../models/customer-models/binding-models/reservation-date-binding-model';
import { FoodViewModel } from '../../models/customer-models/view-models/food-view-model';
import { DateFoodViewModel } from '../../models/customer-models/view-models/date-food-view-model';
import { DateFoodBindingModel } from '../../models/customer-models/binding-models/date-food-binding-model';
import { DateTrainingViewModel } from '../../models/customer-models/view-models/date-training-view-model';
import { DateTrainingBindingModel } from '../../models/customer-models/binding-models/date-training-binding-model';

@Injectable()
export class CustomerService extends BaseAuthorizedService {

	constructor(private httpClient: HttpClient) {
		super();
	}

	getReservationDetails(userName: string): Observable<OverviewViewModel> {
		let params = new HttpParams().set('username', userName);
		return this.httpClient.get<OverviewViewModel>(baseURL + 'api/customer/getReservationDetails', { headers: this.httpAuthorized , params: params });
	}

	getReservationDatesDetails(userName: string): Observable<ReservationDateViewModel[]> {
		let params = new HttpParams().set('username', userName);
		return this.httpClient.get<ReservationDateViewModel[]>(baseURL + 'api/customer/getReservationDatesDetails', { headers: this.httpAuthorized , params: params });
	}

	editReservationDates(model: ReservationDateBindingModel[], userName: string): Observable<void> {
		let params = new HttpParams().set('username', userName);
		return this.httpClient.post<void>(baseURL + 'api/customer/setReservationDatesDetails', model, { headers: this.httpAuthorized, params: params });
	}

	getFoodType(): Observable<FoodViewModel[]> {
		return this.httpClient.get<FoodViewModel[]>(baseURL + 'api/customer/getAllFoods', { headers: this.httpAuthorized });
	}

	getDailyFoodMenu(userName: string): Observable<DateFoodViewModel[]> {
		let params = new HttpParams().set('username', userName);
		return this.httpClient.get<DateFoodViewModel[]>(baseURL + 'api/customer/getDateFood', { headers: this.httpAuthorized, params: params });
	}

	setDateFood(model: DateFoodBindingModel[], userName: string): Observable<void> {
		let params = new HttpParams().set('username', userName);
		return this.httpClient.post<void>(baseURL + 'api/customer/setDateFood', model, { headers: this.httpAuthorized, params: params });
	}

	getDailyTraining(userName: string): Observable<DateTrainingViewModel[]> {
		let params = new HttpParams().set('username', userName);
		return this.httpClient.get<DateTrainingViewModel[]>(baseURL + 'api/customer/getDateTraining', { headers: this.httpAuthorized, params: params });
	}

	setDateTraining(model: DateTrainingBindingModel[], userName: string): Observable<void> {
		let params = new HttpParams().set('username', userName);
		return this.httpClient.post<void>(baseURL + 'api/customer/setDateTraining', model, { headers: this.httpAuthorized, params: params });
	}
}
