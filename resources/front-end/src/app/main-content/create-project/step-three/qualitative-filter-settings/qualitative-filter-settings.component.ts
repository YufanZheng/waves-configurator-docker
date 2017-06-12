import { Component, OnInit, Input } from '@angular/core';
import { ComponentSettings } from "../component-settings";

import { ProjectDataService } from '../../project-data.service';

@Component({
  selector: 'qualitative-filter-settings',
  templateUrl: './qualitative-filter-settings.component.html',
  styleUrls: ['./qualitative-filter-settings.component.css']
})
export class QualitativeFilterSettingsComponent extends ComponentSettings implements OnInit {

  @Input() componentId;

  constructor( service: ProjectDataService ) { 
    super(service);
  }

  ngOnInit() {
  }

  deleteComponent(){
    super.deleteComponent( this.componentId );
  }

  detachConnections(){
    super.detachConnections( this.componentId );
  }
}
