import { LoginModel } from './../../models/binding-models/public-models/login-model';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PublicService } from '../../services/public.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

	loginForm: FormGroup;
	constructor(private router: Router, private publicService: PublicService, private fb: FormBuilder) {
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

			});

		}
	}
}
