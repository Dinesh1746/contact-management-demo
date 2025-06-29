import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddContactComponent } from './componets/add-contact/add-contact.component';
import { ContactlistComponent } from './componets/contactlist/contactlist.component';
import { UpdateContactComponent } from './componets/update-contact/update-contact.component';
import { LoginSignupComponent } from './componets/login-signup/login-signup.component';
import { AuthGuard } from './shared/auth.guard';

const routes: Routes = [
  { path: 'contactlist', component: ContactlistComponent, canActivate:[AuthGuard] },
  { path: 'addcontact', component: AddContactComponent, canActivate:[AuthGuard] },
  { path: 'updatecontact/:id', component: UpdateContactComponent,canActivate:[AuthGuard] },
  { path: 'login-signup', component: LoginSignupComponent },
  { path: '', redirectTo: 'login-signup', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
