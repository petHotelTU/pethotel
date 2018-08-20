import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

import { parseDate } from '@progress/kendo-angular-intl';

import { AdminService } from '../../../services/admin-services/admin.service';
import { ContactViewModel } from '../../../models/shared-models/view-models/contact-view-model';
import { ContactBindingModel } from '../../../models/admin-models/binding-models/contact-binding-model';

@Component({
	selector: 'app-messege-box',
	templateUrl: './messege-box.component.html',
	styleUrls: ['./messege-box.component.scss']
})
export class MessegeBoxComponent implements OnInit, OnDestroy {
	isDialogOpened: boolean;
	receivedMessage: ContactViewModel;

	messages: Observable<ContactViewModel[]>;
	answerMessage: ContactBindingModel;

	private subscription: Subscription;
	constructor(private adminService: AdminService) {
		this.isDialogOpened = false;
		this.answerMessage = new ContactBindingModel();
		this.receivedMessage = new ContactViewModel();
	}

	ngOnInit(): void {
		this.messages = this.adminService.getReceivedMesseges()
		.pipe(tap( (data: ContactViewModel[]) => {
			data.forEach((msg) => {
				msg.dateReceived = parseDate(msg.dateReceived);
			});
		}));
	}

	onMessageClicked(message: ContactViewModel): void {
		this.receivedMessage = message;
		this.answerMessage.messageId = message.id;
		this.isDialogOpened = true;
	}

	onSendButtonClicked(): void {
		if (this.answerMessage.message !== '') {
			this.subscription = this.adminService.sendAnswerMessage(this.answerMessage).subscribe();
			this.answerMessage = new ContactBindingModel();
			this.isDialogOpened = false;
		} else {
			alert ('Не може да изпратите празно съобщение!');
		}
	}

	onDialogClosed(): void {
		this.isDialogOpened = false;
	}

	parseToLocaleDate(date: Date): string {
		return date.toLocaleDateString('bg-BG');
	}

	ngOnDestroy(): void {
		if (this.subscription !== null && this.subscription !== undefined ) {
			this.subscription.unsubscribe();
		}
	}

}
