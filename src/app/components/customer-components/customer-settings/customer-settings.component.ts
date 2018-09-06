import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../../services/customer-services/customer.service';
import { FoodViewModel } from '../../../models/customer-models/view-models/food-view-model';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { DateFoodBindingModel } from '../../../models/customer-models/binding-models/date-food-binding-model';
import { DateFoodViewModel } from '../../../models/customer-models/view-models/date-food-view-model';
import { LocalstorageService } from '../../../services/localstorage.service';
import { DateTrainingViewModel } from '../../../models/customer-models/view-models/date-training-view-model';
import { DateTrainingBindingModel } from '../../../models/customer-models/binding-models/date-training-binding-model';

@Component({
	selector: 'app-customer-settings',
	templateUrl: './customer-settings.component.html',
	styleUrls: ['./customer-settings.component.scss']
})
export class CustomerSettingsComponent implements OnInit {
	foodTypes: FoodViewModel[];

	dateFoods: DateFoodViewModel[];
	dateMenu: DateFoodBindingModel[];

	dateTraining: DateTrainingViewModel[];
	dateChangedTraining: DateTrainingBindingModel[];

	private userName: string;
	private subscription: Subscription;
	constructor(private customerService: CustomerService, private localStorageService: LocalstorageService) {
		this.foodTypes = [];
		this.dateMenu = [];
		this.dateTraining = [];
		this.dateChangedTraining = [];
		this.subscription = new Subscription();
	}

	ngOnInit() {
		this.userName = this.localStorageService.getUserName();
		if (this.userName !== '' && this.userName !== null && this.userName !== undefined) {
			this.subscription.add(this.customerService.getDailyFoodMenu(this.userName).subscribe((dateMenu) => {
				this.dateFoods = dateMenu;
			},
				(httpErrorResponse: HttpErrorResponse) => {
					alert('Възникна проблем! Проверете конзолата за повече детайли и се свържете с администратор');
					console.log(httpErrorResponse.message);
				}));

				this.subscription.add(this.customerService.getDailyTraining(this.userName).subscribe((dateTraining) => {
					this.dateTraining = dateTraining;
				},
					(httpErrorResponse: HttpErrorResponse) => {
						alert('Възникна проблем! Проверете конзолата за повече детайли и се свържете с администратор');
						console.log(httpErrorResponse.message);
					}));
		}
		else {
			alert('problem');
		}
	}

	onSaveButtonClicked(): void {
		this.dateMenu = this.dateFoods;
		this.subscription.add(this.customerService.setDateFood(this.dateMenu, this.userName).subscribe(() => {
			alert('Операцията беше успешна!');
		},
		(httpErrorResponse: HttpErrorResponse) => {
			alert('Възникна проблем! Проверете конзолата за повече детайли и се свържете с администратор');
			console.log(httpErrorResponse.message);
		}));
	}

	onSaveTrainingButtonClicked(): void {
		this.dateChangedTraining = this.dateTraining;
		this.subscription.add(this.customerService.setDateTraining(this.dateChangedTraining, this.userName).subscribe(() => {
			alert('Операцията беше успешна!');
		},
		(httpErrorResponse: HttpErrorResponse) => {
			alert('Възникна проблем! Проверете конзолата за повече детайли и се свържете с администратор');
			console.log(httpErrorResponse.message);
		}));
	}

}
