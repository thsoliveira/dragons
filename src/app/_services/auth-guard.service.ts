import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
	providedIn: 'root'
})
export class AuthGuard implements CanActivate {


	constructor(
		private _router: Router,
		private _cookieService: CookieService,
	) { }

	canActivate() {

		if (this._cookieService.check('token')) {
			return true;
		}

		this._router.navigate(['/login']);

		return false;
	}
}
