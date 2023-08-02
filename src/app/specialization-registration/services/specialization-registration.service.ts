import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SpecializationRegistration } from 'src/app/models/specialization-registration';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SpecializationRegistrationService {

  baseUrl:string ;

  constructor(private httpClient: HttpClient) {
    this.baseUrl = environment.config.apiUrl+'/api/v1/doctorSpecialization/';   // http://localhost:8080/api/v1/doctorSpecialization/
  }


 saveSpecialization(specialization: SpecializationRegistration): Observable<SpecializationRegistration> {
  const url = this.baseUrl + 'saveDoctorSpecialization'; //http://localhost:8080/api/v1/doctorSpecialization/saveDoctorSpecialization
  return this.httpClient.post<SpecializationRegistration>(url, specialization);
}


 updateSpecializationById(specializationId: number, specialization: SpecializationRegistration): Observable<SpecializationRegistration> {
    const url = this.baseUrl+'updateSpecializationById/'+specializationId;  //http://localhost:8080/api/v1/doctorSpecialization/updateSpecializationById
    return this.httpClient.put<SpecializationRegistration>(url, specialization);
  }

 getSpecializationById(id: number): Observable<SpecializationRegistration> {
    const url = this.baseUrl+ 'getSpecializationById/'+id; //http://localhost:8080/api/v1/doctorSpecialization/getSpecializationById
    return this.httpClient.get<SpecializationRegistration>(url);
  }

 getAllSpecialization():  Observable<SpecializationRegistration[]> {
  const url = this.baseUrl+'getAllSpecialization'; //http://localhost:8080/api/v1/doctorSpecialization/getAllSpecialization
  return this.httpClient.get<SpecializationRegistration[]>(url);
 }

 deleteDoctorSpecialization(id: number): Observable<any>  {
 const url = this.baseUrl+'deleteSpecialization/'+ id;  //http://localhost:8080/api/v1/doctorSpecialization/deleteSpecialization
 return this.httpClient.delete<any>(url);
}
}

