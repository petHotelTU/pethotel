import { Component, OnInit } from '@angular/core';
import { PublicService } from '../../../services/public.service';
import { Observable } from 'rxjs';
import { HotelProductSimpleViewModel } from '../../../models/public-models/view-models/hotel-product-simple-view-model';

@Component({
	selector: 'app-reservation',
	templateUrl: './reservation.component.html',
	styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent implements OnInit {
	value: Date;
	isSecondResStep: boolean;
	extrasIds: number[] = [];

	extras: Observable<HotelProductSimpleViewModel[]>;
	public range = { start: null, end: null };
	constructor(private publicService: PublicService) {
		this.isSecondResStep = false;
	}

	ngOnInit() {
		this.getExtras();
	}

	onFindButtonClicked(): void {
		alert(this.extrasIds);
	}

	resolved(captchaResponse: string) {
		console.log(`Resolved captcha with response ${captchaResponse}:`);
	}

	private getExtras(): void {
		this.extras = this.publicService.getHotelExtras().pipe();
	}

}
