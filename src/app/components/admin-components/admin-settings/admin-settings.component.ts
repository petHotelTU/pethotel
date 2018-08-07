import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription, Observable } from 'rxjs';

import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

import { HotelProductViewModel } from '../../../models/public-models/view-models/hotel-product-view-model';
import { AdminService } from '../../../services/admin-services/admin.service';
import { PublicService } from '../../../services/public.service';
import { HttpErrorResponse } from '../../../../../node_modules/@angular/common/http';
import { HotelProductBindingModel } from '../../../models/admin-models/binding-models/hotel-product-binding-model';

@Component({
	selector: 'app-admin-settings',
	templateUrl: './admin-settings.component.html',
	styleUrls: ['./admin-settings.component.scss']
})
export class AdminSettingsComponent implements OnInit, OnDestroy {
	faInfo = faInfoCircle;
	isDeleteDialogOpened: boolean;
	isAddProductDialogOpened: boolean;

	newHotelService: HotelProductBindingModel;
	selectedService: HotelProductViewModel;
	hotelServices: Observable<HotelProductViewModel[]>;

	private subscription: Subscription;
	constructor(private adminService: AdminService, private publicService: PublicService) {
		this.isDeleteDialogOpened = false;
		this.isAddProductDialogOpened = false;

		this.newHotelService = new HotelProductBindingModel();
		this.selectedService = new HotelProductViewModel();
		this.subscription = new Subscription();
	}

	ngOnInit(): void {
		this.getAllHotelServices();
	}

	onAddServiceButtonClicked(): void {
		this.isAddProductDialogOpened = true;
	}

	onAddDialogSubmitted(): void {
		console.log(this.newHotelService);
		this.subscription.add(this.adminService.addHotelService(this.newHotelService).subscribe(() => {
			this.getAllHotelServices();
			alert('Записът беше успешно добавен!');
		}, (errorResponse: HttpErrorResponse) => {
			if (errorResponse.status > 500) {
				alert('Възникна проблем със сървъра.Моля свържете се с администратор!');
			}
		}));

		this.isAddProductDialogOpened = false;
	}

	onDeleteServiceButtonClicked(service: HotelProductViewModel): void {
		this.isDeleteDialogOpened = true;
		this.selectedService = service;
	}

	onDialogClosed(): void {
		this.isDeleteDialogOpened = false;
		this.isAddProductDialogOpened = false;
	}

	onDeleteSubmitted(): void {
		this.subscription.add(this.adminService.deleteHotelService(this.selectedService.id).subscribe(() => {
			this.getAllHotelServices();
			alert('Операцията беше успешна');
		}, (errorResponse: HttpErrorResponse) => {
			if (errorResponse.status > 500) {
				alert('Възникна проблем със сървъра.Моля свържете се с администратор!');
			}
		}));
		this.isDeleteDialogOpened = false;
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

	private getAllHotelServices(): void {
		this.hotelServices = this.publicService.getHotelServices().pipe();
	}

}
