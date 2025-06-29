import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../api.service';
import { contact } from '../contactModel';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrl: './add-contact.component.css'
})
export class AddContactComponent implements OnInit {
  contactform:FormGroup | any;
  constructor(private formbuilder: FormBuilder,
    private router: Router,
    private api:ApiService,
    private notification: NotificationService
  ){}

  ngOnInit(): void {
    this.contactform = this.formbuilder.group({
      firstname:['',Validators.required],
      lastname:['',Validators.required],
      phonenumber:['',[Validators.required,Validators.pattern(/^[0-9]{10}$/)]],
      city:['',Validators.required],
      
    })
  }

  submitcontact(data: contact) {
    if (this.contactform.valid) {
      this.api.addcontact(data).subscribe({
        next: (res) => {
          this.contactform.reset();
          this.router.navigate(["/contactlist"]);
        },
        error: (err) => {
          if (err.status === 0) {
            // Server is down or unreachable 
            this.notification.showError("Cannot connect to the server, Please Connect Server.");
          } else if (err.status === 400) {
            this.notification.showError("Bad request. Please check the input.");
          } else if (err.status === 409) {
            this.notification.showWarning("User already exists.");
          } else {
            // Generic error
            this.notification.showError("An error occurred during Add Contact. Please try again.");
          }
          console.error("Add Contact error:", err);
        }
      });
    }
  }


}
