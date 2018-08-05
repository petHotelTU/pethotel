import { HttpHeaders } from '@angular/common/http';

export class BaseAuthorizedService {
	private _httpAuthorized: HttpHeaders;

	constructor() {
		let token = localStorage.getItem('access_token');
		this._httpAuthorized = new HttpHeaders().set('Authorization', 'bearer ' + token);
	}

	get httpAuthorized(): HttpHeaders {
		return this._httpAuthorized;
	}
}
