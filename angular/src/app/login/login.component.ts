import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
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
  // Define Constructor
  constructor(private formBuilder: FormBuilder,public dialog: MatDialog) { }
  ngOnInit() {
    console.log("Login Component");
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
  }
  // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }
  // submitt form
  onSubmit(){
    this.submitted = true;
    // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }
        alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.loginForm.value))
  }
  forgotPassword(): void{
    console.log("Called forgot password popup");
     const dialogRef = this.dialog.open(ForgotPasswordComponent,{
      height: '300px',
      width: '600px',
    });
  }
}
