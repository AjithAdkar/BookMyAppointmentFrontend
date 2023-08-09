import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SpecializationRegistrationService } from '../specialization-registration/services/specialization-registration.service';
import { DoctorReistrationService } from '../doctor-registration/services/doctor-registration.service';

import { CoreService } from '../core/core.service';
import { SlotConfigurationService } from './services/slot-configuration.service';
import { SpecializationRegistration } from '../models/specialization-registration';
import { DoctorRegistration } from '../models/doctorregistration';

@Component({
  selector: 'app-slot-configuration',
  templateUrl: './slot-configuration.component.html',
  styleUrls: ['./slot-configuration.component.scss']
})
export class SlotConfigurationComponent implements OnInit {

  slotConfigurationForm: FormGroup;

  showDefaultTimeFormat: boolean = false;

  static readonly timePatternFor24hr = /^(?:[01]\d|2[0-3]):[0-5]\d$/;

  start24Time: string = '';
  end24Time: string = '';

  timeSlots: { start24Time: string, end24Time: string }[] = [];

  lunchTimeStart: string = '13:00';
  lunchTimeEnd: string = '14:00';

  // setSlotTime: number = 15;

  showSlots: boolean = false;

  specializationData: SpecializationRegistration[] = [];

  doctorData: DoctorRegistration[] = [];

  isFormSubmitted: boolean = false;


  constructor(
    private _fb: FormBuilder,
    private specializationRegistrationService: SpecializationRegistrationService,
    private doctorReistrationService: DoctorReistrationService,
    private coreService: CoreService,
    private slotConfigurationService: SlotConfigurationService,) {
    this.slotConfigurationForm = this._fb.group({
      doctorName: ['', Validators.required],
      doctorSpecialization: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      slotDate: ['', Validators.required],
      slotDetail: this._fb.array([
        this._fb.group({
          startTime: [''],
          endTime: [''],
          slotDuration: ['', Validators.required],
        })
      ]),
      remarks: '',
      doctorSlotCount: 0
    });
  }

  get slotDetailFormArray(): FormArray {
    return this.slotConfigurationForm.get('slotDetail') as FormArray;
  }


  ngOnInit(): void {
    this.specializationRegistrationService.getAllSpecialization().subscribe(getallspecialization => {
      this.specializationData = getallspecialization;
    });
    this.doctorReistrationService.fetchAllDoctors().subscribe(getalldoctor => {
      this.doctorData = getalldoctor;
    });
  }


  convertTimeTo24Hours(timeStr: string): string {
    const [time, meridiem] = timeStr.split(' ');
    const [hours, minutes] = time.split(':');

    let hours24 = Number(hours);

    if (meridiem.toLowerCase() === 'pm' && hours24 !== 12) {
      hours24 += 12;
    } else if (meridiem.toLowerCase() === 'am' && hours24 === 12) {
      hours24 = 0;
    }

    const hours24Str = hours24.toString().padStart(2, '0');
    const minutesStr = minutes.padStart(2, '0');

    return `${hours24Str}:${minutesStr}`;
  }


