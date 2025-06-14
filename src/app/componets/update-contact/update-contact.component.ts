import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { contact } from '../contactModel';

@Component({
  selector: 'app-update-contact',
  templateUrl: './update-contact.component.html',
  styleUrl: './update-contact.component.css'
})
export class UpdateContactComponent implements OnInit {
public contactid!:number;
public contactdata: contact = {} as contact;
constructor(private api: ApiService, private activatedroute:ActivatedRoute,
  private router: Router ){

}

  ngOnInit(): void {
      this.activatedroute.params.subscribe((param: Params) =>{
        this.contactid = param['id'];
      })
      this.api.fetchcontact(this.contactid).subscribe((data:contact)=>{
        this.contactdata = data;
        console.log(data);
      })
    }

    submit(){
      this.api.updatecontact(this.contactid, this.contactdata).subscribe((res:contact)=>{
        alert("Contact Updated Successful !!!");
        this.router.navigate(['/contactlist']);

      })
    }
  }
