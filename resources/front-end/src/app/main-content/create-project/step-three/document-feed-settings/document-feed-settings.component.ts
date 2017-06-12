import { Component, OnInit, Input } from '@angular/core';
import { ComponentSettings } from "../component-settings";

import { ProjectDataService } from '../../project-data.service';

@Component({
  selector: 'document-feed-settings',
  templateUrl: './document-feed-settings.component.html',
  styleUrls: ['./document-feed-settings.component.css']
})
export class DocumentFeedSettingsComponent extends ComponentSettings implements OnInit {

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
