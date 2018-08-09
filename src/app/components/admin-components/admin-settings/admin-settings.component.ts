import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription, Observable } from 'rxjs';

import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

import { HotelProductViewModel } from '../../../models/public-models/view-models/hotel-product-view-model';
import { AdminService } from '../../../services/admin-services/admin.service';
import { PublicService } from '../../../services/public.service';
import { HttpErrorResponse } from '@angular/common/http';
import { HotelProductBindingModel } from '../../../models/admin-models/binding-models/hotel-product-binding-model';
import { RoomBindingModel } from '../../../models/admin-models/binding-models/room-binding-model';
import { RoomExtendedViewModel } from '../../../models/admin-models/view-models/room-extended-view-model';

@Component({
	selector: 'app-admin-settings',
	templateUrl: './admin-settings.component.html',
	styleUrls: ['./admin-settings.component.scss']
})
export class AdminSettingsComponent implements OnInit, OnDestroy {
	faInfo = faInfoCircle;

	// Hotel services variables
	isDeleteDialogOpened: boolean;
	isAddProductDialogOpened: boolean;
	isEditProduct: boolean;

	newHotelService: HotelProductBindingModel;
	selectedService: HotelProductViewModel;
	hotelServices: Observable<HotelProductViewModel[]>;

	// Rooms variables
	isAddRoomDialogOpened: boolean;
	isDeleteRoomDialogOpened: boolean;
	isEditRoom: boolean;

	newRoom: RoomBindingModel;
	selectedRoom: RoomExtendedViewModel;
	rooms: Observable<RoomExtendedViewModel[]>;

	private subscription: Subscription;
	constructor(private adminService: AdminService, private publicService: PublicService) {
		this.isDeleteDialogOpened = false;
		this.isAddProductDialogOpened = false;
		this.isEditProduct = false;

		this.newHotelService = new HotelProductBindingModel();
		this.selectedService = new HotelProductViewModel();

		this.isAddRoomDialogOpened = false;
		this.isDeleteRoomDialogOpened = false;
		this.isEditRoom = false;

		this.newRoom = new RoomBindingModel();
		this.selectedRoom = new RoomExtendedViewModel();

		this.subscription = new Subscription();
	}

	ngOnInit(): void {
		this.getAllHotelServices();

		this.getAllRooms();
	}

	// Service Methods
	onAddServiceButtonClicked(service: HotelProductViewModel | null): void {
		if (service !== null) {
			this.isEditProduct = true;
			this.selectedService = service;
			this.newHotelService.name = service.name;
			this.newHotelService.price = service.price;
			this.newHotelService.description = service.description;
			this.newHotelService.time = service.time;
			this.newHotelService.type = service.type;
		} else {
			this.selectedService = new HotelProductViewModel();
		}
		this.isAddProductDialogOpened = true;
	}

	onAddDialogSubmitted(): void {
		if (!this.isEditProduct) {
			this.subscription.add(this.adminService.addHotelService(this.newHotelService).subscribe(() => {
				this.getAllHotelServices();
				alert('Записът беше успешно добавен!');
			}, (errorResponse: HttpErrorResponse) => {
				if (errorResponse.status > 500) {
					alert('Възникна проблем със сървъра.Моля свържете се с администратор!');
				}
			}));
		} else {
			this.subscription.add(this.adminService.editHotelService(this.selectedService.id, this.newHotelService).subscribe(() => {
				this.getAllHotelServices();
				alert('Записът беше редактиран добавен!');
			}, (errorResponse: HttpErrorResponse) => {
				if (errorResponse.status > 500) {
					alert('Възникна проблем със сървъра.Моля свържете се с администратор!');
				}
			}));
		}
		this.isAddProductDialogOpened = false;
		this.newHotelService = new HotelProductBindingModel();
		this.isEditProduct = false;
	}

	onDeleteServiceButtonClicked(service: HotelProductViewModel): void {
		this.isDeleteDialogOpened = true;
		this.selectedService = service;
	}

	onDialogClosed(): void {
		this.isDeleteDialogOpened = false;
		this.isAddProductDialogOpened = false;
		this.isEditProduct = false;
		this.newHotelService = new HotelProductBindingModel();
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

	// Room Methods
	onRoomDialogClosed(): void {
		this.isDeleteRoomDialogOpened = false;
		this.isAddRoomDialogOpened = false;
		this.isEditRoom = false;
		this.newRoom = new RoomBindingModel();
	}


	onAddRoomButtonClicked(room: RoomExtendedViewModel | null): void {
		// TODO: Have to fix model binding
		if (room !== null) {
			this.isEditProduct = true;
			this.selectedRoom = room;
			this.newRoom.name = room.name;
			this.newRoom.price = room.price;
		} else {
			this.selectedRoom = new RoomExtendedViewModel();
		}
		this.isAddProductDialogOpened = true;
	}

	onAddRoomDialogSubmitted(): void {
		if (!this.isEditRoom) {
			this.subscription.add(this.adminService.addRoom(this.newRoom).subscribe(() => {
				this.getAllRooms();
				alert('Записът беше успешно добавен!');
			}, (errorResponse: HttpErrorResponse) => {
				if (errorResponse.status > 500) {
					alert('Възникна проблем със сървъра.Моля свържете се с администратор!');
				}
			}));
		} else {
			this.subscription.add(this.adminService.editRoom(this.selectedRoom.id, this.newRoom).subscribe(() => {
				this.getAllRooms();
				alert('Записът беше редактиран добавен!');
			}, (errorResponse: HttpErrorResponse) => {
				if (errorResponse.status > 500) {
					alert('Възникна проблем със сървъра.Моля свържете се с администратор!');
				}
			}));
		}
		this.isAddRoomDialogOpened = false;
		this.newRoom = new RoomBindingModel();
		this.isEditRoom = false;
	}

	onDeleteRoomButtonClicked(room: RoomExtendedViewModel): void {
		this.isDeleteRoomDialogOpened = true;
		this.selectedRoom = room;
	}

	onDeleteRoomSubmitted(): void {
		this.subscription.add(this.adminService.deleteRoom(this.selectedRoom.id).subscribe(() => {
			this.getAllRooms();
			alert('Операцията беше успешна!');
		}, (errorResponse: HttpErrorResponse) => {
			if (errorResponse.status > 500) {
				alert('Възникна проблем със сървъра. Моля свържете се с администратор!');
			}
		}));
		this.isDeleteRoomDialogOpened = false;
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

	private getAllHotelServices(): void {
		this.hotelServices = this.publicService.getHotelServices().pipe();
	}

	private getAllRooms(): void {
		this.rooms = this.adminService.getRoomsDetailed().pipe();
	}

}
