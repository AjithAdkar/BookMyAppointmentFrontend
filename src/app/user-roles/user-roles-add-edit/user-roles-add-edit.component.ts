import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoreService } from '../../core/core.service';
import { UserRolesService } from '../services/user-roles.service';

@Component({
  selector: 'app-user-roles-add-edit',
  templateUrl: './user-roles-add-edit.component.html',
  styleUrls: ['./user-roles-add-edit.component.scss']
})
export class UserRolesAddEditComponent implements OnInit {
  userRoleForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private userRolesService: UserRolesService,
    private _dialogRef: MatDialogRef<UserRolesAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService
  ) {
    this.userRoleForm = this._fb.group({
      roleName: '',
      description: '',
    });
  }

  ngOnInit(): void {
    this.userRoleForm.patchValue(this.data);
  }

  onFormSubmit() {
    if (this.userRoleForm.valid) {
      if (this.data) {
        this.userRolesService
          .updateRole(this.data.id, this.userRoleForm.value)
          .subscribe({
            next: (val: any) => {
              this._coreService.openSnackBar('User Role updated successfully');
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
      this.userRolesService.createRole(this.userRoleForm.value).subscribe({
        next: (val: any) => {
          this._coreService.openSnackBar('User Role added successfully');
          this._dialogRef.close(true);
        },
        error: (err: any) => {
          console.error(err);
        },
      });
    }  
  }
 }
}
