import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DragonsComponent } from './dragons.component';
import { AuthGuard } from '../_services/auth-guard.service';
import { DragonsListComponent } from './dragons-list/dragons-list.component';
import { DragonManageComponent } from './dragon-manage/dragon-manage.component';
import { DragonDetailsComponent } from './dragon-details/dragon-details.component';

const routes: Routes = [
	{
		path: 'dragons',
		component: DragonsComponent,
		canActivate: [AuthGuard],
		children: [
			{
				path: '',
				component: DragonsListComponent
			},
			{
				path: 'create',
				component: DragonManageComponent,
				canActivate: [AuthGuard],
			},
			{
				path: 'edit/:id',
				component: DragonManageComponent,
				canActivate: [AuthGuard],
			},
			{
				path: 'details/:id',
				component: DragonDetailsComponent,
				canActivate: [AuthGuard],
			},

		]
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
	providers: [AuthGuard]
})
export class DragonsRoutingModule { }
