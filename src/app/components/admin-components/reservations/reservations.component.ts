import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { parseDate } from '@telerik/kendo-intl';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { AdminService } from '../../../services/admin-services/admin.service';

import { ReservationViewModel } from '../../../models/admin-models/view-models/reservation-view-model';

@Component({
	selector: 'app-reservations',
	templateUrl: './reservations.component.html',
	styleUrls: ['./reservations.component.scss']
})
export class ReservationsComponent implements OnInit {
	isDialogOpened: boolean;

	reservations: Observable<ReservationViewModel[]>;
	constructor(private adminService: AdminService) {
		this.isDialogOpened = false;
	}

	ngOnInit() {
		this.reservations = this.adminService.getReservations()
		.pipe(tap((reservations: ReservationViewModel[]) => {
			reservations.forEach((reservation) => {
				if (typeof reservation.startDate === 'string') {
					reservation.startDate = parseDate(reservation.startDate);
				}

				if (typeof reservation.endDate === 'string') {
					reservation.endDate = parseDate(reservation.endDate);
				}
			});
		}, (errorResponse: HttpErrorResponse) => {
			if (errorResponse.status > 500) {
				alert('Възникна проблем със сървъра.Моля свържете се с администратор!');
			} else {
				alert(errorResponse.message);
			}
		}));
	}

	onAddDetailsClicked(): void {

	}

	onNameClicked(reservationId: number): void {

	}

	parseToLocaleDate(date: Date): string {
		return date.toLocaleDateString('bg-BG');
	}

}
