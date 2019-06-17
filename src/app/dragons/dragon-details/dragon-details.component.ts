import { Component, OnInit } from '@angular/core';
import { Dragon } from '../../_models/dragon';
import { ActivatedRoute } from '@angular/router';
import { DragonService } from 'src/app/_services/dragon.service';
import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'app-dragon-details',
	templateUrl: './dragon-details.component.html',
	styleUrls: ['./dragon-details.component.scss']
})
export class DragonDetailsComponent implements OnInit {

	public dragon: Dragon;

	constructor(
		private _route: ActivatedRoute,
		private _dragonService: DragonService,
		private _toastr: ToastrService,
	) { }

	ngOnInit() {
		this.getDragon(this._route.snapshot.params['id']);
	}

	getDragon(id) {
		this._dragonService.getDragon(id).subscribe(
			response => {
				this.dragon = response;
			},
			error => {
				this._toastr.error('Algo deu errado na hora de capturar seu dragão.');
			}
		);
	}

}
