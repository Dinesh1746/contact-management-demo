import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { signup } from '../contactModel';
import { ApiService } from '../../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-signup',
  templateUrl: './login-signup.component.html',
  styleUrl: './login-signup.component.css'
})
export class LoginSignupComponent implements OnInit {
  public isShow = false;
  signupform!: FormGroup;
  loginform!: FormGroup;
  constructor(private formbuilder: FormBuilder, private http: HttpClient,
    private api:ApiService, private router: Router){

  }
  ngOnInit(): void {

    this.signupform = this.formbuilder.group({
      name: ['', Validators.required],
       email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/)]]
    });

    this.loginform = this.formbuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/)]]
    })
      
  }

  onsignupSubmit() {
    if (this.signupform.valid) {
      this.api.addsignupdata(this.signupform.value).subscribe({
        next: (res) => {
          alert("Sign up Successful !!!");
          this.signupform.reset();
          this.isShow = false;
        },
        error: (err) => {
          if (err.status === 0) {
            // Server is down or unreachable
            alert("Cannot connect to the server, Please Connect Server.");
          } else if (err.status === 400) {
            alert("Bad request. Please check the input.");
          } else if (err.status === 409) {
            alert("User already exists.");
          } else {
            // Generic error
            alert("An error occurred during signup. Please try again.");
          }
          console.error("Signup error:", err);
        }
      });
    }
  }


  onloginSubmit() {
    if (this.loginform.valid) {
      this.api.getusersdata(this.loginform.value).subscribe({
        next: (res: any[]) => {
          const user = res.find((a: any) => {
            return a.email === this.loginform.value.email &&
                  a.password === this.loginform.value.password;
          });

          if (user) {
            alert("Login successful !!!");
            this.loginform.reset();
            this.router.navigate(['/contactlist']);
          } else {
            alert("User Not Found !!!");
            this.loginform.reset();
          }
        },
        error: (err) => {
          if (err.status === 0) {
            alert("Cannot connect to the server, Please Connect Server.");
          } else if (err.status === 400) {
            alert("Bad request. Please check your input.");
          } else {
            alert("An error occurred during login. Please try again.");
          }
          console.error("Login error:", err);
        }
      });
    }
  }



  signup(){
    this.isShow = true;
  }
  login(){
    this.isShow = false;
  }
}
