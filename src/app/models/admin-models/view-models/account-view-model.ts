import { AccountBaseModel } from '../base-models/account-base-model';

export class AccountViewModel extends AccountBaseModel {
	id: number;
	reservationId: number;
	fullName: string;
	password: string;
	isActivated: boolean;
	isEnabled: boolean;
}
