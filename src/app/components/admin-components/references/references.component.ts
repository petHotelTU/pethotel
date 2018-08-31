import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AdminService } from '../../../services/admin-services/admin.service';
import { RoomViewModel } from '../../../models/admin-models/view-models/room-view-model';
import { ReferenceBindingModel } from '../../../models/admin-models/binding-models/reference-binding-model';
import { ReferenceViewModel } from '../../../models/admin-models/view-models/reference-view-model';

@Component({
	selector: 'app-references',
	templateUrl: './references.component.html',
	styleUrls: ['./references.component.scss']
})
export class ReferencesComponent implements OnInit {
	referenceBindingModel: ReferenceBindingModel;

	rooms: Observable<RoomViewModel[]>;
	referenceResult: Observable<ReferenceViewModel[]>;

	constructor(private adminService: AdminService) {
		this.referenceBindingModel = new ReferenceBindingModel();
	}

	ngOnInit() {
		this.getRooms();
	}

	getRooms(): void {
		this.rooms = this.adminService.getRooms().pipe();
	}

	onPetChange(petNum: number): void {
		this.referenceBindingModel.petType = petNum;
	}

	onShowButtonClicked(): void {
		this.referenceResult = this.adminService.getReferenceResult(this.referenceBindingModel).pipe();
	}
}
