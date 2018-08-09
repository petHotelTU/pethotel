import { RoomBaseModel } from '../base-models/room-base-model';
import { HotelProductSimpleViewModel } from '../../public-models/view-models/hotel-product-simple-view-model';

// For Rooms Grid AdminPanel - Settings
export class RoomExtendedViewModel extends RoomBaseModel {
	id: number;
	extras: HotelProductSimpleViewModel[];
	type: number; // 0-standard 1-VIP
	price: number; // depending on extras plus room base price
	basePrice: number; // if standard room = 15 if its VIP room = 20;
}
