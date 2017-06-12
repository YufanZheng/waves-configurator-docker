import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

// Use jQuery
import $ from 'jquery/dist/jquery';

@Component({
  selector: 'import-project',
  templateUrl: './import-project.component.html',
  styleUrls: ['./import-project.component.css']
})
export class ImportProjectComponent{

  private serverUri: string  = "http://localhost:8080/waves-configurator/jarxs/project-data/";
  private waiting:   boolean = false; 
  private waitMsg:   string  = "";
  private project:   any;

  constructor( private router: Router ){}
  
  loadTrig( event ){
    if (File && FileReader && FileList && Blob) { // Check for the various File API support.
      var file = event.srcElement.files[0];
      if( file ){
        var reader = new FileReader();
        reader.readAsText(file, "UTF-8");
        reader.onerror = this.errorHandler;
        reader.onload = this.loaded;
      }
    } else { alert('The File APIs are not fully supported by your browser.'); }
  }

  uploadProject( trig ){
    let destination = this.serverUri + "load-trig";

    let xhr: XMLHttpRequest = new XMLHttpRequest();
    xhr.open("POST", destination, true);
    xhr.setRequestHeader("Content-type", "text/plain; charset=utf-8");
    xhr.onreadystatechange = (event) => {
      if (xhr.readyState == XMLHttpRequest.DONE) {
        var response = JSON.parse(xhr.responseText);
        if( response.success ){
          this.project = response;
          alert( "Successfully upload project " + this.project.projectName+ ", the TriG configuration is located at: " + this.project.graphLocation );
          this.router.navigate(['/execute-project', this.project.projectName]);
        } else {
          alert( response.errorMessage );
        }
      }
    }
    xhr.onloadstart = (event) => {
      this.waitMsg = "Uploading Project ...";
      this.waiting = !this.waiting;
    }
    xhr.onloadend = (event) => {
      this.waitMsg = "";
      this.waiting = !this.waiting;
    }
    xhr.onerror = (event) => {
      alert("Cannot connect to Server, please check if you have launched the server.");
    }
    xhr.send(trig);
  }

  private loaded(evt) {  
    // Obtain the read file data    
    var fileString = evt.target.result;
    $('textarea').val(fileString); 
  }

  private errorHandler(evt) {
    if(evt.target.error.name == "NotReadableError") {
      // The file could not be read
      alert("The file could not be read");
    }
  }
}
