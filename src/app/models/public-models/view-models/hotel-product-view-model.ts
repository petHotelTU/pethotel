import { HotelProductBaseModel } from '../base-models/hotel-product-base-model';

export class HotelProductViewModel extends HotelProductBaseModel {
	id: number;
	description: string;
	price: number;
	type: number;
	time: number;
}
