import { Component, OnInit, Input, Output, OnDestroy, EventEmitter } from '@angular/core';
import { ProjectDataService } from '../project-data.service';

@Component({
  selector: 'step-four',
  templateUrl: './step-four.component.html',
  styleUrls: ['./step-four.component.css']
})
export class StepFourComponent implements OnInit {

  @Input() metrics;
  @Output() stepEvent = new EventEmitter<number>();
  private reporterList = ["Console"];

  constructor(private service: ProjectDataService) { }

  ngOnInit() {
    this.metrics = this.service.getMetricsInfo();
  }

  stepChange(step){
    this.stepEvent.emit(step);
  }

}
