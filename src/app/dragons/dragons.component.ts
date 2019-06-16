import { Component, OnInit } from '@angular/core';
import { DragonService } from '../_services/dragon.service';
import { Dragon } from '../_models/dragon';

@Component({
	selector: 'app-dragons',
	templateUrl: './dragons.component.html',
	styleUrls: ['./dragons.component.scss']
})
export class DragonsComponent implements OnInit {

	constructor(private _dragonService: DragonService) { }

	ngOnInit() {
		
	}

}
