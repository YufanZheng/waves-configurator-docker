import { Component, OnInit } from '@angular/core';
import { ProjectDataService } from './project-data.service';

@Component({
  selector: 'create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})
export class CreateProjectComponent implements OnInit {

  public step: number;

  constructor( ){}

  ngOnInit() {
    this.step = 1;
  }

}
