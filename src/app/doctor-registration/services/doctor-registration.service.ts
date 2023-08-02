import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DoctorRegistration } from 'src/app/models/doctorregistration';

import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class DoctorReistrationService {
  private doctorName: string | null = null;
 setDoctorName(firstName: string, lastName: string) {
    this.doctorName = `${firstName} ${lastName}`;
  }
  getDoctorName(): string | null {
    return this.doctorName;
  }
  baseUrl: string;
  constructor(private httpClient: HttpClient) {
    this.baseUrl = environment.config.apiUrl + '/api/v1/doctor';
  }
  saveDoctor(doctor: DoctorRegistration): Observable<DoctorRegistration> {
    const url = this.baseUrl + '/registerdoctor'
    return this.httpClient.post<DoctorRegistration>(url, doctor);
  }
  fetchAllDoctors(): Observable<DoctorRegistration[]> {
    const url = this.baseUrl + '/fetchalldoctor';
    return this.httpClient.get<DoctorRegistration[]>(url);
  }
  updateDoctor(doctorId: number, doctor: DoctorRegistration): Observable<DoctorRegistration> {
    const url = this.baseUrl + 'update/' + doctorId;
    return this.httpClient.put<DoctorRegistration>(url, doctor);
  }
  fetchDoctor(doctorId: number): Observable<DoctorRegistration> {
    const url = this.baseUrl + 'fetchbyid/' + doctorId;
    return this.httpClient.get<DoctorRegistration>(url);
  }
  deleteDoctor(doctorId: number): Observable<any> {
    const url = this.baseUrl + 'delete/' + doctorId;
    return this.httpClient.delete<any>(url);
  }
}
