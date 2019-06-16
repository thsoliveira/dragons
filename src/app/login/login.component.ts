import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
	public loginForm: FormGroup;

	constructor(private _formBuilder: FormBuilder,) { }

	ngOnInit() {
		this.loginForm = this._formBuilder.group({
			username: ['', Validators.required],
			password: ['', Validators.required]
		});
	}

}
