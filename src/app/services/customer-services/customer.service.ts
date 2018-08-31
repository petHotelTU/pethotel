import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BaseAuthorizedService } from '../base-services/base-authorized.service';
import { baseURL } from '../public.service';

@Injectable()
export class CustomerService extends BaseAuthorizedService {

	constructor(private httpClient: HttpClient) {
		super();
	}

	// Extras configurations
	// getReservationConfig(): Observable<> {
	// 	return this.httpClient.get<>(baseURL + 'api/customer/getCurrentConfiguration', { headers: this.httpAuthorized });
	// }

	// editConfig(model: any): Observable<> {
	// 	return this.httpClient.post<>(baseURL + 'api/customer/editConfiguration', model, { headers: this.httpAuthorized });
	// }

	// // Add new extra
	// getExtras(): Observable<> {
	// 	return this.httpClient.get<>(baseURL + 'api/customer/getExtras', { headers: this.httpAuthorized });
	// }

	// editExtras(model: any): Observable<void> {
	// 	return this.httpClient.post<void>(baseURL + 'api/customer/setExtras', model, { headers: this.httpAuthorized });
	// }

}
