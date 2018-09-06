import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { OverviewViewModel } from '../../../models/customer-models/view-models/overview-view-model';
import { CustomerService } from '../../../services/customer-services/customer.service';
import { LocalstorageService } from '../../../services/localstorage.service';

@Component({
	selector: 'app-overview',
	templateUrl: './overview.component.html',
	styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
	overview: Observable<OverviewViewModel>;

	constructor(private customerService: CustomerService, private localStorageService: LocalstorageService) { }

	ngOnInit() {
		let userName = this.localStorageService.getUserName();
		if (userName !== '' && userName !== null && userName !== undefined) {
			this.overview = this.customerService.getReservationDetails(userName).pipe();
		}
		else {
			alert('problem');
		}
	}

}
