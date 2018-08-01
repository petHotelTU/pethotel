import { Injectable } from '@angular/core';
import { TokenModel } from '../models/token/token-model';

@Injectable()
export class LocalstorageService {
	private _token: string;

	constructor() { }

	get token(): string {
		return this._token;
	}

	set token(token: string) {
		this._token = token;
	}

	parseToken(): TokenModel {
		const base64Url = this._token.split('.')[1];
		const base64 = base64Url.replace('-', '+').replace('_', '/');
		console.log(JSON.parse(window.atob(base64)));
		const tokenModel: TokenModel = JSON.parse(window.atob(base64));
		return tokenModel;
	}

	login(): void {
		localStorage.setItem('access_token', this._token);
	}

	logout(): void {
		localStorage.removeItem('access_token');
	}
}
