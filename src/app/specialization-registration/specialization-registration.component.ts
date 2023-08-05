import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';
import { SpecializationRegistration } from '../models/specialization-registration';
import { SpecializationRegistrationService } from './services/specialization-registration.service';
import { SpecializationRegistrationAddEditComponent } from './specialization-registration-add-edit/specialization-registration-add-edit.component';

@Component({
  selector: 'app-specialization-registration',
  templateUrl: './specialization-registration.component.html',
  styleUrls: ['./specialization-registration.component.scss']
})
export class SpecializationRegistrationComponent implements OnInit {

  displayedColumns: string[] = ['Name', 'description', "action"];
  dataSource!: MatTableDataSource<SpecializationRegistration>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  specializationList: SpecializationRegistration[] = [];
  singleName = {};

  constructor(private specializationRegistrationService: SpecializationRegistrationService,
    private _dialog: MatDialog,
    private _coreService: CoreService) { }

  ngOnInit(): void {
    this.fetchAllSpecialization();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openAddEditSpecializationRegistrationForm() {
    const dialogRef = this._dialog.open(SpecializationRegistrationAddEditComponent, { disableClose: true });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.fetchAllSpecialization();
        }
      },
    });
  }

  fetchAllSpecialization() {
    this.specializationRegistrationService.fetchAllSpecialization().subscribe({
      next: data => {
        this.specializationList = data;
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: err => {
        console.log("unable to fetch the specialization." + err);
      }
    });

  }
  deleteSpecialization(id: number) {
    this.specializationRegistrationService.deleteSpecialization(id)
      .subscribe({
        next: (data: any) => {
          alert("Specialization Deleted");
          this.fetchAllSpecialization();
        },
        error: (error: any) => {
          console.log("Error in deleting the specialization." + error);
        }
      });
  }

  openEditForm(data: any) {
    const dialogRef = this._dialog.open(SpecializationRegistrationAddEditComponent, {
      data,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.fetchAllSpecialization();
        }
      },
    });
  }
}
