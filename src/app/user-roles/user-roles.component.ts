import { Component, OnInit, ViewChild } from '@angular/core';
import { UserRolesService } from './services/user-roles.service';
import { UserRole } from '../models/userrole';
import { MatPaginator} from '@angular/material/paginator';
import { MatSort} from '@angular/material/sort';
import { MatTableDataSource} from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';
import { UserRolesAddEditComponent } from './user-roles-add-edit/user-roles-add-edit.component';

@Component({
  selector: 'app-user-roles',
  templateUrl: './user-roles.component.html',
  styleUrls: ['./user-roles.component.scss']
})
export class UserRolesComponent implements OnInit {

  displayedColumns: string[] = ['id', 'roleName', 'description', "action"];
  dataSource!: MatTableDataSource<UserRole>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  rolesList: UserRole[] = [];
  singleRole = {} ;

  constructor(private userRolesService: UserRolesService, 
              private _dialog: MatDialog,
              private _coreService: CoreService){}

  ngOnInit(): void {
    this.fetchAllUSerRoles();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openAddEditUserRoleForm() {
    const dialogRef = this._dialog.open(UserRolesAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.fetchAllUSerRoles();
        }
      },
    });
  }

  fetchAllUSerRoles(){
    
  this.userRolesService.viewAllRole().subscribe({
    next: data =>{
      this.rolesList = data;
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    },
    error: err=>{
      console.log("unable to fetch the user roles."+ err);    
    }
  });

}

  deleteUserRole(id: number){
      this.userRolesService.deleteRole(id).subscribe({
       next: (data:any)=> {
          alert("User Deleted");
          this.fetchAllUSerRoles();
        },
       error: (error: any)=> {
          console.log("Error in deleting the user role."+ error);
        }
   });
  }

  openEditForm(data: any) {
    const dialogRef = this._dialog.open(UserRolesAddEditComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.fetchAllUSerRoles();
        }
      },
    });
  }

}
