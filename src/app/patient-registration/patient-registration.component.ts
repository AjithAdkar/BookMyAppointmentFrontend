import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PatientRegistration } from '../models/patientregistration';
import { PatientRegistrationService } from './service/patient-registration.service';
import { MatDialog } from '@angular/material/dialog';
import { PatientRegistrationAddEditComponent } from './patient-registration-add-edit/patient-registration-add-edit.component';

@Component({
  selector: 'app-patient-registration',
  templateUrl: './patient-registration.component.html',
  styleUrls: ['./patient-registration.component.scss']
})
export class PatientRegistrationComponent {

  displayedColumns: string[] = ['patientName', 'patientEmail', 'patientPhone', 'patientOccupation','comments','action'];
  dataSource!: MatTableDataSource<PatientRegistration>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  patientsList:PatientRegistration[] = [];

  constructor(private patientservice:PatientRegistrationService,
    private _dialog: MatDialog,
    ) {} 

    ngOnInit(): void {
      this.fetchpatients();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  fetchpatients(){
    this.patientservice.fetchAllPatients().subscribe({
      next:data =>{
        this.patientsList = data;
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: err=>{
        console.log("unable to fetch the patient details."+ err);
      }
    });
  }
  
  // openAddEditPatientForm(){
  //   const dialogRef = this._dialog.open(PatientRegistrationAddEditComponent);
  //   dialogRef.afterClosed().subscribe({
  //     next: (val) => {
  //       if (val) {
  //         this.fetchpatients();
  //       }
  //     },
  //   });
  // }
  deletePatient(id:number){
    this.patientservice.deletePatient(id).subscribe({
      next:(data :any)=>{
        alert('Patient Deleted successfully');
        this.fetchpatients();
      },
      error: (error: any)=> {
        console.log("Error in deleting the user role."+ error);
      }
    });
  }
 
  openEditForm(data: any) {
    const dialogRef = this._dialog.open(PatientRegistrationAddEditComponent, {
      data,
      disableClose: true
    });
    console.log(data);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.fetchpatients();
        }
      },
    });
  }
}
