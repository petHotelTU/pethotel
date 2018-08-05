import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription, Observable } from 'rxjs';

import { AdminService } from '../../../services/admin-services/admin.service';
import { HttpErrorResponse } from '../../../../../node_modules/@angular/common/http';
import { AccountViewModel } from '../../../models/view-models/admin-models/account-view-model';

@Component({
	selector: 'app-accounts',
	templateUrl: './accounts.component.html',
	styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit, OnDestroy {
	isDeleteDialogOpened: boolean;
	accountName: string;

	private accountId: number;
	private subscription: Subscription;
	constructor(private adminService: AdminService) {
		this.subscription = new Subscription();
		this.isDeleteDialogOpened = false;
	}

	ngOnInit(): void {
	}

	onActivationButtonClicked(accountId: number): void {
		this.subscription.add(this.adminService.activateAccount(accountId)
			.subscribe(() => {
				alert('Акаунта беше активиран');
			}, (erroResponse: HttpErrorResponse) => {
				console.log(erroResponse.message);
			}));
	}

	onDeleteButtonClicked(account: AccountViewModel) {
		this.accountId = account.id;
		this.accountName = account.name;

		this.isDeleteDialogOpened = true;
	}

	onDeleteSubmitted(): void {
		this.subscription.add(this.adminService.deleteAccount(this.accountId)
			.subscribe(() => { }
				, (errorResponse: HttpErrorResponse) => {
					console.log(errorResponse.message);
				}));
		this.isDeleteDialogOpened = false;
	}

	onDialogClosed(): void {
		this.isDeleteDialogOpened = false;
	}
	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

}
