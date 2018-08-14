export class ReservationBindingModel {
	name: string;
	phoneNumber: string;
	email: string;
	roomId: number;
	extras: number[];
	startDate: Date | string;
	endDate: Date | string;
}
