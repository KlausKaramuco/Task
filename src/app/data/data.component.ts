import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAnimationsExampleDialogComponent } from '../dialog-animations-example-dialog/dialog-animations-example-dialog.component';
import { EmployeeService } from '../employee.service';
import { Employee } from './employee.model';




@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss']
})
export class DataComponent implements OnInit {
  dataToEdit: any;
  editing = false;
  employees: Employee[] = [];


  name: String | any;
  surname: String | any;
  dob: String | any;
  id: Number | any;
  i: any;




  constructor(private employeesService: EmployeeService, private dialog: MatDialog) {
    this.employees = this.employeesService.getEmployees();
  }

  ngOnInit(): void {
    this.employees = this.employeesService.getEmployees();
  }



  DeleteRow(i: number) {
    this.employees.splice(i, 1);

  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogAnimationsExampleDialogComponent, {
      data: 'ADD',
    });


    dialogRef.afterClosed().subscribe((result: any) => {
    });
  }

  addEmployee(employee: Employee): void {
    this.employees.push(employee);
  }


  ToggleEdit(index: number) {
    this.employees[index].editing = !this.employees[index].editing;

  }

  saveChanges(index: number) {
    this.employees[index].editing = false;
  }

  cancelEdit(index: number) {
    this.employees[index] = { ...this.employees[index] };

    this.employees[index].editing = false;

  }

  editData(rowValues: any): void {
    console.log(rowValues);
    this.employeesService.setEmployeeEditValue(rowValues);
    const dialog = this.dialog.open(DialogAnimationsExampleDialogComponent, {
      data: 'EDIT',
    });
    dialog.afterClosed().subscribe(result => {
      if (result) {

      }
    });
  }


}








