import { Component, OnInit } from '@angular/core';
import { Account } from 'src/models/account.model';
import { FormControl, FormGroupDirective, NgForm, FormGroup, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { AuthenticationService } from 'src/services/authentication/authentication.service';
import { first } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/models/user.model';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  user = new User;
  loading = false;
    submitted = false;
    returnUrl: string;
    error = '';

  registerForm: FormGroup;



  

  matcher = new MyErrorStateMatcher();

  constructor(private authenticationService: AuthenticationService,private route: ActivatedRoute,
    private router: Router,) { }

  ngOnInit() {
    this.registerForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required,Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  get form() { return this.registerForm.controls; }


  onRegisterSubmit(){
    debugger;

    this.submitted = true;

       // stop here if form is invalid
       if (this.registerForm.invalid) {
           return;
       }
    const user = {
      firstName: this.form.firstName.value,
      lastName: this.form.lastName.value,
      email: this.form.email.value,
      password: this.form.password.value
    }

    this.authenticationService.register(user)
    .pipe(first())
           .subscribe(
               data => {
                   this.router.navigate(['/authentication/login']);
               },
               error => {
                   this.error = error;
                   this.loading = false;
               });

  }

  

}
