import { SlotDetail } from "./SlotDetail";
import { DoctorRegistration } from "./doctorregistration";
import { SpecializationRegistration } from "./specialization-registration";

export interface SlotConfiguration{
    id : number,
    doctorName :DoctorRegistration,
    slotDate : string,
    slotDetail: SlotDetail[],
    remarks: string,
    doctorSpecialization:SpecializationRegistration,
    doctorSlotCount:number,
    startDate:string,
    endDate:String
}
