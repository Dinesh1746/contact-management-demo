import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { contact } from '../contactModel';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-contactlist',
  templateUrl: './contactlist.component.html',
  styleUrl: './contactlist.component.css'
})
export class ContactlistComponent implements OnInit {
  data:any | contact[]
  searchtext:any;
  constructor(private api: ApiService, private notification: NotificationService) {

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
      this.notification.showSuccess("Contact Deleted Successful !!!");
      this.getcontacts();
    })
  }

  logout(){
    sessionStorage.removeItem("loginData");
  }

}
