import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import { EmployeeService } from '../employee.service';
import { Employee } from '../data/employee.model';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-animations-example-dialog',
  templateUrl: './dialog-animations-example-dialog.component.html',
  styleUrls: ['./dialog-animations-example-dialog.component.scss']
})
export class DialogAnimationsExampleDialogComponent implements OnInit {
  employerFormGroup!: FormGroup;
  
  @Output() submit = new EventEmitter<void>();
  @Output() employeeAdded = new EventEmitter<Employee>();

  employEditValue: any;

  constructor(
    private employeesService: EmployeeService,
    public dialogRef: MatDialogRef<any>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: 'EDIT' | 'ADD' ) { }
  


  ngOnInit(): void {
    
    this.employerFormGroup = this.fb.group({
      name: [],
      surname: [],
      dob: [],
      id: []
    })
    if (this.data === 'EDIT') {
      this.employeesService.employeeEditValueObs.subscribe((data) => {
        console.log(data);
        this.employerFormGroup.patchValue(data) 
      });
    }

  }

  addEmployee(): void {
    const id = Math.max(...this.employeesService.getEmployees().map(e => e.id)) + 1;
    const { name, surname, dob } = this.employerFormGroup.value;
    const employee: Employee = { name, surname, dob, id };
    this.employeesService.addEmployee(employee);
    this.employeeAdded.emit(employee);
  }



editEmployee() {
  // console.log(this.employerFormGroup.value);
  
  this.employeesService.employeeEditValueObs.subscribe((data) => {
    console.log(data);
    this.employerFormGroup.patchValue(data) 
  });
  // this.employerFormGroup.patchValue(this.employeesService.getEmployeeEditValue())
  // this.employeesService.getEmployeeEditValue().subscribe(el => {
  //   this.employEditValue = el;
  //   console.log(el);
  // })
}





  


}


