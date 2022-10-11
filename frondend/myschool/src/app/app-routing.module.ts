import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsParentComponent } from './details-parent/details-parent.component';
import { FooterComponent } from './footer/footer.component';
import { GalleryComponent } from './gallery/gallery.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterStaffComponent } from './register-staff/register-staff.component';
import { RegisterComponent } from './register/register.component';
import { SchoolUpdatesComponent } from './school-updates/school-updates.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'header',
    component: HeaderComponent,
  },
  {
    path: 'footer',
    component: FooterComponent,
  },
  {
    path: 'registerStaff',
    component: RegisterStaffComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'school',
    component: SchoolUpdatesComponent,
  },

  { path: 'parentDetails', component: DetailsParentComponent },
  {
    path: 'gallery',
    component: GalleryComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
