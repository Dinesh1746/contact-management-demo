import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactlistComponent } from './componets/contactlist/contactlist.component';
import { AddContactComponent } from './componets/add-contact/add-contact.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UpdateContactComponent } from './componets/update-contact/update-contact.component';
import { LoginSignupComponent } from './componets/login-signup/login-signup.component';


@NgModule({
  declarations: [
    AppComponent,
    ContactlistComponent,
    AddContactComponent,
    UpdateContactComponent,
    LoginSignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
