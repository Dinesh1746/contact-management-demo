import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { contact } from '../contactModel';

@Component({
  selector: 'app-contactlist',
  templateUrl: './contactlist.component.html',
  styleUrl: './contactlist.component.css'
})
export class ContactlistComponent implements OnInit {
  data:any | contact[]
  constructor(private api: ApiService) {

  }
  ngOnInit(): void {
   this.getcontacts();
  }

  getcontacts(){
    this.api.getcontact().subscribe(res=>{
      this.data = res;
    })
  }

  deletecontacts(id:number){
    this.api.deletecontact(id).subscribe(res=>{
      alert("Contact Deleted Successful !!!");
      this.getcontacts();
    })
  }

}
