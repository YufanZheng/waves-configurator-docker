import { Component, OnInit, Input, Output, OnDestroy, EventEmitter } from '@angular/core';
import { Http } from '@angular/http';
import { ProjectDataService } from '../project-data.service';

@Component({
  selector: 'step-two',
  templateUrl: './step-two.component.html',
  styleUrls: ['./step-two.component.css']
})
export class StepTwoComponent implements OnInit {

  // A variable to save current creating's project data
  @Input() cluster;
  @Output() stepEvent = new EventEmitter<number>();
  private defaultPort;

  constructor(private service: ProjectDataService) { 
    this.defaultPort = JSON.parse( this.readStringFromFileAtPath('assets/app-data/default-port.json') );
  }

  ngOnInit() { 
    this.cluster = this.service.getClusterInfo();
  }

  stepChange(step){
    this.service.setClusterInfo(this.cluster);
    this.stepEvent.emit(step);
  }

  chooseEngine(type){
    this.cluster.rspEngine = type;
  }

  /**
   * @desc  When the type of choices for service changes, the default port changes as well.
   */
  changeDefaultPort(type, index){
    this.cluster.services[index].defaultPort = this.defaultPort[type];
  }

  addService(service, index){
    this.cluster.services.splice(index, 0, service);
  }

  removeService(index){
    this.cluster.services.splice(index, 1);
  }

  /**
   * @return "yes", "no" or "unknown"
   */
  checkConnection(ip, port){
    return "no";
  }

  checkConnectionForAll(){
    for( var i = 0; i < this.cluster.services.length; i++ ){
      var ip = this.cluster.services[i].ip;
      var port = this.cluster.services[i].port;
      this.cluster.services[i].connectionStatus = this.checkConnection(ip, port);
      this.service.setClusterInfo(this.cluster);
    }
  }

  /**
   * 
   * @param serviceName i.e. "Coordinator" etc
   * @param serviceList 
   * @param index       The index of row in the page
   * 
   * @desc  Only the first time appearence's label for each type will be shown in page
   */
  private firstAppearance(serviceName, serviceList, index){
    for( var i: number = 0; i < index; i++ ){
      //console.log(serviceName, serviceList[i].name);
      if( serviceName == serviceList[i].name )
        return false; 
    }
    return true;
  }

 /**
  * 
  * @param serviceType  Service type
  * @param serviceList 
  * @param index        The index of row in the page
  *
 * @desc  "Add" row button will only be shown when it's the first time show in this type
  */
  private firstAppearanceInType(serviceType, serviceList, index){
    for( var i = 0; i < index; i++ ){
      if( serviceType == serviceList[i].types[0] && index != i ){
        return false;
      }
    }
    return true;
  }

  private readStringFromFileAtPath(pathOfFileToReadFrom){
    var request = new XMLHttpRequest();
    request.open("GET", pathOfFileToReadFrom, false);
    request.send(null);
    var text = request.responseText;
    return text;
  }
}
