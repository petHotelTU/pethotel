import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
	images: Array<string>;
	constructor() {
		this.images = ['../../../assets/images/home_img_1.jpg', '../../../assets/images/home_img_2.jpg', '../../../assets/images/home_img_3.jpg', '../../../assets/images/home_img_4.jpg'];
	}

	ngOnInit() {
	}

}
