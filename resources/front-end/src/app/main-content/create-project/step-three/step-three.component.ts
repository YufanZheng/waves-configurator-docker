import { Component, OnInit, Input, Output, OnDestroy, EventEmitter } from '@angular/core';
import { Http } from '@angular/http';
import { ProjectDataService } from '../project-data.service';
import { JsPlumbSingleton } from './jsPlumb-singleton';

// Use jQuery
import $ from 'jquery/dist/jquery';
// User jQuery UI to drag and drop
import 'jquery-ui/themes/base/core.css';
import 'jquery-ui/themes/base/theme.css';
import 'jquery-ui/themes/base/draggable.css';
import 'jquery-ui/ui/core';
import 'jquery-ui/ui/widgets/draggable';
import 'jquery-ui/ui/widgets/droppable';
// Use jsPlumb for connection component
declare var jsPlumb: any;

@Component({
  selector: 'step-three',
  templateUrl: './step-three.component.html',
  styleUrls: ['./step-three.component.css']
})
export class StepThreeComponent implements OnInit {

  // A variable to save project data which is currently created
  @Input() workflow;
  @Output() stepEvent = new EventEmitter<number>();
  
  private selectedComponentId;
  private selectedComponentType;
  private jsPlumbInstance;

  private selector;

  constructor(private service: ProjectDataService, private http: Http) { 
    var text = this.readStringFromFileAtPath('../../../../src/app/app-data/component-list.json');
    this.selector = JSON.parse(text);
    this.selectedComponentType = "";
    this.jsPlumbInstance = JsPlumbSingleton.getInstance();
  }

  ngOnInit() { 
    this.workflow = this.service.getWorkflowInfo();
  }

  ngAfterViewInit() {

    $('.draggable').draggable({
      containment: ".droppable",
      revert: 'invalid',
      cursor: 'move',
      appendTo: ".droppable",
      helper: this.moveHelper
    });

    $('.droppable').droppable( {
        drop: ( event, ui) => {
          if( $(ui.draggable).hasClass("draggable") ){
            // First time to drop - Drag from selector panel
            var newDiv = $(ui.helper).clone(false).removeClass("draggable");
            $('.droppable').append(newDiv);
            JsPlumbSingleton.initNode(newDiv);
            var newComponent = {
                "id": newDiv.attr("id"),
                "componentType": newDiv.text().trim(),
                "xPosition": newDiv.offset().left - $('.droppable').offset().left,
                "yPosition": newDiv.offset().top - $('.droppable').offset().top,
                "linksTo": [],
                "settings": {}
            };
            this.service.addWorkflowComponent(newComponent);
          }
        }
    });
  }

  moveHelper( event ) {
    return `<div class="draggable component" type="` + $(this).text().trim() + `">
                <img src="` + $(this).children("img").attr("src") + `">
                <p>` + $(this).text().trim() + `</p>
                <div class="anchor-out"></div>
            </div>`;
  }

  stepChange(step){
    this.updateComponentsLocation();
    this.updateConnections();
    this.service.setWorflowInfo(this.workflow);
    this.stepEvent.emit(step);
    console.log(this.service.getWorkflowInfo());
    console.log("WARNING!!!!!!!!!!!!!!!!!!!!!!: Update connections don't work.")
  }

  selectComponent(evt: any): void {
    // Get the selected component Id
    var componentId;
    for( var i:number = 0; i < evt.path.length; i++){
      if( evt.path[i].id != "" ){
        componentId = evt.path[i].id;
        break;
      }
    }
    // Show selection with border colors
    if (typeof componentId != 'undefined'){
      // If select on component, change the seletced component's border color
      $("#"+componentId).siblings().removeClass("selected-border");
      $("#"+componentId).toggleClass("selected-border");
      this.selectedComponentId = componentId;
      this.selectedComponentType = $("#"+componentId).text().trim() ;
    } else { 
      // If click on background, deselect all components
      $('.droppable').find('.component').removeClass("selected-border");
      this.selectedComponentType = "";
     }
  }

  private updateComponentsLocation(){
    var componentDivs = document.getElementsByClassName('component');
    for( var i = 0 ; i < componentDivs.length ; i++ ){
      var id = componentDivs[i].id;
      var div = $("#"+id);
      var xPosition = div.offset().left - $('.droppable').offset().left;
      var yPosition = div.offset().top - $('.droppable').offset().top;
      this.service.setComponentLocationById(id, xPosition, yPosition);
    }
  }

  private updateConnections(){
    var conns = JsPlumbSingleton.getInstance().getAllConnections();
    console.log(conns);
    this.service.updateConnections(conns);
  }

  private imgSourcePath(type: string){
    return "src/assets/img/workflow/" + type.toLowerCase().split(' ').join('_') + ".png";
  }

  private readStringFromFileAtPath(pathOfFileToReadFrom){
    var request = new XMLHttpRequest();
    request.open("GET", pathOfFileToReadFrom, false);
    request.send(null);
    var text = request.responseText;
    return text;
  }
}
