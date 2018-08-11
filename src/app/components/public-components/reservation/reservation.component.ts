import { ReservationFilterBindingModel } from './../../../models/public-models/binding-models/reservation-filter-binding-model';
import { FilteredReservationViewModel } from './../../../models/public-models/view-models/filtered-reservation-view-model';
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
	roomsIds: number[] = [];

	filter: ReservationFilterBindingModel;

	filteredReservations: Observable<FilteredReservationViewModel[]>;
	extras: Observable<HotelProductSimpleViewModel[]>;
	public range = { start: null, end: null };

	constructor(private publicService: PublicService) {
		this.isSecondResStep = false;
		this.filter = new ReservationFilterBindingModel();
	}

	ngOnInit() {
		this.getExtras();
	}

	onFindButtonClicked(): void {
		console.log(this.range.start);
		console.log(this.range.end);
		this.filter.startDate = this.range.start;
		this.filter.endDate = this.range.end;
		this.filteredReservations = this.publicService.getFilteredReservations(this.filter).pipe();
	}

	resolved(captchaResponse: string) {
		console.log(`Resolved captcha with response ${captchaResponse}:`);
	}

	private getExtras(): void {
		this.extras = this.publicService.getHotelExtras().pipe();
	}

}
