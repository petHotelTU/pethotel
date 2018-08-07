import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { parseDate } from '@progress/kendo-angular-intl';

import { AdminService } from '../../../services/admin-services/admin.service';
import { ContactViewModel } from '../../../models/shared-models/view-models/contact-view-model';

@Component({
	selector: 'app-messege-box',
	templateUrl: './messege-box.component.html',
	styleUrls: ['./messege-box.component.scss']
})
export class MessegeBoxComponent implements OnInit {
	isDialogOpened: boolean;
	receivedMessage: ContactViewModel;

	messages: Observable<ContactViewModel[]>;

	constructor(private adminService: AdminService) {
		this.isDialogOpened = false;

		this.receivedMessage = new ContactViewModel();
	}

	ngOnInit() {
		this.messages = this.adminService.getReceivedMesseges()
		.pipe(tap( (data: ContactViewModel[]) => {
			data.forEach((msg) => {
				msg.dateReceived = parseDate(msg.dateReceived);
			});
		}));
	}

	onMessageClicked(message: ContactViewModel): void {
		this.receivedMessage = message;

		this.isDialogOpened = true;
	}

	onSendButtonClicked(): void {

		this.isDialogOpened = false;
	}

	onDialogClosed(): void {
		this.isDialogOpened = false;
	}

	parseToLocaleDate(date: Date): string {
		return date.toLocaleDateString('bg-BG');
	}

}
