import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatAutocompleteSelectedEvent, MatChipInputEvent, MatAutocomplete } from '@angular/material';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
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
  // Started form validation
  registrationForm: FormGroup;
  submitted = false;

  @ViewChild('skilInput') skilInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor(private formBuilder: FormBuilder) {
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
      profilImage: new FormControl('', Validators.compose([
        Validators.required
      ])),
      resume: new FormControl('', Validators.compose([
        Validators.required
      ])),
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
  onSubmit() {
     this.submitted = true;
     this.registrationForm.patchValue({skils: this.Skils});
    if (this.registrationForm.invalid) {
            return;
    }
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registrationForm.getRawValue()))
  }

}
