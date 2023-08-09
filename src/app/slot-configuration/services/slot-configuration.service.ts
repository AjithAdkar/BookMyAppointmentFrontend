import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SlotConfiguration } from 'src/app/models/slot-configuration';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SlotConfigurationService {

  baseUrl:string ;

  constructor(private httpClient: HttpClient) {
      this.baseUrl = environment.config.apiUrl+'/api/v1/doctor/slot/';
   }

   saveSlotConfiguration(slotConfiguration: SlotConfiguration ): Observable<SlotConfiguration>{
    const url=this.baseUrl+'save';
    return this.httpClient.post<SlotConfiguration>(url,slotConfiguration);
   }

   fetchAllSlotConfiguration():Observable<SlotConfiguration[]>{
    const url=this.baseUrl+'fetchall';
    return this.httpClient.get<SlotConfiguration[]>(url);
   }

   updateSlotConfiguration(SlotConfigurationId:number,slotConfiguration:SlotConfiguration):Observable<SlotConfiguration>{
    const url=this.baseUrl+'updateslot/'+SlotConfigurationId;
    return this.httpClient.put<SlotConfiguration>(url,slotConfiguration);
   }

   fetchSlotConfigurationById(SlotConfigurationId:number):Observable<SlotConfiguration>{
    const url=this.baseUrl+'fetchbyid/'+SlotConfigurationId;
    return this.httpClient.get<SlotConfiguration>(url);
   }

   deleteSlotConfiguration(SlotConfigurationId:number):Observable<any>
   {
    const url=this.baseUrl+'delete/'+SlotConfigurationId;
    return this.httpClient.delete(url, { responseType: 'text' });
   }

   }