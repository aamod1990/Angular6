import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatAutocompleteSelectedEvent, MatChipInputEvent, MatAutocomplete } from '@angular/material';
import { Observable } from 'rxjs';
import { map, startWith, first } from 'rxjs/operators';
import { AlertService, UserService } from '../services';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  skilsCtrl = new FormControl();
  filteredSkils: Observable<string[]>;
  Skils: string[] = [];
  allSkils: string[] = ['Node', 'Angular', 'HTML', 'React', 'CSS', 'JavaScript'];
  url: string;
  isProfile = false;
  isResume = false;
  isSkils = false;
  // Started form validation
  registrationForm: FormGroup;
  submitted = false;

  @ViewChild('skilInput') skilInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private alertService: AlertService
  ) {
    this.filteredSkils = this.skilsCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => fruit ? this._filter(fruit) : this.allSkils.slice()));
  }
  add(event: MatChipInputEvent): void {
    // Add fruit only when MatAutocomplete is not open
    // To make sure this does not conflict with OptionSelected Event
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;

      // Add our fruit
      if ((value || '').trim()) {
        this.Skils.push(value.trim());
      }

      // Reset the input value
      if (input) {
        input.value = '';
      }

      this.skilsCtrl.setValue(null);
    }
  }

  remove(skil: string): void {
    const index = this.Skils.indexOf(skil);

    if (index >= 0) {
      this.Skils.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.Skils.push(event.option.viewValue);
    this.skilInput.nativeElement.value = '';
    this.skilsCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allSkils.filter(fruit => fruit.toLowerCase().indexOf(filterValue) === 0);
  }
  get regEmails(): FormArray {
    return this.registrationForm.get('regEmails') as FormArray;
  }
  get regPhones(): FormArray {
    return this.registrationForm.get('regPhones') as FormArray;
  }
  ngOnInit() {
    console.log("Registration Component");
    this.registrationForm = this.formBuilder.group({
      name: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(3)
      ])),
      regEmails: new FormArray([
        new FormControl('', Validators.compose([
          Validators.required,
          Validators.email
        ])),
      ]),
      regPhones: new FormArray([
        new FormControl('', Validators.compose([
          Validators.required,
          Validators.pattern("^(([0-9]*)|(([0-9]*)\.([0-9]*)))$")
        ])),
      ]),
      company: new FormControl('', Validators.compose([
        Validators.required
      ])),
      formDate: new FormControl('', Validators.compose([
        Validators.required
      ])),
      toDate: new FormControl(''),
      dob: new FormControl('', Validators.compose([
        Validators.required
      ])),
      skils: new FormControl('', Validators.compose([
        Validators.required
      ])),
      profilImage: null,
      resume: null,
    });
  }
  get f() {
    return this.registrationForm.controls;
  }
  addEmailField() {
    this.regEmails.push(new FormControl());
  }
  deleteEmailField(index: number) {
    this.regEmails.removeAt(index);
  }
  addPhoneField() {
    this.regPhones.push(new FormControl());
  }
  deletePhoneField(index: number) {
    this.regPhones.removeAt(index);
  }
  //   onFileChange(event:any) {
  //   if (event.target.files && event.target.files[0]) {
  //     var reader = new FileReader();
  //     reader.onload = (event: ProgressEvent) => {
  //        this.url = (<FileReader>event.target).result;
  //        this.registrationForm.get('profilImage').setValue(this.url);
  //     }
  //     reader.readAsDataURL(event.target.files[0]);
  //   }
  // }
  //  onFileChange(event) {
  //     if (event.target.files.length > 0) {
  //       const file = event.target.files[0];
  //       this.registrationForm.get('profilImage').setValue(file);
  //     }
  //   }
  onFileChange(event, fieldName) {
    let reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      let result = fieldName == "profilImage" ? this.isProfile = false : this.isProfile;
      result = fieldName == "resume" ? this.isResume = false : this.isResume;
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.registrationForm.get(fieldName).setValue({
          filename: file.name,
          filetype: file.type,
          value: reader.result.split(',')[1]
        })
      };
    }
  }
  onSubmit() {
    this.submitted = true;
    this.isProfile = true
    this.isResume = true
    this.registrationForm.patchValue({ skils: this.Skils });
    this.registrationForm.get('profilImage').value ?  this.isProfile = false :  this.isProfile = true
    this.registrationForm.get('resume').value ?  this.isResume = false :  this.isResume = true
    this.registrationForm.get('skils').value.length > 0 ?  this.isSkils = false :  this.isSkils = true
    if (this.registrationForm.invalid) {
      return;
    }
    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registrationForm.getRawValue()))
    this.userService.register(this.registrationForm.value)
      .pipe(first())
      .subscribe(
      data => {
        this.alertService.success('Registration successful', true);
        this.router.navigate(['/login']);
      },
      error => {
        this.alertService.error(error);
      });
  }
}
