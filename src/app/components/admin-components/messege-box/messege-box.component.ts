import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { AdminService } from '../../../services/admin-services/admin.service';
import { ContactViewModel } from '../../../models/view-models/public-models/contact-view-model';

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
		this.messages = this.adminService.getReceivedMesseges().pipe();
	}

	onMessegeClicked(messege: ContactViewModel): void {
		this.receivedMessage = messege;

		this.isDialogOpened = true;
	}

	onSendButtonClicked(): void {

		this.isDialogOpened = false;
	}

	onDialogClosed(): void {
		this.isDialogOpened = false;
	}

}
