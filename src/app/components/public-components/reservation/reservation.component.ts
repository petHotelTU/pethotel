import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-reservation',
	templateUrl: './reservation.component.html',
	styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent implements OnInit {
	value: Date;
	isSecondResStep: boolean;
	constructor() {
		this.isSecondResStep = false;
	}

	ngOnInit() {
	}

	resolved(captchaResponse: string) {
		console.log(`Resolved captcha with response ${captchaResponse}:`);
	}

}
