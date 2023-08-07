import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DoctorRegistration } from 'src/app/models/doctorregistration';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class DoctorReistrationService {
  
  baseUrl:string;
  
  constructor(private httpClient: HttpClient) {
    this.baseUrl = environment.config.apiUrl +'/api/v1/doctor/';
  }

  saveDoctor(doctor: DoctorRegistration): Observable<DoctorRegistration> {
    const url = this.baseUrl+'registerdoctor';
    return this.httpClient.post<DoctorRegistration>(url, doctor);
  }

  fetchAllDoctors(): Observable<DoctorRegistration[]> {
    const url = this.baseUrl+ 'fetchalldoctor';
    return this.httpClient.get<DoctorRegistration[]>(url);
  }

  updateDoctorById(id: number, doctor: DoctorRegistration): Observable<DoctorRegistration> {
    const url = this.baseUrl+ 'update/';
    return this.httpClient.put<DoctorRegistration>(url, doctor);

  }

  fetchDoctorById(doctorId: number): Observable<DoctorRegistration> {
    const url = this.baseUrl+ 'fetchbyid/' + doctorId;
    return this.httpClient.get<DoctorRegistration>(url);
  }

  deleteDoctor(id: number): Observable<any> {
    const url = this.baseUrl+ 'deletedoctor/' + id;
    return this.httpClient.delete<any>(url);
  }
}
