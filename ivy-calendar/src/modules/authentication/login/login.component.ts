import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthenticationService } from 'src/services/authentication/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    error = '';

  constructor(        
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService) 
    {
      // redirect to home if already logged in
      if (this.authenticationService.currentUserValue) 
      { 
        this.router.navigate(['/']);
      }
    }

  ngOnInit() {

    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required,Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });

 

  }
  


     // convenience getter for easy access to form fields
     get form() { return this.loginForm.controls; }

     onSubmit() {
      
         this.submitted = true;
 
         // stop here if form is invalid
         if (this.loginForm.invalid) {
             return;
         }
 
         this.loading = true;
         this.authenticationService.login(this.form.email.value, this.form.password.value)
             .pipe(first())
             .subscribe(
                 data => {
                      
                     this.router.navigate(['/dashboard']);
                 },
                 error => {
                     
                     this.error = error;
                     this.loading = false;
                 });
     }

}
