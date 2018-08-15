export abstract class ReservationBaseModel {
	name: string;
	startDate: Date | string;
	endDate: Date | string;
	deposit: boolean;
	status: number;
	roomName: string;
	isComplete: boolean; // if its true then this reservation can be edit else detail dialog is allowed
}
