import { Component, OnInit, ViewChild } from '@angular/core';
import { DoctorRegistration } from '../../models/doctorregistration';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DoctorReistrationService } from '../services/doctor-registration.service';
import { MatDialog } from '@angular/material/dialog';
import { DoctorRegistrationComponent } from '../doctor-registration.component';

@Component({
  selector: 'app-show-doctor-details',
  templateUrl: './show-doctor-details.component.html',
  styleUrls: ['./show-doctor-details.component.scss']
})
export class ShowDoctorDetailsComponent implements OnInit{
  displayedColumns: string[] = ['doctorName', 'doctorgender', 'doctorEmail', 'doctorSpecialization','doctorExperience','doctorQualification','action'];
  dataSource!: MatTableDataSource<DoctorRegistration>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  doctorList:DoctorRegistration[] = [];

  constructor(
               private doctorRegistrationservice:DoctorReistrationService,
               private _dialog: MatDialog,
              ) {} 
  
  ngOnInit(): void {
      this.fetchDoctors();
  }
 applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  fetchDoctors(){
    this.doctorRegistrationservice.fetchAllDoctors().subscribe({
      next:data =>{
        this.doctorList = data;
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: err=>{
        console.log("unable to fetch the doctor details."+ err);
      }
    });
  }
  openEditForm(data:any){
    const dialogRef = this._dialog.open(DoctorRegistrationComponent, {
      data,
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.fetchDoctors();
        }
      },
    });
  }
 deleteDoctor(id: number){
    this.doctorRegistrationservice.deleteDoctor(id)
    .subscribe({
     next: (data:any)=> {
        alert("Specialization Deleted");
        this.fetchDoctors();
      },
     error: (error: any)=> {
        console.log("Error in deleting the specialization."+ error);
      }
 });
}
}



