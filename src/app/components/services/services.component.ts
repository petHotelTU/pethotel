import { PublicService } from './../../services/public.service';
import { Component, OnInit } from '@angular/core';
import { HotelProduct } from '../../models/view-models/public-models/hotel-product';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-services',
	templateUrl: './services.component.html',
	styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {
	hotelProducts: Observable<HotelProduct[]>;
	constructor(private publicService: PublicService) { }

	ngOnInit() {
		this.hotelProducts = this.publicService.getHotelServices().pipe();
	}

}
