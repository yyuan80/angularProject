import { Component, OnInit } from '@angular/core';
import { EmployeeRaw } from "../data/employeeRaw";
import { EmployeeService } from "../data/employee.service";
import { ActivatedRoute } from "@angular/router";
import { PositionService } from "../data/position.service";
import { Position } from "../data/position";

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  paramSubScription: any;
  employeeSubscription: any;
  getPositionsSubscription: any;
  saveEmployeeSubscription: any;
  employee: EmployeeRaw; 
  positions: Position[];
  successMessage = false;
  failMessage = false;
  constructor(private m: EmployeeService, private route: ActivatedRoute, private positionService: PositionService) { }

  ngOnInit() {
    this.paramSubScription = this.route.params.subscribe((params) => {
      this.employeeSubscription = this.m.getEmployee(params['_id']).subscribe((emp) => {
        this.employee = emp[0];
      
        this.getPositionsSubscription = this.positionService.getPositions().subscribe((data) => {
          this.positions = data;
        });
      });
    });
   
  }

  onSubmit(){
    this.saveEmployeeSubscription = this.m.saveEmployee(this.employee)
    .subscribe(()=>{    
      this.successMessage = true;
      setTimeout(()=>{
        this.successMessage = false;
      },2500)},
    () => {
      this.failMessage = true;
      setTimeout(() => {
        this.failMessage = false;
      }, 2500);
    });
  }

  ogOnDestroy(){
    if(this.paramSubScription != undefined){
      this.paramSubScription.unsubscribe();
    }
    if(this.employeeSubscription != undefined){
      this.employeeSubscription.unsubscribe();
    }
    if(this.getPositionsSubscription != undefined){
      this.getPositionsSubscription.unsubscribe();
    }
    if(this.saveEmployeeSubscription != undefined){
      this.saveEmployeeSubscription.unsubscribe();
    }
  }
}
