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
import { EmployeeBindingModel } from '../../../models/admin-models/binding-models/employee-binding-model';
import { EmployeeViewModel } from '../../../models/admin-models/view-models/employee-view-model';

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

	// Employees variables
	isAddEmployeeDialogOpened: boolean;
	isDeleteEmployeeDialogOpened: boolean;

	newEmployee: EmployeeBindingModel;
	selectedEmployee: EmployeeViewModel;
	employees: Observable<EmployeeViewModel[]>;

	private subscription: Subscription;
	constructor(private adminService: AdminService, private publicService: PublicService) {
		// Hotel services initialize
		this.isDeleteDialogOpened = false;
		this.isAddProductDialogOpened = false;
		this.isEditProduct = false;

		this.newHotelService = new HotelProductBindingModel();
		this.selectedService = new HotelProductViewModel();

		// Room initialize
		this.isAddRoomDialogOpened = false;
		this.isDeleteRoomDialogOpened = false;
		this.isEditRoom = false;

		this.newRoom = new RoomBindingModel();
		this.selectedRoom = new RoomExtendedViewModel();

		// Employee initialize
		this.isAddEmployeeDialogOpened = false;
		this.isDeleteEmployeeDialogOpened = false;

		this.newEmployee = new EmployeeBindingModel();
		this.selectedEmployee = new EmployeeViewModel();

		this.subscription = new Subscription();
	}

	ngOnInit(): void {
		this.getAllHotelServices();

		this.getAllRooms();

		this.getAllEmployees();
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
		this.isAddRoomDialogOpened = true;
		if (room !== undefined && room !== null) {
			this.isEditProduct = true;
			this.selectedRoom = room;
			this.newRoom.name = room.name;
			this.newRoom.price = room.basePrice;
		} else {
			this.selectedRoom = new RoomExtendedViewModel();
		}
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
				} else {
					alert(errorResponse.message);
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

	// Employees Methods
	onAddEmployeeButtonClicked(): void {
		this.isAddEmployeeDialogOpened = true;
	}

	onAddEmployeeSubmitted(): void {
		this.subscription.add(this.adminService.addEmployee(this.newEmployee).subscribe(() => {
			this.getAllEmployees();
			alert('Записът беше успешно добавен!');
		}, (errorResponse: HttpErrorResponse) => {
			if (errorResponse.status > 500) {
				alert('Възникна проблем със сървъра.Моля свържете се с администратор!');
			}
		}));

		this.newEmployee = new EmployeeBindingModel();
		this.isAddEmployeeDialogOpened = false;
	}

	onDeleteEmployeeButtonClicked(employee: EmployeeViewModel): void {
		this.selectedEmployee = employee;
		this.isDeleteEmployeeDialogOpened = true;
	}

	onEmployeeDialogClosed(): void {
		this.isDeleteEmployeeDialogOpened = false;
		this.isAddEmployeeDialogOpened = false;

		this.newEmployee = new EmployeeBindingModel();
	}

	onDeleteEmployeeSubmitted(): void {
		this.subscription.add(this.adminService.deleteEmployee(this.selectedEmployee.id).subscribe(() => {
			this.getAllEmployees();
			alert('Операцията беше успешна');
		}, (errorResponse: HttpErrorResponse) => {
			if (errorResponse.status > 500) {
				alert('Възникна проблем със сървъра.Моля свържете се с администратор!');
			}
		}));
		this.isDeleteEmployeeDialogOpened = false;
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

	private getAllEmployees(): void {
		this.employees = this.adminService.getEmployees().pipe();
	}

}
