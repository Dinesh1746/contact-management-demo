import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { contact } from '../contactModel';

@Component({
  selector: 'app-update-contact',
  templateUrl: './update-contact.component.html',
  styleUrls: ['./update-contact.component.css']  // small fix here: styleUrls (plural)
})
export class UpdateContactComponent implements OnInit {
  public contactid!: number;
  public contactdata: contact = {} as contact;

  constructor(
    private api: ApiService,
    private activatedroute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedroute.params.subscribe((param: Params) => {
      this.contactid = param['id'];
      this.api.fetchcontact(this.contactid).subscribe({
        next: (data: contact) => {
          this.contactdata = data;
        },
        error: (err) => {
          console.error('Failed to fetch contact', err);
          alert('Failed to load contact details. Please try again later.');
        }
      });
    });
  }

  submit() {
    this.api.updatecontact(this.contactid, this.contactdata).subscribe({
      next: (res: contact) => {
        alert('Contact Updated Successfully !!!');
        this.router.navigate(['/contactlist']);
      },
      error: (err) => {
        console.error('Update failed', err);
        alert('Failed to update contact. Please try again later.');
      }
    });
  }
}
