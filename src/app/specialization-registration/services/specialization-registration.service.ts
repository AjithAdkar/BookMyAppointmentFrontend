import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SpecializationRegistration } from 'src/app/models/specialization-registration';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class SpecializationRegistrationService {

  baseUrl: string;

  constructor(private httpClient: HttpClient) {
    this.baseUrl = environment.config.apiUrl + '/api/v1/doctor/specialization/';
  }

  saveSpecialization(specialization: SpecializationRegistration): Observable<SpecializationRegistration> {
    const url = this.baseUrl + 'save';
    return this.httpClient.post<SpecializationRegistration>(url, specialization);
  }

  updateSpecializationById(specializationId: number, specialization: SpecializationRegistration): Observable<SpecializationRegistration> {
    const url = this.baseUrl + 'update/' + specializationId;
    return this.httpClient.put<SpecializationRegistration>(url, specialization);
  }

  fetchSpecializationById(id: number): Observable<SpecializationRegistration> {
    const url = this.baseUrl + 'fetchById/' + id;
    return this.httpClient.get<SpecializationRegistration>(url);
  }

  fetchAllSpecialization(): Observable<SpecializationRegistration[]> {
    const url = this.baseUrl + 'fetchAll';
    return this.httpClient.get<SpecializationRegistration[]>(url);
  }

  deleteSpecialization(id: number): Observable<any> {
    const url = this.baseUrl + 'delete/' + id;
    return this.httpClient.delete<any>(url);
  }
}

