import { Injectable } from '@angular/core';
import { TokenModel } from '../models/token/token-model';
import { Router } from '@angular/router';

@Injectable()
export class LocalstorageService {
	private _token: string;

	constructor(private router: Router) {
		this._token = localStorage.getItem('access_token');
	}

	get token(): string {
		return this._token;
	}

	set token(token: string) {
		this._token = token;
	}

	parseToken(): TokenModel {
		const base64Url = this._token.split('.')[1];
		const base64 = base64Url.replace('-', '+').replace('_', '/');
		const tokenModel = JSON.parse(window.atob(base64));
		let token = new TokenModel();
		token.authorities = tokenModel.authorities;
		token.fullName = tokenModel.fullName;
		token.email = tokenModel.email;
		token.user_name = tokenModel.user_name;
		return token;
	}

	login(): void {
		localStorage.setItem('access_token', this._token);
	}

	logout(): void {
		localStorage.removeItem('access_token');
	}
}
