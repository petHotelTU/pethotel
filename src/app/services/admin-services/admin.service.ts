import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { BaseAuthorizedService } from '../base-services/base-authorized.service';

import { ContactViewModel } from '../../models/view-models/public-models/contact-view-model';

import { baseURL } from '../public.service';
import { AccountViewModel } from '../../models/view-models/admin-models/account-view-model';

@Injectable()
export class AdminService extends BaseAuthorizedService {

	constructor(private httpClient: HttpClient) {
		super();
	}

	getReceivedMesseges(): Observable<ContactViewModel[]> {
		return this.httpClient.get<ContactViewModel[]>( baseURL + 'api/admin/getMesseges', {headers: this.httpAuthorized});
	}

	getAccounts(): Observable<AccountViewModel[]> {
		return this.httpClient.get<AccountViewModel[]>( baseURL + 'api/admin/accounts/getAll', {headers: this.httpAuthorized});
	}

	activateAccount(accountId: number): Observable<void> {
		return this.httpClient.post<void>( baseURL + 'api/admin/accounts/' + accountId + '/activate', null , {headers: this.httpAuthorized});
	}

	deleteAccount(accountId: number): Observable<void> {
		return this.httpClient.delete<void>(baseURL + 'api/admin/accounts/' + accountId + '/delete', {headers: this.httpAuthorized} );
	}
}
