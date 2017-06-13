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
    
  constructor(private service: ProjectDataService) { 
    this.licenseList = JSON.parse( this.readStringFromFileAtPath('assets/app-data/license-list.json') );
  }

  ngOnInit() {
    this.project = this.service.getProjectInfo();
  }

  stepChange(step){
    this.service.setProjectInfo(this.project);
    this.stepEvent.emit(step);
  }

  private readStringFromFileAtPath(pathOfFileToReadFrom){
    var request = new XMLHttpRequest();
    request.open("GET", pathOfFileToReadFrom, false);
    request.send(null);
    var text = request.responseText;
    return text;
  }
}
