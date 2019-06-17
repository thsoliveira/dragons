import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { TableModule } from 'primeng/table';
import { ToastrModule } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';

import { MatButtonModule, MatFormFieldModule, MatInputModule, MatCardModule, MatIconModule } from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DragonsComponent } from './dragons/dragons.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DragonsListComponent } from './dragons/dragons-list/dragons-list.component';

@NgModule({
	declarations: [
		AppComponent,
		LoginComponent,
		DragonsComponent,
		HeaderComponent,
		FooterComponent,
		DragonsListComponent,
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		AppRoutingModule,
		HttpClientModule,
		ReactiveFormsModule,
		ToastrModule.forRoot(),
		TableModule,
		MatButtonModule,
		MatFormFieldModule,
		MatInputModule,
		MatCardModule,
		MatIconModule,
	],
	providers: [CookieService],
	bootstrap: [AppComponent]
})
export class AppModule { }
