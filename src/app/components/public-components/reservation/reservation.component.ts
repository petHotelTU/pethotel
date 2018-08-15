import { HttpErrorResponse } from '@angular/common/http';
import { ReservationFilterBindingModel } from '../../../models/public-models/binding-models/reservation-filter-binding-model';
import { FilteredReservationViewModel } from '../../../models/public-models/view-models/filtered-reservation-view-model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { SelectableSettings } from '@progress/kendo-angular-grid';
import { PublicService } from '../../../services/public.service';
import { Observable, Subscription } from 'rxjs';
import { HotelProductSimpleViewModel } from '../../../models/public-models/view-models/hotel-product-simple-view-model';
import { ReservationBindingModel } from '../../../models/public-models/binding-models/reservation-binding-model';
import { Router } from '@angular/router';

@Component({
	selector: 'app-reservation',
	templateUrl: './reservation.component.html',
	styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent implements OnInit, OnDestroy {
	value: Date;
	isSecondResStep: boolean;
	extrasIds: number[] = [];
	roomsIds: number[] = [];


	filter: ReservationFilterBindingModel;
	reservationBindingModel: ReservationBindingModel;

	filteredReservations: Observable<FilteredReservationViewModel[]>;
	extras: Observable<HotelProductSimpleViewModel[]>;
	public selectableSettings: SelectableSettings;
	public range = { start: null, end: null };

	private captchaToken: string;
	private subscription: Subscription;

	constructor(private publicService: PublicService, private router: Router) {
		this.isSecondResStep = false;
		this.filter = new ReservationFilterBindingModel();
		this.setSelectableSettings();
		this.reservationBindingModel = new ReservationBindingModel();
	}

	ngOnInit() {
		this.getExtras();
	}

	onSubmit(): void {
		this.reservationBindingModel.startDate = this.range.start;
		this.reservationBindingModel.endDate = this.range.end;
		this.reservationBindingModel.roomId = this.roomsIds[0];
		this.reservationBindingModel.extras = this.extrasIds;

		this.subscription = this.publicService.doReservation(this.reservationBindingModel, this.captchaToken).subscribe(() => {
				this.router.navigate(['']);
		}, (errorResponse: HttpErrorResponse) => {
			if (errorResponse.status > 500) {
				alert('Възникна проблем със сървъра.Моля свържете се с администратор!');
			} else {
				alert(errorResponse.message);
			}
		});
	}

	public setSelectableSettings(): void {
		this.selectableSettings = {
			checkboxOnly: false,
			mode: 'single'
		};
	}

	ngOnDestroy(): void {
		if (this.subscription !== null && this.subscription !== undefined) {
			this.subscription.unsubscribe();
		}
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
		this.captchaToken = captchaResponse;
	}

	private getExtras(): void {
		this.extras = this.publicService.getHotelExtras().pipe();
	}

}
