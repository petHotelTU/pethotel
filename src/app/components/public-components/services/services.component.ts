import { PublicService } from '../../../services/public.service';
import { Component, OnInit } from '@angular/core';
import { HotelProductViewModel } from '../../../models/public-models/view-models/hotel-product-view-model';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-services',
	templateUrl: './services.component.html',
	styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {
	hotelProducts: Observable<HotelProductViewModel[]>;
	constructor(private publicService: PublicService) { }

	ngOnInit() {
		this.hotelProducts = this.publicService.getHotelServices().pipe();
	}

}
