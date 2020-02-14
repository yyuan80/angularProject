import { Component, OnInit, OnDestroy } from '@angular/core';
import { Employee } from './data/employee';
import { EmployeeService } from './data/employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit, OnDestroy {

  employees : Employee[];
  getEmployeesSub : any;
  loadingError : boolean = false;
  filteredEmployees: Employee[];

  constructor(private m: EmployeeService, private router: Router) {}

  ngOnInit() {
    this.getEmployeesSub = this.m.getEmployees()
    .subscribe((employees) =>{
      this.employees = employees;
      this.filteredEmployees = employees;
    },() => {
      this.loadingError = true;
    })
  }

  ngOnDestroy() {
    if(this.getEmployeesSub != undefined){
      this.getEmployeesSub.unsubscribe();
    }
  }
  
  routeEmployee(id: string){
    this.router.navigate(['/employee', id]);
  }

  onEmployeeSearchKeyUP(event:any){
    let name : string = event.target.value.toLowerCase();
    this.filteredEmployees = this.employees.filter((e) => ((e.FirstName.toLowerCase().indexOf(name) !== -1 ) || (e.LastName.toLowerCase().indexOf(name) !== -1) || (e.Position.PositionName.toLocaleLowerCase().indexOf(name) !== -1) ))
  }
}
