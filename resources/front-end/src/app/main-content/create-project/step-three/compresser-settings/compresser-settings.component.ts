import { Component, OnInit, Input } from '@angular/core';
import { ComponentSettings } from "../component-settings";

import { ProjectDataService } from '../../project-data.service';
@Component({
  selector: 'compresser-settings',
  templateUrl: './compresser-settings.component.html',
  styleUrls: ['./compresser-settings.component.css']
})
export class CompresserSettingsComponent extends ComponentSettings implements OnInit {

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
