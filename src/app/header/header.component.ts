import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

	constructor(private _router: Router, private _cookieService: CookieService) { }

	ngOnInit() {
	}

	logout() {
		this._cookieService.deleteAll();
		this._router.navigate(['/login']);
	}
}
