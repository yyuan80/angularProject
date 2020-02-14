import { Component, OnInit } from '@angular/core';
import { Position } from "../data/position";
import { PositionService } from "../data/position.service";
import { ActivatedRoute } from "@angular/router";


@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.css']
})
export class PositionComponent implements OnInit {

  paramSubScription: any;
  positionSubscription: any;
  savePositionSubcription: any;
  position: Position;
  successMessage = false;
  failMessage = false;

  constructor(private positionService: PositionService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.paramSubScription = this.route.params.subscribe((param) => {
      this.positionSubscription = this.positionService.getPosition(param['_id']).subscribe((position) => {
        this.position = position[0];
      });
    });
  }

  onSubmit() {
    this.savePositionSubcription = this.positionService.savePosition(this.position)
    .subscribe(() => {
      this.successMessage = true;
      setTimeout(() => {
        this.successMessage = false;
      }, 2500);},
    () => {
      this.failMessage = true;
      setTimeout(() => {
        this.failMessage = false;
      }, 2500);
    });
  }

  ngOnDestroy() {
    if(this.paramSubScription != undefined){
      this.paramSubScription.unsubscribe();
    }
    if(this.positionSubscription != undefined){
      this.positionSubscription.unsubscribe();
    }
    if(this.savePositionSubcription != undefined){
      this.savePositionSubcription.unsubscribe();
    }
  }
}
