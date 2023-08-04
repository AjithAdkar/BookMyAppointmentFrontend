import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SpecializationRegistrationService } from '../specialization-registration/services/specialization-registration.service';
import { DoctorReistrationService } from '../doctor-registration/services/doctor-registration.service';

@Component({
  selector: 'app-slot-configuration',
  templateUrl: './slot-configuration.component.html',
  styleUrls: ['./slot-configuration.component.scss']

})
export class SlotConfigurationComponent implements OnInit {

  slotConfigurationForm: FormGroup;

  showDefaultTimeFormat: boolean = false;

  static readonly timePatternFor24hr = /^(?:[01]\d|2[0-3]):[0-5]\d$/;

  static readonly durationPattern = /^(?:[0-4]hrs)?(?:(?:[1-9]|[1-5][0-9])min)?$/;

  specializationData: any[] =[];

  doctorData: any[] =[];
  
  isFormSubmitted: boolean = false;




  constructor(
    private _fb: FormBuilder,
    private specializationRegistrationService: SpecializationRegistrationService,
    private doctorReistrationService: DoctorReistrationService,

  ) {
    this.slotConfigurationForm = this._fb.group({
      doctorName: ['', Validators.required],
      registrationDate: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      duration: ['', Validators.required],
      remarks: '',
      specialization: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.specializationRegistrationService.getAllSpecialization().subscribe(getallspecialization =>{
      this.specializationData = getallspecialization;
    });
  this.doctorReistrationService.fetchAllDoctors().subscribe(getalldoctor =>{
      this.doctorData=getalldoctor;
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

    // For 12 hour format  
    if (this.slotConfigurationForm.valid && !SlotConfigurationComponent.timePatternFor24hr.test(this.slotConfigurationForm.value.startTime)) {
      const startTimeValue = this.slotConfigurationForm.get('startTime')?.value;
      const endDTimeValue = this.slotConfigurationForm.get('endTime')?.value;

      const startTime24 = this.convertTimeTo24Hours(startTimeValue);
      const endTime24 = this.convertTimeTo24Hours(endDTimeValue);

      if (startTime24 == endTime24 && !SlotConfigurationComponent.durationPattern.test(this.slotConfigurationForm.value.duration)) {
        this.slotConfigurationForm.get('endTime')?.setErrors({ 'startTimeandendTimeEqualError': true });
        this.slotConfigurationForm.get('startTime')?.setErrors({ 'startTimeandendTimeEqualError': true });
        this.slotConfigurationForm.get('duration')?.setErrors({ 'durationError': true });
        return;
      }

      if (startTime24 > endTime24 && !SlotConfigurationComponent.durationPattern.test(this.slotConfigurationForm.value.duration)) {
        this.slotConfigurationForm.get('endTime')?.setErrors({ 'startTimeandendTimeError': true });
        this.slotConfigurationForm.get('startTime')?.setErrors({ 'startTimeandendTimeError': true });
        this.slotConfigurationForm.get('duration')?.setErrors({ 'durationError': true });
        return;
      } // Stop form submission

      if (startTime24 > endTime24) {
        this.slotConfigurationForm.get('endTime')?.setErrors({ 'startTimeandendTimeError': true });
        this.slotConfigurationForm.get('startTime')?.setErrors({ 'startTimeandendTimeError': true });
        return;
      } // Stop form submission

      if (startTime24 == endTime24) {
        this.slotConfigurationForm.get('endTime')?.setErrors({ 'startTimeandendTimeEqualError': true });
        this.slotConfigurationForm.get('startTime')?.setErrors({ 'startTimeandendTimeEqualError': true });
        return;
      }

      const durationValue = this.slotConfigurationForm.get('duration')?.value;

      if (!SlotConfigurationComponent.durationPattern.test(this.slotConfigurationForm.value.duration)) {
        this.slotConfigurationForm.get('duration')?.setErrors({ 'durationError': true });
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
      const slotConfiguration = this.slotConfigurationForm.value;
      console.log(slotConfiguration);
      console.log(typeof (this.slotConfigurationForm.value.startTime))
    }


     // For 24 hour format  
    if (this.slotConfigurationForm.valid && SlotConfigurationComponent.timePatternFor24hr.test(this.slotConfigurationForm.value.startTime)) {
      const startTimeValue = this.slotConfigurationForm.get('startTime')?.value;
      const endDTimeValue = this.slotConfigurationForm.get('endTime')?.value;


      if (startTimeValue > endDTimeValue && !SlotConfigurationComponent.durationPattern.test(this.slotConfigurationForm.value.duration)) {
        this.slotConfigurationForm.get('endTime')?.setErrors({ 'startTimeandendTimeError': true });
        this.slotConfigurationForm.get('startTime')?.setErrors({ 'startTimeandendTimeError': true });
        this.slotConfigurationForm.get('duration')?.setErrors({ 'durationError': true });

        return;
      } // Stop form submission

      if (startTimeValue == endDTimeValue && !SlotConfigurationComponent.durationPattern.test(this.slotConfigurationForm.value.duration)) {
        this.slotConfigurationForm.get('endTime')?.setErrors({ 'startTimeandendTimeEqualError': true });
        this.slotConfigurationForm.get('startTime')?.setErrors({ 'startTimeandendTimeEqualError': true });
        this.slotConfigurationForm.get('duration')?.setErrors({ 'durationError': true });
        return;
      }

      if (startTimeValue > endDTimeValue) {
        this.slotConfigurationForm.get('endTime')?.setErrors({ 'startTimeandendTimeError': true });
        this.slotConfigurationForm.get('startTime')?.setErrors({ 'startTimeandendTimeError': true });

        return;
      } // Stop form submission

      if (startTimeValue == endDTimeValue) {
        this.slotConfigurationForm.get('endTime')?.setErrors({ 'startTimeandendTimeEqualError': true });
        this.slotConfigurationForm.get('startTime')?.setErrors({ 'startTimeandendTimeEqualError': true });
        return;
      }
      const durationValue = this.slotConfigurationForm.get('duration')?.value;

      if (!SlotConfigurationComponent.durationPattern.test(this.slotConfigurationForm.value.duration)) {
        this.slotConfigurationForm.get('duration')?.setErrors({ 'durationError': true });
      }
    }


      // For 24 hour format  
    if (this.slotConfigurationForm.valid && SlotConfigurationComponent.timePatternFor24hr.test(this.slotConfigurationForm.value.startTime)) {
      const slotConfiguration = this.slotConfigurationForm.value;
      console.log(slotConfiguration);
    }
  }
}
