import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/internal/Observable';
import { catchError, map, tap } from 'rxjs/operators';

import { Dragon } from '../_models/dragon';

const httpOptions = {
	headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
	providedIn: 'root'
})
export class DragonService {

	readonly apiUrl = 'http://5c4b2a47aa8ee500142b4887.mockapi.io/api/v1/dragon';

	constructor(private _http: HttpClient) { }

	getDragons(): Observable<Dragon[]> {
		return this._http.get<Dragon[]>(this.apiUrl)
			.pipe(
				tap(dragons => this.log(`fetched dragons`)),
				catchError(this.handleError('getDragons'))
			) as Observable<Dragon[]>;
	}

	getDragon(id: number | string): Observable<Dragon> {
		const url = `${this.apiUrl}/${id}`;
		return this._http.get<Dragon>(url)
			.pipe(
				tap(dragon => {
					const outcome = dragon ? `fetched` : `did not find`;
					this.log(`${outcome} dragon id=${id}`);
				}),
				catchError(this.handleError<Dragon>(`getDragon id=${id}`))
			);
	}

	addDragon(dragon: Dragon): Observable<Dragon> {
		return this._http.post<Dragon>(this.apiUrl, dragon, httpOptions).pipe(
			tap((dragon: Dragon) => this.log(`added dragon w/ id=${dragon.id}`)),
			catchError(this.handleError<Dragon>('addDragon'))
		);
	}

	deleteDragon(dragon: Dragon | number): Observable<Dragon> {
		const id = typeof dragon === 'number' ? dragon : dragon.id;
		const url = `${this.apiUrl}/${id}`;

		return this._http.delete<Dragon>(url, httpOptions).pipe(
			tap(_ => this.log(`deleted dragon id=${id}`)),
			catchError(this.handleError<Dragon>('deleteDragon'))
		);
	}

	updateDragon(dragon: Dragon): Observable<any> {
		return this._http.put(this.apiUrl, dragon, httpOptions).pipe(
			tap(_ => this.log(`updated dragon id=${dragon.id}`)),
			catchError(this.handleError<any>('updateDragon'))
		);
	}

	private handleError<T>(operation = 'operation') {
		return (error: HttpErrorResponse): Observable<T> => {

			const message = (error.error instanceof ErrorEvent) ?
				error.error.message :
				`server returned code ${error.status} with body "${error.error}"`;

			throw new Error(`${operation} failed: ${message}`);
		};

	}

	private log(message: string) {
		console.log('dragonService: ' + message);
	}
}
