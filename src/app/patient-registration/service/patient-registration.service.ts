import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PatientRegistration } from 'src/app/models/patientregistration';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PatientRegistrationService {

  
  baseUrl:string ;

  constructor(private httpClient: HttpClient) {
    this.baseUrl = environment.config.apiUrl+'/api/v1/patient/';
  }

  savePatient(patient: PatientRegistration): Observable<PatientRegistration> {
    const url = this.baseUrl + 'save';
    console.log("from save method in service -- "+patient);
    return this.httpClient.post<PatientRegistration>(url, patient);
  }

  fetchAllPatients():  Observable<PatientRegistration[]> {
    const url = this.baseUrl+'fetchall';
    return this.httpClient.get<PatientRegistration[]>(url);
  }

  updatePatient(patientId: number, patient: PatientRegistration): Observable<PatientRegistration> {
    const url = this.baseUrl+'update/'+patientId;
    return this.httpClient.put<PatientRegistration>(url, patient);
  }

  fetchPatientById(id: number): Observable<PatientRegistration> {
    const url = this.baseUrl+ 'fetchbyid/'+id;
    return this.httpClient.get<PatientRegistration>(url);
  }

  deletePatient(id: number): Observable<any>  {
  const url = this.baseUrl+'delete/'+ id;
  return this.httpClient.delete(url, { responseType: 'text' });
  }

}
