import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Employee } from './data/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  // private employeeEditValue = new BehaviorSubject({});
  // getemployeeEditValue = this.employeeEditValue.asObservable();

  private employeeEditValue = new BehaviorSubject<any>(undefined);
  public employeeEditValueObs = this.employeeEditValue.asObservable();

  public employees: Employee[] = [
    { name: 'John', surname: 'Alleck', dob: '13/07/1994', id: 1932, editing: false },
    { name: 'Jane', surname: 'Key', dob: '15/09/2001', id: 2762, editing: false },
     { name: 'Spiro', surname: 'Kristollari', dob: '07/01/1999', id: 7631, editing: false },
    { name: 'Klaus', surname: 'Karamuco', dob: '15/11/2002', id: 7676, editing: false },
  ];

  constructor() { }
  // setEmployeeEditValue(employeeEditValue: any){
  //   this.employeeEditValue = employeeEditValue;
  // }

  public getEmployeeEditValue(): Observable<any> {
    return this.employeeEditValue.getValue()
  }

  public setEmployeeEditValue(body: any) {
    return this.employeeEditValue.next(body);
  }

  getEmployees(): Employee[] {
    return this.employees;
  }

  addEmployee(employee: Employee): void {
    this.employees.push(employee);
  }





}

























