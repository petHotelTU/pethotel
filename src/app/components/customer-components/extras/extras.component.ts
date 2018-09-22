import { Component, OnInit } from '@angular/core';

import { Observable, Subscription } from 'rxjs';

import { CustomerService } from '../../../services/customer-services/customer.service';
import { LocalstorageService } from '../../../services/localstorage.service';

import { ReservationDateViewModel } from '../../../models/customer-models/view-models/reservation-date-view-model';
import { HttpErrorResponse } from '@angular/common/http';
import { ReservationDateBindingModel } from '../../../models/customer-models/binding-models/reservation-date-binding-model';
import { parseDate } from '@progress/kendo-angular-intl';

@Component({
	selector: 'app-extras',
	templateUrl: './extras.component.html',
	styleUrls: ['./extras.component.scss']
})
export class ExtrasComponent implements OnInit {
	dateDetails: ReservationDateViewModel[];

	private editDateDetails: ReservationDateBindingModel[];
	private subscription: Subscription;
	private userName: string;
	constructor(private customerService: CustomerService, private localStorageService: LocalstorageService) {
		this.dateDetails = [];
		this.editDateDetails = [];
		this.subscription = new Subscription();
	}

	ngOnInit() {
		this.userName = this.localStorageService.getUserName();
		if (this.userName !== '' && this.userName !== null && this.userName !== undefined) {
			this.subscription.add(this.customerService.getReservationDatesDetails(this.userName).subscribe((data: ReservationDateViewModel[]) => {
				data.forEach((date) => {
					if (typeof date.date === 'string') {
						date.date = parseDate(date.date);
						date.date = this.parseToLocaleDate(date.date);
				}});

				this.dateDetails = data;
			}, (httpErrorResponse: HttpErrorResponse) => {
				alert('Възникна проблем! Проверете конзолата за повече детайли и се свържете с администратор');
				console.log(httpErrorResponse.message);
			}));
		}
		else {
			alert('problem');
		}
	}

	onSaveButtonClicked(): void {
		this.editDateDetails = this.dateDetails;
		this.editDateDetails.forEach((date) => {
			if (typeof date.date === 'string') {
			date.date = new Date(date.date);
			date.date = date.date.toISOString();
			}
		});
		this.subscription.add(this.customerService.editReservationDates(this.editDateDetails, this.userName).subscribe(() => {
			alert('Операцията беше успешна!');
		},
		(httpErrorResponse: HttpErrorResponse) => {
			alert('Възникна проблем! Проверете конзолата за повече детайли и се свържете с администратор');
			console.log(httpErrorResponse.message);
		}));
	}

	parseToLocaleDate(date: Date| string): string {
		if ( typeof date === 'string') {
			date = new Date(date);
		}
		return date.toLocaleDateString('bg-BG');
	}

}
