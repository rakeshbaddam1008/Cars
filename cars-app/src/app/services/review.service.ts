import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
    private subject = new Subject<number>();
    stepperIndex: number = 0
    activateContactPage: boolean = false;
    
    constructor() { }

    setStepperIndex(index: number) {
        this.stepperIndex = index
        this.subject.next(index);
    }
    getStepperIndex():Observable<number> {
        return this.subject.asObservable();
    }
}
