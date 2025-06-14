import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { contact, login, signup } from './componets/contactModel';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
   //post
  addcontact(data:contact): Observable<contact> {
    return this.http.post<contact>("http://localhost:3000/contacts", data)
  }
   // get
  getcontact() {
    return this.http.get<contact[]>("http://localhost:3000/contacts")
  }

   // delete
  deletecontact(id:number) {
    return this.http.delete<contact>("http://localhost:3000/contacts/"+id)
  }

  //fecting the contacts for edit
  fetchcontact(id:number){
    return this.http.get<contact>("http://localhost:3000/contacts/"+id)
  }

  //update the contacts for edit
  updatecontact(id:number, data:contact){
    return this.http.put<contact>("http://localhost:3000/contacts/"+id, data)
  }

  addsignupdata(data: signup){
    return this.http.post<signup>("http://localhost:3000/signup", data)
  }

  getusersdata(data: login){
    return this.http.get<login[]>("http://localhost:3000/signup")
  }
}

