import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription, Observable } from 'rxjs';

import { AdminService } from '../../../services/admin-services/admin.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AccountViewModel } from '../../../models/view-models/admin-models/account-view-model';
import { AccountEditBindingModel } from '../../../models/binding-models/admin-models/account-edit-binding-model';

@Component({
	selector: 'app-accounts',
	templateUrl: './accounts.component.html',
	styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit, OnDestroy {
	isDeleteDialogOpened: boolean;
	isActivateDialogOpened: boolean;
	isEditDialogOpened: boolean;

	accountEditBindingModel: AccountEditBindingModel;
	selectedAccount: AccountViewModel;
	accounts: Observable<AccountViewModel[]>;

	private subscription: Subscription;
	constructor(private adminService: AdminService) {
		this.isDeleteDialogOpened = false;
		this.isActivateDialogOpened = false;
		this.isEditDialogOpened = false;

		this.accountEditBindingModel = new AccountEditBindingModel();
		this.subscription = new Subscription();
	}

	ngOnInit(): void {
		this.accounts = this.adminService.getAccounts().pipe();
	}

	onActivationButtonClicked(account: AccountViewModel): void {
		this.selectedAccount = account;

		this.isActivateDialogOpened = true;
	}

	onEditButtonClicked(account: AccountViewModel): void {
		this.selectedAccount = account;

		this.isEditDialogOpened = true;
	}

	onDeleteButtonClicked(account: AccountViewModel) {
		this.selectedAccount = account;

		this.isDeleteDialogOpened = true;
	}

	onDeleteSubmitted(): void {
		this.subscription.add(this.adminService.deleteAccount(this.selectedAccount.id)
			.subscribe(() => { }
				, (errorResponse: HttpErrorResponse) => {
					console.log(errorResponse.message);
				}));

		this.isDeleteDialogOpened = false;
	}

	onActivationSubmitted(): void {
		this.subscription.add(this.adminService.activateAccount(this.selectedAccount.id)
			.subscribe(() => {
				alert('Акаунта беше активиран');
			}, (erroResponse: HttpErrorResponse) => {
				console.log(erroResponse.message);
			}));

		this.isActivateDialogOpened = false;
	}

	onEditSubmitted(): void {


		this.isEditDialogOpened = false;
	}

	onDialogClosed(): void {
		this.isDeleteDialogOpened = false;
		this.isEditDialogOpened = false;
		this.isActivateDialogOpened = false;
	}
	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

}
