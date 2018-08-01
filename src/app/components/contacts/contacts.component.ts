import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { } from '@types/googlemaps';

@Component({
	selector: 'app-contacts',
	templateUrl: './contacts.component.html',
	styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {
	options: any;
	overlays: any[];
	contactForm: FormGroup;
	constructor(private fb: FormBuilder) {
		this.contactForm = this.fb.group({
			email: ['',
			[
				Validators.required,
				Validators.pattern(/^[a-z0-9_]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$/ig)
			]
			],
			subject: ['',
			[
				Validators.required
			]],
			message: ['',
			[
				Validators.required
			]]
		});
	}

	ngOnInit() {
		this.options = {
			center: { lat: 43.2229, lng: 27.9368 },
			zoom: 12
		};
		this.overlays = [
			new google.maps.Marker({ position: { lat: 43.2229, lng: 27.9368 }, title: 'Kingdom Pets' }),
		];
	}

	resolved(captchaResponse: string) {
		console.log(`Resolved captcha with response ${captchaResponse}:`);
	}

	onSubmit(): void {

	}

}
