import { Injectable } from '@angular/core';
import { Employee } from './employee';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { EmployeeRaw } from "./employeeRaw";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  constructor(private http: HttpClient) { }
  getEmployees() : Observable<Employee[]>{
    return this.http.get<Employee[]>("https://frozen-sands-50104.herokuapp.com/employees");
  }

  saveEmployee(employee: EmployeeRaw): Observable<any> {
    return this.http.put<any>("https://frozen-sands-50104.herokuapp.com/employee/" + employee._id, employee);
  }

  getEmployee(id: number): Observable<EmployeeRaw[]> {
    return this.http.get<EmployeeRaw[]>("https://frozen-sands-50104.herokuapp.com/employee-raw/" + id);
  }

}
