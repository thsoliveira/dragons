import { Component, OnInit } from '@angular/core';
import { Dragon } from '../../_models/dragon';
import { DragonService } from '../../_services/dragon.service';

@Component({
	selector: 'app-dragons-list',
	templateUrl: './dragons-list.component.html',
	styleUrls: ['./dragons-list.component.scss']
})
export class DragonsListComponent implements OnInit {
	public dragons: Dragon[];
	public cols = [{ field: 'name', header: 'Name' }];

	constructor(private _dragonService: DragonService) { }

	ngOnInit() {
		this.listDragons();
	}

	listDragons() {
		this._dragonService.getDragons().subscribe(data => {
			console.debug(data);
			this.dragons = data;
		})
	}

	edit(dragon) {
		this._dragonService.updateDragon(dragon);
	}

	delete(dragon) {
		this._dragonService.deleteDragon(dragon.id);
	}
}
