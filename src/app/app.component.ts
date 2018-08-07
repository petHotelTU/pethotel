import { Component, OnInit } from '@angular/core';

import { LocalstorageService } from './services/localstorage.service';

import { TokenModel } from './models/shared-models/other/token/token-model';


@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
	title = 'app';
	isPublic: boolean;
	isAdmin: boolean;

	private token: string;
	constructor(private localStorageService: LocalstorageService) {
		this.isPublic = true;
		this.isAdmin = false;
	}

	ngOnInit(): void {
		this.token = this.localStorageService.token;
		if (this.token !== undefined && this.token !== '' && this.token !== null) {
			this.isPublic = false;
			let tokenModel: TokenModel = this.localStorageService.parseToken();
			if (tokenModel.authorities = 'ADMIN') {
				this.isAdmin = true;
			}
		}
	}
}
