import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from "@angular/forms";

// material module
import { MatInputModule, MatIconModule, MatNativeDateModule, MatAutocompleteModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatChipsModule } from '@angular/material/chips';
import { MatFileUploadModule } from 'angular-material-fileupload';
// helpers providers
import { ErrorInterceptor } from './helpers';
// providers
import { AuthGuard } from './guards';
// directives
import { AlertComponent} from './directives';
// service
import { AlertService, AuthenticationService, UserService } from './services';
// components
import { AppComponent } from './app.component';
import { LoginComponent } from './login';
import { ForgotPasswordComponent } from './forgot-password';
import { RegistrationComponent } from './registration';
import { HomeComponent } from './home';
// routing
import { routing } from './app.routing';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ForgotPasswordComponent,
    RegistrationComponent,
    HomeComponent,
    AlertComponent
  ],
  entryComponents: [
    ForgotPasswordComponent
  ],
  exports: [
    MatNativeDateModule
  ],
  imports: [
    BrowserModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDialogModule,
    MatButtonModule,
    MatDatepickerModule,
    MatChipsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    MatFileUploadModule,
    routing,
    HttpClientModule
  ],
  providers: [
    AuthGuard,
    AlertService,
    AuthenticationService,
    UserService,
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
