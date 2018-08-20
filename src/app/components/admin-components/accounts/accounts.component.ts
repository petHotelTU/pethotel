import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription, Observable } from 'rxjs';

import { AdminService } from '../../../services/admin-services/admin.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AccountViewModel } from '../../../models/admin-models/view-models/account-view-model';
import { AccountEditBindingModel } from '../../../models/admin-models/binding-models/account-edit-binding-model';
import { AccountActivationBindingModel } from '../../../models/admin-models/binding-models/account-activation-binding-model';

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
		this.selectedAccount = new AccountViewModel();
		this.subscription = new Subscription();
	}

	ngOnInit(): void {
		this.accounts = this.adminService.getAccounts().pipe();
	}

	onActivationButtonClicked(account: AccountViewModel): void {
		this.selectedAccount = account;
		console.log(this.selectedAccount);

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
		let activationModel = new AccountActivationBindingModel();
		activationModel.email = this.selectedAccount.email;
		activationModel.userName = this.selectedAccount.userName;
		activationModel.password = this.selectedAccount.password;

		this.subscription.add(this.adminService.activateAccount(this.selectedAccount.id, activationModel)
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

	generatePassword(): string {
		let password = '';
		let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

		for (let i = 0; i < 8; i++) {
			password += possible.charAt(Math.floor(Math.random() * possible.length));
		}

		return password;
	}

	onGenerateButtonClicked(): void {
		this.selectedAccount.password = this.generatePassword();
	}

}
