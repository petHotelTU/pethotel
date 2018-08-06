import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { AdminService } from '../../../services/admin-services/admin.service';
import { ContactViewModel } from '../../../models/view-models/public-models/contact-view-model';

@Component({
	selector: 'app-messege-box',
	templateUrl: './messege-box.component.html',
	styleUrls: ['./messege-box.component.scss']
})
export class MessegeBoxComponent implements OnInit {
	messeges: Observable<ContactViewModel[]>;
	constructor(private adminService: AdminService) { }

	ngOnInit() {
		this.messeges = this.adminService.getReceivedMesseges().pipe();
	}

}
