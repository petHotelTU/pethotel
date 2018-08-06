import { LocalstorageService } from '../../../services/localstorage.service';
import { LoginModel } from '../../../models/binding-models/public-models/login-model';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PublicService } from '../../../services/public.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

	loginForm: FormGroup;
	constructor(private localStorageService: LocalstorageService, private publicService: PublicService, private fb: FormBuilder) {
		this.loginForm = this.fb.group({
			username: ['',
			[
				Validators.required
			]
			],
			password: ['',
			[
				Validators.required
			]]
		});
	}

	ngOnInit() {
	}

	onSubmit(): void {
		if (this.loginForm.valid) {
			const loginModel: LoginModel = this.loginForm.value;
			this.publicService.login(loginModel).subscribe((token: string) => {
				this.localStorageService.token = token;
				this.localStorageService.login();
			}, (errorResponse: HttpErrorResponse) => {
				if (errorResponse.status === 200) {
					this.localStorageService.token = errorResponse.error.text;
					this.localStorageService.login();
				}
			});

		}
	}
}