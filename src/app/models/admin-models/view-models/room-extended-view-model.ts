import { RoomBaseModel } from '../base-models/room-base-model';

// For Rooms Grid AdminPanel - Settings
export class RoomExtendedViewModel extends RoomBaseModel {
	id: number;
	extras: string[];
	price: number; // depending on extras plus room base price
}
