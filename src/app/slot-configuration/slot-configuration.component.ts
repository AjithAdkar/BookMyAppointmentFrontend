import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-slot-configuration',
  templateUrl: './slot-configuration.component.html',
  styleUrls: ['./slot-configuration.component.scss']

})
export class SlotConfigurationComponent {

  slotConfigurationForm: FormGroup;

  showDefaultTimeFormat: boolean = false;

  static readonly timePatternFor24hr = /^(?:[01]\d|2[0-3]):[0-5]\d$/;

  // static readonly durationPattern = /^(?:[0-4]hrs)?(?:(?:[1-9]|[1-5][0-9])min)?$/;

  start24Time : string = '';
  end24Time: string = '';

  timeSlots: { start24Time: string, end24Time: string }[] = [];

  lunchTimeStart : string = '13:00';
  lunchTimeEnd : string = '14:00';

  setSlotTime : number = 15;

  showSlots : boolean = false;


  constructor(
    private _fb: FormBuilder,
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

      // if (startTime24 == endTime24 && !SlotConfigurationComponent.durationPattern.test(this.slotConfigurationForm.value.duration)) {
      //   this.slotConfigurationForm.get('endTime')?.setErrors({ 'startTimeandendTimeEqualError': true });
      //   this.slotConfigurationForm.get('startTime')?.setErrors({ 'startTimeandendTimeEqualError': true });
      //   // this.slotConfigurationForm.get('duration')?.setErrors({ 'durationError': true });
      //   return;
      // }

      // if (startTime24 > endTime24 && !SlotConfigurationComponent.durationPattern.test(this.slotConfigurationForm.value.duration)) {
      //   this.slotConfigurationForm.get('endTime')?.setErrors({ 'startTimeandendTimeError': true });
      //   this.slotConfigurationForm.get('startTime')?.setErrors({ 'startTimeandendTimeError': true });
      //   // this.slotConfigurationForm.get('duration')?.setErrors({ 'durationError': true });
      //   return;
      // } // Stop form submission

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

      // if (!SlotConfigurationComponent.durationPattern.test(this.slotConfigurationForm.value.duration)) {
      //   this.slotConfigurationForm.get('duration')?.setErrors({ 'durationError': true });
      // }

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

      // this.slotConfigurationForm.patchValue({
        startTime: startTime24;
        endTime: endTime24;
        
      // });
      const slotConfiguration = this.slotConfigurationForm.value;
      console.log(slotConfiguration);
      
      console.log(startTime24);
      console.log(endTime24);
      console.log(typeof (this.slotConfigurationForm.value.startTime))
    }


     // For 24 hour format  
    if (this.slotConfigurationForm.valid && SlotConfigurationComponent.timePatternFor24hr.test(this.slotConfigurationForm.value.startTime)) {
      const startTimeValue = this.slotConfigurationForm.get('startTime')?.value;
      const endDTimeValue = this.slotConfigurationForm.get('endTime')?.value;


      // if (startTimeValue > endDTimeValue && !SlotConfigurationComponent.durationPattern.test(this.slotConfigurationForm.value.duration)) {
      //   this.slotConfigurationForm.get('endTime')?.setErrors({ 'startTimeandendTimeError': true });
      //   this.slotConfigurationForm.get('startTime')?.setErrors({ 'startTimeandendTimeError': true });
      //   // this.slotConfigurationForm.get('duration')?.setErrors({ 'durationError': true });

      //   return;
      // } // Stop form submission

      // if (startTimeValue == endDTimeValue && !SlotConfigurationComponent.durationPattern.test(this.slotConfigurationForm.value.duration)) {
      //   this.slotConfigurationForm.get('endTime')?.setErrors({ 'startTimeandendTimeEqualError': true });
      //   this.slotConfigurationForm.get('startTime')?.setErrors({ 'startTimeandendTimeEqualError': true });
      //   // this.slotConfigurationForm.get('duration')?.setErrors({ 'durationError': true });
      //   return;
      // }

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

      // if (!SlotConfigurationComponent.durationPattern.test(this.slotConfigurationForm.value.duration)) {
      //   this.slotConfigurationForm.get('duration')?.setErrors({ 'durationError': true });
      // }
    }


      // For 24 hour format  
    if (this.slotConfigurationForm.valid && SlotConfigurationComponent.timePatternFor24hr.test(this.slotConfigurationForm.value.startTime)) {
      const slotConfiguration = this.slotConfigurationForm.value;
      // console.log(slotConfiguration);
    }
  }

  setTimer(){
    const startTimeValue = this.slotConfigurationForm.get('startTime')?.value;
      const endDTimeValue = this.slotConfigurationForm.get('endTime')?.value;

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
    const slotDurationInMinutes = this.slotConfigurationForm.get('duration')?.value;
    for (let i = startDate.getTime(); i <= endDate.getTime(); i += slotDurationInMinutes * 60 * 1000) {
      const slotStart = new Date(i);
      const slotEnd = new Date(i + slotDurationInMinutes * 60 * 1000);
  
      //Testing
      if(slotEnd > new Date(lunchStart.getTime()) && slotEnd < new Date(lunchEnd.getTime())){
        i = lunchStart.getTime();
        const slotStart = new Date(i);
      const slotEnd = new Date(i + slotDurationInMinutes * 60 * 1000);
      
      const slotStartTime = slotStart.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const slotEndTime = slotEnd.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  
      // Add the slot to the array
      this.timeSlots.push({ start24Time: slotStartTime, end24Time: slotEndTime });
        continue;
      }
  
      if(slotEnd > endDate)
      {
        const slotEnd = endDate;
        const slotStartTime = slotStart.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const slotEndTime = slotEnd.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  
      if(slotEnd == endDate){
        break;
      }
  
      // Add the slot to the array
      this.timeSlots.push({ start24Time: slotStartTime, end24Time: slotEndTime });
        break;
      }

      // // Format the time in HH:mm format
      const slotStartTime = slotStart.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const slotEndTime = slotEnd.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      // console.log(slotStartTime);
      // console.log(slotEndTime);
      
  
      // Add the slot to the array
      this.timeSlots.push({ start24Time: slotStartTime, end24Time: slotEndTime });
    }
  }

  durationToMin(){
   const durat = this.slotConfigurationForm.get('duration')?.value;
   console.log(durat);
   console.log(typeof(this.slotConfigurationForm.get('duration')?.value));
   
  }

  resetSlots(){
    this.showSlots = false;
  }
}