  onFormSubmit() {

    const slotDetailFormArray = this.slotConfigurationForm.get('slotDetail') as FormArray;

    //for single sliotDetails
    const slotDetailFormGroup = slotDetailFormArray.at(0) as FormGroup;
    const startTimeValue1 = slotDetailFormGroup.get('startTime')?.value;
    const endTimeValue1 = slotDetailFormGroup.get('endTime')?.value;
    const slotDurationValue1 = slotDetailFormGroup.get('slotDuration')?.value;


    // For 12 hour format  
    if (this.slotConfigurationForm.valid && !SlotConfigurationComponent.timePatternFor24hr.test(this.slotConfigurationForm.value.startTime)) {

      const startTimeValue = this.slotConfigurationForm.get('startTime')?.value;
      const endDTimeValue = this.slotConfigurationForm.get('endTime')?.value;

      const startTime24 = this.convertTimeTo24Hours(startTimeValue);
      const endTime24 = this.convertTimeTo24Hours(endDTimeValue);

      if (startTime24 == endTime24 && slotDurationValue1 <= 0) {
        this.slotConfigurationForm.get('endTime')?.setErrors({ 'startTimeandendTimeEqualError': true });
        this.slotConfigurationForm.get('startTime')?.setErrors({ 'startTimeandendTimeEqualError': true });
        this.slotConfigurationForm.get('slotDetail.0.slotDuration')?.setErrors({ 'durationError': true });
        return;// Stop form submission
      }

      if (startTime24 > endTime24 && slotDurationValue1 <= 0) {
        this.slotConfigurationForm.get('endTime')?.setErrors({ 'startTimeandendTimeEqualError': true });
        this.slotConfigurationForm.get('startTime')?.setErrors({ 'startTimeandendTimeEqualError': true });
        this.slotConfigurationForm.get('slotDetail.0.slotDuration')?.setErrors({ 'durationError': true });
        return;// Stop form submission
      }

      if (startTime24 > endTime24) {
        this.slotConfigurationForm.get('endTime')?.setErrors({ 'startTimeandendTimeError': true });
        this.slotConfigurationForm.get('startTime')?.setErrors({ 'startTimeandendTimeError': true });
        return;// Stop form submission
      }

      if (startTime24 == endTime24) {
        this.slotConfigurationForm.get('endTime')?.setErrors({ 'startTimeandendTimeEqualError': true });
        this.slotConfigurationForm.get('startTime')?.setErrors({ 'startTimeandendTimeEqualError': true });
        return;// Stop form submission

      }

      if (slotDurationValue1 <= 0) {
        this.slotConfigurationForm.get('slotDetail.0.slotDuration')?.setErrors({ 'durationError': true });
        return;// Stop form submission
      }

    }


    //if StartTime and EndTime 12 hours Format Convert 12 hours into 24 hour format
    if (this.slotConfigurationForm.valid && !SlotConfigurationComponent.timePatternFor24hr.test(this.slotConfigurationForm.value.startTime)) {

      const startTime = this.slotConfigurationForm.value.startTime;
      const endTime = this.slotConfigurationForm.value.endTime;

      const startTime24 = this.convertTimeTo24Hours(startTime);
      const endTime24 = this.convertTimeTo24Hours(endTime);

      // this.slotConfigurationForm.patchValue({
      //   startTime: startTime24,
      //   endTime: endTime24
      // });

      this.start24Time = startTime24;
      this.end24Time = endTime24;

      //To assign the Generated Slot Timing inside the array of slotDetail  and its all 'slotDuration' value assigned by slotDuration' value given by user
      const slotDetailArray = this.slotConfigurationForm.get('slotDetail') as FormArray;

      for (const slot of this.timeSlots) {
        const slotFormGroup = this._fb.group({
          startTime: [slot.start24Time],
          endTime: [slot.end24Time],
          slotDuration: slotDetailFormGroup.get('slotDuration')?.value,
        });
        slotDetailArray.push(slotFormGroup);
      }

      // To remove First Element Of slotDetail because its first element's has empty startTime and EndTime value and only it has duration value
      if (slotDetailArray.length > 1) {
        slotDetailArray.removeAt(0);
      }

      const slotConfiguration = this.slotConfigurationForm.value;
      console.log(slotConfiguration);


      // Saving Operation
      {
        this.slotConfigurationService.saveSlotConfiguration(this.slotConfigurationForm.value).subscribe({
          next: (val: any) => {
            this.coreService.openSnackBar('slotConfigurationForm added successfully');
            this.slotConfigurationForm.reset();
            Object.keys(this.slotConfigurationForm.controls).forEach((key) => {
              this.slotConfigurationForm.get(key)?.setErrors(null);
            });
            slotDetailFormArray.controls.forEach((control: AbstractControl) => {
              const controlGroup = control as FormGroup; // Cast to FormGroup type
              Object.keys(controlGroup.controls).forEach((key) => {
                controlGroup.get(key)?.setErrors(null);
              });
            });

            // Clear any extra controls from the slotDetailFormArray
            while (slotDetailFormArray.length > 1) {
              slotDetailFormArray.removeAt(0);
            }

            // Call the resetSlots method
            this.resetSlots();
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }

    }


    // For 24 hour format  
    if (this.slotConfigurationForm.valid && SlotConfigurationComponent.timePatternFor24hr.test(this.slotConfigurationForm.value.startTime)) {
      const startTimeValue = this.slotConfigurationForm.get('startTime')?.value;
      const endDTimeValue = this.slotConfigurationForm.get('endTime')?.value;

      if (startTimeValue == endDTimeValue && slotDurationValue1 <= 0) {
        this.slotConfigurationForm.get('endTime')?.setErrors({ 'startTimeandendTimeError': true });
        this.slotConfigurationForm.get('startTime')?.setErrors({ 'startTimeandendTimeError': true });
        this.slotConfigurationForm.get('slotDetail.0.slotDuration')?.setErrors({ 'durationError': true });
        return;
      } // Stop form submission

      if (startTimeValue > endDTimeValue && slotDurationValue1 <= 0) {
        this.slotConfigurationForm.get('endTime')?.setErrors({ 'startTimeandendTimeError': true });
        this.slotConfigurationForm.get('startTime')?.setErrors({ 'startTimeandendTimeError': true });
        this.slotConfigurationForm.get('slotDetail.0.slotDuration')?.setErrors({ 'durationError': true });
        return;
      }// Stop form submission

      if (startTimeValue == endDTimeValue) {
        this.slotConfigurationForm.get('endTime')?.setErrors({ 'startTimeandendTimeError': true });
        this.slotConfigurationForm.get('startTime')?.setErrors({ 'startTimeandendTimeError': true });
        return;
      } // Stop form submission

      if (startTimeValue > endDTimeValue) {
        this.slotConfigurationForm.get('endTime')?.setErrors({ 'startTimeandendTimeError': true });
        this.slotConfigurationForm.get('startTime')?.setErrors({ 'startTimeandendTimeError': true });
        return;
      } // Stop form submission

      if (slotDurationValue1 <= 0) {
        this.slotConfigurationForm.get('slotDetail.0.slotDuration')?.setErrors({ 'durationError': true });
        return;
      }// Stop form submission

    }


    // For 24 hour format  
    if (this.slotConfigurationForm.valid && SlotConfigurationComponent.timePatternFor24hr.test(this.slotConfigurationForm.value.startTime)) {

      //To assign the Generated Slot Timing inside the array of slotDetail  and its all 'slotDuration' value assigned by slotDuration' value given by user
      const slotDetailArray = this.slotConfigurationForm.get('slotDetail') as FormArray;

      for (const slot of this.timeSlots) {
        const slotFormGroup = this._fb.group({
          startTime: [slot.start24Time],
          endTime: [slot.end24Time],
          slotDuration: slotDetailFormGroup.get('slotDuration')?.value,
        });

        slotDetailArray.push(slotFormGroup);
      }

      // To remove First Element Of slotDetail because its first element's has empty startTime and EndTime value and only it has duration value
      if (slotDetailArray.length > 1) {
        slotDetailArray.removeAt(0);
      }

      const slotConfiguration = this.slotConfigurationForm.value;
      console.log(slotConfiguration);

      //// Saving Operation
      {
        this.slotConfigurationService.saveSlotConfiguration(this.slotConfigurationForm.value).subscribe({
          next: (val: any) => {
            this.coreService.openSnackBar('lotConfigurationForm added successfully');
            this.slotConfigurationForm.reset();
            Object.keys(this.slotConfigurationForm.controls).forEach((key) => {
              this.slotConfigurationForm.get(key)?.setErrors(null);
            });
            slotDetailFormArray.controls.forEach((control: AbstractControl) => {
              const controlGroup = control as FormGroup; // Cast to FormGroup type
              Object.keys(controlGroup.controls).forEach((key) => {
                controlGroup.get(key)?.setErrors(null);
              });
            });
            // Clear any extra controls from the slotDetailFormArray After Succussful saving
              console.log(slotDetailFormArray.length)
              while (slotDetailFormArray.length > 1) {
                slotDetailFormArray.removeAt(0);
              }

          
            // Call the resetSlots method After Succussful saving
            this.resetSlots();
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }
    }
  }

  setTimer() {
    const startTimeValue = this.slotConfigurationForm.get('startTime')?.value;
    const endDTimeValue = this.slotConfigurationForm.get('endTime')?.value;

    // console.log(startTimeValue)

    const startTime24 = this.convertTimeTo24Hours(startTimeValue);
    const endTime24 = this.convertTimeTo24Hours(endDTimeValue);

    this.start24Time = startTime24;
    this.end24Time = endTime24;
  }

  //generete Slots function
  generateTimeSlots() {
    this.showSlots = false;
    this.showSlots = true;
    this.timeSlots = [];
    this.durationToMin();
    this.setTimer();

    // Convert the start and end times to Date objects
    const startDate = new Date(`2000-01-01 ${this.start24Time}`);
    const endDate = new Date(`2000-01-01 ${this.end24Time}`);

    const lunchStart = new Date(`2000-01-01 ${this.lunchTimeStart}`);
    const lunchEnd = new Date(`2000-01-01 ${this.lunchTimeStart}`);

    // Calculate the time difference in minutes between the start and end times
    // const slotDurationInMinutes = 15;

    const slotDurationInMinutes = (this.slotConfigurationForm.get('slotDetail') as FormArray).at(0)?.get('slotDuration')?.value;
    for (let i = startDate.getTime(); i <= endDate.getTime(); i += slotDurationInMinutes * 60 * 1000) {
      const slotStart = new Date(i);
      const slotEnd = new Date(i + slotDurationInMinutes * 60 * 1000);

      //Testing
      if (slotEnd > new Date(lunchStart.getTime()) && slotEnd < new Date(lunchEnd.getTime())) {
        i = lunchStart.getTime();
        const slotStart = new Date(i);
        const slotEnd = new Date(i + slotDurationInMinutes * 60 * 1000);

        const slotStartTime = slotStart.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const slotEndTime = slotEnd.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        // Add the slot to the array
        this.timeSlots.push({ start24Time: slotStartTime, end24Time: slotEndTime });
        continue;
      }

      if (slotEnd > endDate) {
        const slotEnd = endDate;
        const slotStartTime = slotStart.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const slotEndTime = slotEnd.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        if (slotEnd == endDate) {
          break;
        }

        // Add the slot to the array
        this.timeSlots.push({ start24Time: slotStartTime, end24Time: slotEndTime });
        break;
      }

      // Format the time in HH:mm format
      const slotStartTime = slotStart.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const slotEndTime = slotEnd.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      // console.log(slotStartTime);
      // console.log(slotEndTime);

      // Add the slot to the array
      this.timeSlots.push({ start24Time: slotStartTime, end24Time: slotEndTime });
    }

    this.slotConfigurationForm.patchValue({
      doctorSlotCount: this.timeSlots.length,
    });

  }

  durationToMin() {
    const durat = this.slotConfigurationForm.get('statTime')?.value;
    console.log(durat);
  }

  resetSlots() {
    this.showSlots = false;
  }
}
