import { Component, Input } from '@angular/core';
import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Observable} from 'rxjs/Observable';

// Use jQuery
import $ from 'jquery/dist/jquery';

@Injectable()
export class ProjectDataService {
    
    private projectData;

    constructor( private http: Http ) { 
        this.initData();
        //this.http.get('src/assets/app-data/default-project.json')
        //    .subscribe(res => this.projectData = res.json());
    }

    /*-----------------------------------+
     |        Getters and Setters        |
     +-----------------------------------*/
    getProjectInfo(){
        return this.projectData.project;
    }
    setProjectInfo(project){
        this.projectData.project = project;
    }
    getClusterInfo(){
        return this.projectData.cluster;
    }
    setClusterInfo(cluster){
        this.projectData.cluster = cluster;
    }
    getWorkflowInfo(){
        return this.projectData.workflow;
    }
    setWorflowInfo(workflow){
        this.projectData.workflow = workflow;
    }
    getMetricsInfo(){
        return this.projectData.metrics;
    }
    setMetricsInfo(metrics){
        this.projectData.metrics = metrics;
    }

    /*-----------------------------------+
     |          Workflow Settings        |
     +-----------------------------------*/

    addWorkflowComponent(newComponent){
        this.projectData.workflow.components.push(newComponent);
        return this.projectData.workflow;
    }

    removeWorkflowComponentById(componentId){
        var components = this.getWorkflowInfo().components;
        for( var i = 0; i < components.length; i++ ){
            if( componentId == components[i].id ){
                components.splice(i, 1);
                break;
            }
        }
        return this.projectData.workflow;
    }

    getComponentSettingsById(componentId){
        var components = this.getWorkflowInfo().components;
        var selectedComponent;
        for( var i = 0; i < components.length; i++ ){
            if( componentId == components[i].id ){
                selectedComponent = components[i];
                break;
            }
        }
        if( typeof selectedComponent != undefined ){
            return selectedComponent.settings;
        }else{
            throw new Error("The selected id doesn't exist");
        }
    }

    setComponentSettingsById(componentId, settings){
        for( var i = 0; i < this.projectData.workflow.components.length; i++ ){
            var currentComponent = this.projectData.workflow.components[i];
            if( currentComponent.id == componentId ){
                this.projectData.workflow.components[i].settings = settings;
                break;
            }
        }
        return this.projectData.workflow;
    }

    setComponentLocationById(componentId, xPosition, yPosition){
        for( var i = 0; i < this.projectData.workflow.components.length; i++ ){
            var currentComponent = this.projectData.workflow.components[i];
            if( currentComponent.id == componentId ){
                this.projectData.workflow.components[i].settings.xPosition = xPosition;
                this.projectData.workflow.components[i].settings.yPosition = yPosition;
                break;
            }
        }
        return this.projectData.workflow;
    }

    addWorkflowLink(sourceId, targetId){
        for( var i = 0; i < this.projectData.workflow.components.length; i++ ){
            var currentComponent = this.projectData.workflow.components[i];
            if( currentComponent.id == sourceId || !this.projectData.workflow.components[i].linksTo.includes(targetId) ){
                this.projectData.workflow.components[i].linksTo.push(targetId);
                break;
            }
        }
        return this.projectData.workflow;
    }

    removeAllConnections(){
        console.log("Before remove all conections");
        console.log(this.projectData.workflow);
        for( var i = 0 ; i < this.projectData.workflow.components.length ; i++ ){
            var component = this.projectData.workflow.components[i];
            var newComponent = {
                "id": component.id,
                "componentType": component.componentType,
                "xPosition": component.xPosition,
                "yPosition": component.yPosition,
                "linksTo": [],
                "settings": component.settings
            };
            this.projectData.workflow.components[i] = newComponent;
        }
        console.log("After remove all conections");
        console.log(this.projectData.workflow);
    }

    updateConnections(conns){
        this.removeAllConnections();
        for( let conn of conns ){
            var sourceId = conn.sourceId;
            var targetId = conn.targetId;
            this.addWorkflowLink(sourceId, targetId);
        }
    }

    /*-----------------------------------+
     |         Init Project Data         |
     +-----------------------------------*/

    initData() {
        var text = this.readStringFromFileAtPath('assets/app-data/default-project.json');
        console.log(text);
        this.projectData = JSON.parse(text);
    }

    private readStringFromFileAtPath(pathOfFileToReadFrom){
        var request = new XMLHttpRequest();
        request.open("GET", pathOfFileToReadFrom, false);
        request.send(null);
        var text = request.responseText;
        return text;
    }
}
