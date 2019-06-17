import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DragonService } from 'src/app/_services/dragon.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Dragon } from '../../_models/dragon';

@Component({
	selector: 'app-dragon-manage',
	templateUrl: './dragon-manage.component.html',
	styleUrls: ['./dragon-manage.component.scss']
})
export class DragonManageComponent implements OnInit {

	public dragonForm: FormGroup;
	public newDragon: boolean;

	constructor(
		private _router: Router,
		private _formBuilder: FormBuilder,
		private _toastr: ToastrService,
		private _dragonService: DragonService,
		private _route: ActivatedRoute,
	) { }

	ngOnInit() {
		this.newDragon = true;

		this.dragonForm = this._formBuilder.group({
			name: ['', Validators.required],
			type: ['', Validators.required],
			createdAt: [{ value: '', disabled: true }]
		});

		this._route.paramMap.subscribe(
			pmap => {
				const id = pmap.get('id');
				if (id !== undefined && id !== null) {
					this.newDragon = false;
					this.getDragon(id);
				}
			});
	}

	getDragon(id) {
		this._dragonService.getDragon(id).subscribe(
			response => {
				// preenchendo dados do formulário
				this.dragonForm.setValue({
					name: response.name,
					type: response.type,
					createdAt: response.createdAt
				});

				console.debug(response);
			},
			error => {
				console.debug(error);
			}
		);
	}

	onSubmit() {

		// stop here if form is invalid
		if (this.dragonForm.invalid) {
			this._toastr.warning('Parece que tem algo errado com seu formulário');
			return;
		}

		const dragon: Dragon = {
			createdAt: new Date().toLocaleString(),
			name: this.dragonForm.get('name').value,
			type: this.dragonForm.get('type').value
		};

		if (this.newDragon) {
			this.addDragon(dragon);
		} else {
			this.updateDragon(dragon);
		}

	}

	addDragon(dragon) {
		this._dragonService.addDragon(dragon).subscribe(
			response => {
				this._toastr.success(response.name + ' foi adicionado ao acervo de dragões');
				this._router.navigate(['/dragons']);
			},
			error => {
				console.debug(error);
				this._toastr.error('Parece que ocorreu um problema ao registrar seu dragão');
			}
		);
	}

	updateDragon(dragon) {
		this._dragonService.updateDragon(dragon).subscribe(
			response => {
				this._toastr.success(response.name + ' está com os dados atualizado no acervo de dragões');
				this._router.navigate(['/dragons']);
			},
			error => {
				console.debug(error);
				this._toastr.error('Parece que ocorreu um problema ao atualizar seu dragão');
			}
		);
	}
}
