import { Component, OnInit } from '@angular/core';
import { defineFont } from '@progress/kendo-drawing/pdf';

defineFont({
	'DejaVu Sans'             : '//kendo.cdn.telerik.com/2014.3.1314/styles/fonts/DejaVu/DejaVuSans.ttf',
	'DejaVu Sans|Bold'        : '//kendo.cdn.telerik.com/2014.3.1314/styles/fonts/DejaVu/DejaVuSans-Bold.ttf',
	'DejaVu Sans|Bold|Italic' : '//kendo.cdn.telerik.com/2014.3.1314/styles/fonts/DejaVu/DejaVuSans-Oblique.ttf',
	'DejaVu Sans|Italic'      : '//kendo.cdn.telerik.com/2014.3.1314/styles/fonts/DejaVu/DejaVuSans-Oblique.ttf'
});

@Component({
	selector: 'app-requirements',
	templateUrl: './requirements.component.html',
	styleUrls: ['./requirements.component.scss']
})
export class RequirementsComponent implements OnInit {
	currentJustify = 'start';

	constructor() { }

	ngOnInit() {
	}

}
