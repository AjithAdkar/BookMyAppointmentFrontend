import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserRole } from 'src/app/models/userrole';

@Injectable({
  providedIn: 'root'
})
export class UserRolesService {

  baseUrl:string ;

  constructor(private httpClient: HttpClient) { 
    this.baseUrl = environment.config.apiUrl+'/v1/userroles/';
  }

  createRole(roleBody: UserRole): Observable<UserRole> {
      const roleUrl = this.baseUrl + 'saveuserrole'
      return this.httpClient.post<UserRole>(roleUrl, roleBody);// returns an onbservable
  }

  updateRole(roleId: number, roleBody: UserRole): Observable<UserRole> {
    const roleUrl = this.baseUrl+'updateuserrole/'+roleId;
    return this.httpClient.put<UserRole>(roleUrl, roleBody);
  }

  viewRole(roleId: number): Observable<UserRole> {
    const roleUrl = this.baseUrl+ 'fetchuserrole/'+roleId;
    return this.httpClient.get<UserRole>(roleUrl);
  }

  deleteRole(roleId: number): Observable<any>  {
   const roleUrl = this.baseUrl+'deleteuserrole/'+ roleId;
   return this.httpClient.delete<any>(roleUrl);
  }

  viewAllRole():  Observable<UserRole[]> {
   const roleUrl = this.baseUrl+'fetchalluserroles';
   return this.httpClient.get<UserRole[]>(roleUrl);
  }

}
