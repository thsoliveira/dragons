import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
	headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
	providedIn: 'root'
})
export class LoginService {

	constructor(private _http: HttpClient) {
	}

	login(user) {
		return this._http.post('http://localhost:3000/login', user, httpOptions);
	}
}
