import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CvComponent } from './components/cv/cv.component';
import { UserComponent } from './components/user/user.component';
import { UsersComponent } from './components/users/users.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { CvDetailsComponent } from './components/cv-details/cv-details.component';
import { CvListComponent } from './components/cv-list/cv-list.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { PlaceHolderComponent } from './components/place-holder/place-holder.component';
import { CreateUpdateCvComponent } from './components/create-update-cv/create-update-cv.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { FileDirPipe } from './pipes/file-dir.pipe';
import { UsersTableComponent } from './components/dashboard/members-table/members-table.component';
import { CvEditComponent } from './components/dashboard/cv-edit/cv-edit.component';
import { UserEditComponent } from './components/dashboard/user-edit/user-edit.component';
import { TablesViewComponent } from './components/dashboard/tables-view/tables-view.component';
import { CvsTableComponent } from './components/dashboard/cvs-table/cvs-table.component';

@NgModule({
  declarations: [
    AppComponent,
    CvComponent,
    UserComponent,
    UsersComponent,
    UserDetailsComponent,
    CvDetailsComponent,
    CvListComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    PlaceHolderComponent,
    CreateUpdateCvComponent,
    NotFoundComponent,
    FileDirPipe,
    UsersTableComponent,
    CvEditComponent,
    UserEditComponent,
    TablesViewComponent,
    CvsTableComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [

  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
