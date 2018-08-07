import { AccountBaseModel } from '../base-models/account-base-model';

export class AccountViewModel extends AccountBaseModel {
	id: number;
	reservationId: number;
	name: string;
	isActivated: boolean;
}