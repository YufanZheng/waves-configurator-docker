import { Component, OnInit, Input } from '@angular/core';
import { ComponentSettings } from "../component-settings";

import { ProjectDataService } from '../../project-data.service';

@Component({
  selector: 'triple-store-settings',
  templateUrl: './triple-store-settings.component.html',
  styleUrls: ['./triple-store-settings.component.css']
})
export class TripleStoreSettingsComponent extends ComponentSettings implements OnInit {

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
