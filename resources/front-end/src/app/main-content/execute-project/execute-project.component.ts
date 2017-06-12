import { Component, OnInit, ViewChild  } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { HighlightJsService } from 'angular2-highlight-js';

// Use jQuery
import $ from 'jquery/dist/jquery';

@Component({
  selector: 'execute-project',
  templateUrl: './execute-project.component.html',
  styleUrls: ['./execute-project.component.css']
})
export class ExecuteProjectComponent implements OnInit {

  @ViewChild('submitLogs') submitLogs;
  private shown: string = "configuration";
  public filterQuery = "";
  public rowsOnPage = 10;
  public sortBy = "name";
  public sortOrder = "asc";

  private projectName:  string;
  private location: string;
  private serverUri: string  = "http://localhost:8080/waves-configurator/jarxs/";
  private properties = [];

  private waiting: boolean = false;
  private waitMsg: string = "";

  constructor(
    private activeRouter: ActivatedRoute, 
    private router: Router, 
    private http: Http,
    private service : HighlightJsService){

    }

  ngOnInit() {
    // Load project name from routing params
    this.activeRouter.params.subscribe(
      (params: Params) => {
        let projectName = params["name"];
        this.projectName = projectName;
      }
    );
    // Get project info from triple store
    this.getProjectInfo();
  }

  ngAfterViewInit() {        
        this.service.highlight(this.submitLogs.nativeElement.querySelector('.typescript'));
    }

  private getProjectInfo(){
    let destination = this.serverUri + "project-data/project-info";
    let xhr: XMLHttpRequest = new XMLHttpRequest();
    xhr.open("POST", destination, true);
    xhr.setRequestHeader("Content-type", "text/plain; charset=utf-8");
    xhr.onreadystatechange = (event) => {
      if (xhr.readyState == XMLHttpRequest.DONE) {
        var response = JSON.parse(xhr.responseText);
        if( response.success ){
          console.log(response);
          this.extractData(response);
        } else {
          alert( response.errorMessage );
        }
      }
    }
    xhr.onloadstart = (event) => {
      this.waitMsg = "Retrieving Project Information ...";
      this.waiting = !this.waiting;
    }
    xhr.onloadend = (event) => {
      this.waitMsg = "";
      this.waiting = !this.waiting;
    }
    xhr.onerror = (event) => {
      alert("Cannot connect to Server, please check if you have launched the server or refresh the page.");
    }
    xhr.send(this.projectName);
  } 

  private execute(){
    let destination = this.serverUri + "project-execution/run";
    let xhr: XMLHttpRequest = new XMLHttpRequest();
    xhr.open("POST", destination, true);
    xhr.setRequestHeader("Content-type", "text/plain; charset=utf-8");
    xhr.onreadystatechange = (event) => {
      if (xhr.readyState == XMLHttpRequest.DONE) {
        var response = JSON.parse(xhr.responseText);
        if( response.success ){
          this.submitLogs.nativeElement.insertAdjacentHTML("beforeend", response.logs);
          this.shown = "logs";
        } else {
          alert( response.errorMessage );
        }
      }
    }
    xhr.onloadstart = (event) => {
      this.waitMsg = "Submitting Project into Cluster ...";
      this.waiting = !this.waiting;
    }
    xhr.onloadend = (event) => {
      this.waitMsg = "";
      this.waiting = !this.waiting;
    }
    xhr.onerror = (event) => {
      alert("Cannot connect to Server, please check if you have launched the server or refresh the page.");
    }
    xhr.send(this.projectName);
  }

  private extractData(data){
    this.location = data.location;
    for( var property of data.properties ){
      for( var key in property ){
        var p = {
          "name": key,
          "value": property[key]
        };
        this.properties.push(p);
      }
    }
  }

  private selectConfigTable(){
    this.shown = "configuration";
  }

  private selectSubmitLogs(){
    this.shown = "submitLogs";
  }

  private selectExecutionLogs(){
    this.shown = "executionLogs";
  }

}
