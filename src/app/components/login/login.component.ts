import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

	loginForm: FormGroup;
	constructor(private fb: FormBuilder) {
		this.loginForm = this.fb.group({
			email: ['',
			[
				Validators.required,
				Validators.pattern(/^[a-z0-9_]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$/ig)
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

}
