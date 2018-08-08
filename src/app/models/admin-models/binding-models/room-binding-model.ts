import { RoomBaseModel } from '../base-models/room-base-model';

// For AdminPanel - Settings - add new room tab
export class RoomBindingModel extends RoomBaseModel {
	extras: string[];
	price: number;
	type: number; // ENUM 0-standard room base price 15, 1-vip room base price 30 etc.
}
