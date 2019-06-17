import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
import { LoginService } from '../_services/login.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
	public loginForm: FormGroup;

	constructor(
		private _router: Router,
		private _formBuilder: FormBuilder,
		private _loginService: LoginService,
		private _cookieService: CookieService,
		private _toastr: ToastrService) { }

	ngOnInit() {
		this.loginForm = this._formBuilder.group({
			username: ['', Validators.required],
			password: ['', Validators.required]
		});
	}

	onSubmit() {

		// stop here if form is invalid
		if (this.loginForm.invalid) {
			this._toastr.warning('Parece que tem algo errado com seu formulário');
			return;
		}

		this._loginService.login(this.loginForm.value)
			.subscribe(
				(response: {token: string}) => {
					this._cookieService.set('token', response.token);
					this._router.navigate(['/dragons']);
				},
				catchError => {
					// Eu não consegui descobrir pq tem um objeto de error dentro de um objeto de error
					this._toastr.error(catchError.error.error);
				});
	}

}
