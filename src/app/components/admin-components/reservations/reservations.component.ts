import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { parseDate } from '@telerik/kendo-intl';

import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

import { AdminService } from '../../../services/admin-services/admin.service';

import { ReservationViewModel } from '../../../models/admin-models/view-models/reservation-view-model';
import { FormGroup, FormBuilder, Validators } from '../../../../../node_modules/@angular/forms';
import { PetBindingModel } from '../../../models/admin-models/binding-models/pet-binding-model';
import { EmployeeViewModel } from '../../../models/admin-models/view-models/employee-view-model';
import { PetViewModel } from '../../../models/admin-models/view-models/pet-view-model';

@Component({
	selector: 'app-reservations',
	templateUrl: './reservations.component.html',
	styleUrls: ['./reservations.component.scss']
})
export class ReservationsComponent implements OnInit, OnDestroy {
	isAddPetDialogOpened: boolean;
	isEditReservationDialogOpened: boolean;

	petFormGroup: FormGroup;
	editReservationFormGroup: FormGroup;
	employees: Observable<EmployeeViewModel[]>;
	reservations: Observable<ReservationViewModel[]>;

	private selectedReservation: ReservationViewModel;
	private pet: PetBindingModel;
	private subscription: Subscription;
	constructor(private adminService: AdminService, private formBuilder: FormBuilder) {
		this.isAddPetDialogOpened = false;
		this.isEditReservationDialogOpened = false;

		this.subscription = new Subscription();
		this.selectedReservation = new ReservationViewModel();
		this.pet = new PetBindingModel();
	}

	ngOnInit() {
		this.getReservations();

		this.employees = this.adminService.getEmployees().pipe();

		this.petFormGroup = this.generatePetFormGroup();
	}

	onAddDetailsClicked(reservation: ReservationViewModel): void {
		this.isAddPetDialogOpened = true;
		this.petFormGroup.get('userId').setValue(reservation.userId);
		this.selectedReservation = reservation;
	}

	onAddPetSubmitted(): void {
		if (this.petFormGroup.valid) {
			this.pet = this.petFormGroup.value;

			this.subscription.add(this.adminService.addReservationDetails(this.selectedReservation.id, this.pet).subscribe(() => {

			}, (errorResponse: HttpErrorResponse) => {
				if (errorResponse.status > 500) {
					alert('Възникна проблем със сървъра.Моля свържете се с администратор!');
				}
				else {
					alert(errorResponse.message);
				}
			}));

		this.petFormGroup = this.generatePetFormGroup();
		this.isAddPetDialogOpened = false;
		this.getReservations();
		}
		else {
			this.petFormGroup.updateValueAndValidity();
		}

	}

	onNameClicked(reservation: ReservationViewModel): void {
		this.isEditReservationDialogOpened = true;
		this.selectedReservation = reservation;

		this.subscription.add(this.adminService.getReservationDetails(reservation.id).subscribe((model: PetViewModel) => {
			this.editReservationFormGroup = this.generateReservationFormGroup(model);
			this.editReservationFormGroup.get('deposit').setValue(this.selectedReservation.deposit);
			this.editReservationFormGroup.get('status').setValue(this.selectedReservation.status);
		}, (errorResponse: HttpErrorResponse) => {
			if (errorResponse.status > 500) {
				alert('Възникна проблем със сървъра.Моля свържете се с администратор!');
			}
			else {
				alert(errorResponse.message);
			}
		}));
	}

	onEditSubmitted(): void {
		if (this.editReservationFormGroup.valid ) {
			console.log(this.editReservationFormGroup.value);

			this.subscription.add(this.adminService.editReservation(this.selectedReservation.id, this.editReservationFormGroup.value).subscribe(() => {

			}, (errorResponse: HttpErrorResponse) => {
				if (errorResponse.status > 500) {
					alert('Възникна проблем със сървъра.Моля свържете се с администратор!');
				}
				else {
					alert(errorResponse.message);
				}
			}));

			this.isEditReservationDialogOpened = false;
			this.getReservations();
		}
		else {
			this.petFormGroup.updateValueAndValidity();
		}
	}

	onDialogClosed(): void {
		this.isAddPetDialogOpened = false;
		this.isEditReservationDialogOpened = false;
	}

	parseToLocaleDate(date: Date): string {
		return date.toLocaleDateString('bg-BG');
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

	private getReservations(): void {
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

	private generatePetFormGroup(): FormGroup {
		let userIdFormControl = this.formBuilder.control(this.pet.userId);
		let nameFormControl = this.formBuilder.control('', [ Validators.required]);
		let typeFormControl = this.formBuilder.control('', [Validators.required]);
		let passportFormControl = this.formBuilder.control('', [Validators.required]);
		let breedFormControl = this.formBuilder.control('');
		let ageFormControl = this.formBuilder.control('');
		let employeeIdFormControl = this.formBuilder.control('', [Validators.required]);

		return this.formBuilder.group({
			userId: userIdFormControl,
			name: nameFormControl,
			type: typeFormControl,
			passport: passportFormControl,
			breed: breedFormControl,
			age: ageFormControl,
			employeeId: employeeIdFormControl
		});
	}

	private generateReservationFormGroup(model: PetViewModel): FormGroup {
		let depositFormControl = this.formBuilder.control({value: this.selectedReservation.deposit}, [Validators.required]);
		let statusFormControl = this.formBuilder.control({value: this.selectedReservation.status}, [Validators.required]);
		let userIdFormControl = this.formBuilder.control(model.userId);
		let nameFormControl = this.formBuilder.control(model.name, [ Validators.required]);
		let typeFormControl = this.formBuilder.control(model.type, [Validators.required]);
		let passportFormControl = this.formBuilder.control(model.passport, [Validators.required]);
		let breedFormControl = this.formBuilder.control(model.breed);
		let ageFormControl = this.formBuilder.control(model.age);
		let employeeIdFormControl = this.formBuilder.control(model.employeeId, [Validators.required]);

		return this.formBuilder.group({
			userId: userIdFormControl,
			name: nameFormControl,
			type: typeFormControl,
			passport: passportFormControl,
			breed: breedFormControl,
			age: ageFormControl,
			employeeId: employeeIdFormControl,
			deposit: depositFormControl,
			status: statusFormControl
		});
	}

}
