import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CookieService } from 'ngx-cookie-service';
import { AuthGuard } from './auth-guard.service';

fdescribe('AuthGuard', () => {
	let service: AuthGuard;
	let cookieService: CookieService;
	let routerSpy;

	beforeEach(() => {

		TestBed.configureTestingModule({
			imports: [
				RouterTestingModule,
			],
			providers: [
				CookieService
			]
		});

		routerSpy = jasmine.createSpyObj('Router', ['navigate']);
		service = TestBed.get(AuthGuard);
		cookieService = TestBed.get(CookieService);
		cookieService.deleteAll();

	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('should return true when user is authenticated', () => {
		cookieService.set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiSm9obkRvZSIsInBhc3N3b3JkIjoiMTUxNjIzOTAyMiJ9.nldKjarqIty3eFv-pc7wT5dVMa-mJbWBbhGIWH-pXwc');
		expect(service.canActivate()).toBeTruthy();
	});

	it('should return false when is not authenticated', () => {
		expect(service.canActivate()).toBeFalsy();
	});

	it('should redirect page to login when user is not authenticated', () => {
		const authGuardService = new AuthGuard(routerSpy, cookieService);
		authGuardService.canActivate();
		expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
	});

});

