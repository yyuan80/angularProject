import { Injectable } from '@angular/core';
import { Position } from './position';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PositionService {

    constructor(private http: HttpClient) { }
    getPositions() : Observable<Position[]>{
      return this.http.get<Position[]>("https://frozen-sands-50104.herokuapp.com/positions");
    }

    savePosition(position: Position) {
      return this.http.put<any>("https://frozen-sands-50104.herokuapp.com/position/" + position._id, position);
    }

    getPosition(id: string): Observable<Position[]> {
      return this.http.get<Position[]>("https://frozen-sands-50104.herokuapp.com/position/" + id);
    }
}
