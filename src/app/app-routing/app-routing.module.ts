import { CvsResolveGuard } from './../guards/cvsResolve/cvs-resolve.guard';
import { UsersResolveGuard } from './../guards/usersResolve/users-resolve.guard';
import { HeadersInterceptor } from './../interceptors/headers.interceptor';
import { TablesViewComponent } from './../components/dashboard/tables-view/tables-view.component';
import { UserEditComponent } from './../components/dashboard/user-edit/user-edit.component';
import { CvEditComponent } from './../components/dashboard/cv-edit/cv-edit.component';
import { AccessPermissionGuard } from './../guards/access-permission/access-permission.guard';
import { DashboardComponent } from './../components/dashboard/dashboard.component';
import { NotFoundComponent } from './../components/not-found/not-found.component';
import { CreateUpdateCvComponent } from './../components/create-update-cv/create-update-cv.component';
import { AuthGuard } from './../guards/auth/auth.guard';
import { CvListComponent } from './../components/cv-list/cv-list.component';
import { PlaceHolderComponent } from './../components/place-holder/place-holder.component';
import { CvDetailsComponent } from './../components/cv-details/cv-details.component';
import { RegisterComponent } from './../components/register/register.component';
import { HomeComponent } from './../components/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

const appRoute: Routes = [
  { path: 'home', component: HomeComponent },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'administration',
    component: DashboardComponent,
    canActivate: [AccessPermissionGuard],
    canMatch: [AccessPermissionGuard],
    canActivateChild: [AccessPermissionGuard],
    canLoad: [AccessPermissionGuard],
    children: [
      { path: 'cvs', component: TablesViewComponent },
      {
        path: 'users',
        component: TablesViewComponent,
        resolve: { users: UsersResolveGuard },
      },
      { path: 'admins', component: TablesViewComponent },
      { path: '', redirectTo: 'cvs', pathMatch: 'full' },
    ],
  },
  // { path: 'cvs/new', component: CreateUpdateCvComponent },
  {
    path: 'cvs',
    component: CvListComponent,
    // resolve: { 'cvs': CvsResolveGuard },
    canMatch: [AuthGuard],
    canActivate: [AuthGuard],
    children: [
      { path: 'new', component: CreateUpdateCvComponent },
      { path: 'edit/:id', component: CreateUpdateCvComponent },
      { path: ':id', component: CvDetailsComponent },
      { path: '', component: PlaceHolderComponent },
      { path: '**', redirectTo: '', pathMatch: 'full' },
    ],
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(appRoute)],
  exports: [RouterModule],
  providers: [
    AuthGuard,
    AccessPermissionGuard,
    UsersResolveGuard,
    CvsResolveGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeadersInterceptor,
      multi: true,
    },
  ],
})
export class AppRoutingModule {}
