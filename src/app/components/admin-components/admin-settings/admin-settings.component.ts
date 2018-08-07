import { Component, OnInit } from '@angular/core';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
	selector: 'app-admin-settings',
	templateUrl: './admin-settings.component.html',
	styleUrls: ['./admin-settings.component.scss']
})
export class AdminSettingsComponent implements OnInit {
	faInfo = faInfoCircle;
	constructor() { }

	ngOnInit() {
	}

}
