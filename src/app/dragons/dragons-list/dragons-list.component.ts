import { Component, OnInit } from '@angular/core';
import { Dragon } from '../../_models/dragon';
import { DragonService } from '../../_services/dragon.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
	selector: 'app-dragons-list',
	templateUrl: './dragons-list.component.html',
	styleUrls: ['./dragons-list.component.scss']
})
export class DragonsListComponent implements OnInit {
	public dragons: Dragon[];
	public cols = [{ field: 'name', header: 'Name' }];

	constructor(
		private _router: Router,
		private _toastr: ToastrService,
		private _dragonService: DragonService
	) { }

	ngOnInit() {
		this.listDragons();
	}

	listDragons() {
		this._dragonService.getDragons().subscribe(data => {
			console.debug(data);
			this.dragons = data;
		});
	}

	details(dragon){
		this._router.navigate(['dragons/details', dragon.id]);
	}

	edit(dragon) {
		this._router.navigate(['dragons/edit', dragon.id]);
	}

	delete(dragon) {
		this._dragonService.deleteDragon(dragon).subscribe(
			response => {
				console.debug(response);
				this.listDragons();
				this._toastr.success('Parece que ' + response.name + ' não será mais um problema', 'O dragão foi morto!');
			},
			error => {
				this._toastr.error('Parece que este dragão está lutando para sobreviver!');
				console.debug(error);
			}
		);
	}
}
