import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { first } from 'rxjs/operators';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';

import { AlertService, AuthenticationService } from '../services';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  // Define Variables
  hide = true;
  loginForm: FormGroup;
  submitted = false;
  returnUrl: string;
  // Define Constructor
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    private authenticationService: AuthenticationService,
    private alertService: AlertService) { }
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.email
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(6),
        Validators.required,
        Validators.pattern('((?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{6,20})') //this is for the letters (both uppercase and lowercase) and numbers validation
      ])),
    });
    // Reset login status
    this.authenticationService.logout();
    // Get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }
  // submitt form
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    //alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.loginForm.value))
    // Call api for login the application
    this.authenticationService.login(this.loginForm.value.email, this.loginForm.value.password)
      .pipe(first())
      .subscribe(
      data => {
        this.loginForm.reset();
        this.router.navigate([this.returnUrl]);
      },
      error => {
        this.alertService.error(error);
      });
  }

  forgotPassword(): void {
    console.log("Called forgot password popup");
    const dialogRef = this.dialog.open(ForgotPasswordComponent, {
      height: '300px',
      width: '600px',
    });
  }
}
