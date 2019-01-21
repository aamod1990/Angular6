import { Component, OnInit,Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<ForgotPasswordComponent>) { }
  // Define Variable
  data = {
    forgotEmail: ''
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  ok():void{
     this.dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed',result);
    });
  }
  ngOnInit() {
    console.log("Forgot Password Component");
  }
}
