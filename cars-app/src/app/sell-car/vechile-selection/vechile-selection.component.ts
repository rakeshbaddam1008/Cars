import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-vechile-selection',
  templateUrl: './vechile-selection.component.html',
  styleUrls: ['./vechile-selection.component.css'],
})
export class VechileSelectionComponent {
  yearSelected: Number = 1990;
  disabled = false;
  max = 100;
  min = 0;
  showTicks = false;
  step = 1;
  thumbLabel = false;
  value = 0;
  // let fb:FormBuilder;
  // constructor(private formBuilder: FormBuilder) {
  //   const profileForm = this.fb.group({
  //     firstName: [''],
  //     lastName: [''],
  //     address: [''],
  //     dob: [''],
  //     gender: [''],
  //   });
  // }
}
