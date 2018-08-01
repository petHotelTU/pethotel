import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { } from '@types/googlemaps';
import { PublicService } from '../../services/public.service';
import { Subscription } from 'rxjs';
import { ContactModel } from '../../models/binding-models/public-models/contact-model';

@Component({
	selector: 'app-contacts',
	templateUrl: './contacts.component.html',
	styleUrls: ['./contacts.component.scss']
})

export class ContactsComponent implements OnInit, OnDestroy {
	options: any;
	overlays: any[];
	contactForm: FormGroup;
	private captchaToken: string;
	private contactSubscription: Subscription;
	constructor(private publicService: PublicService, private fb: FormBuilder) {
		this.contactSubscription = new Subscription();
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
		this.captchaToken = captchaResponse;
	}

	onSubmit(): void {
		if (this.contactForm.valid) {
			if (this.captchaToken !== '' && this.captchaToken !== undefined) {
				const contactModel: ContactModel = this.contactForm.value;
				this.contactSubscription.add(this.publicService.sendMessage(contactModel, this.captchaToken).subscribe());
			}
		} else {
			throw new Error('Формата не е попълнена коректно!');
		}
	}

	ngOnDestroy(): void {
		// prevent memory leaks
		this.contactSubscription.unsubscribe();
	}

}
