import { Component, OnInit, Input, Output, OnDestroy, EventEmitter } from '@angular/core';
import { Http } from '@angular/http';
import { ProjectDataService } from '../project-data.service';

@Component({
  selector: 'step-one',
  templateUrl: './step-one.component.html',
  styleUrls: ['./step-one.component.css']
})
export class StepOneComponent implements OnInit {

  // A variable to save current creating's project data
  @Input() project;
  @Output() stepEvent = new EventEmitter<number>();
  private licenseList = [];
    
  constructor(private service: ProjectDataService, private http: Http) { 
    this.http.get('src/app/app-data/license-list.json')
        .subscribe(res => this.licenseList = res.json());
  }

  ngOnInit() {
    this.project = this.service.getProjectInfo();
  }

  stepChange(step){
    this.service.setProjectInfo(this.project);
    this.stepEvent.emit(step);
  }
}
