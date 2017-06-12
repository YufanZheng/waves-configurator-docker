import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'waiting-page',
  templateUrl: './waiting-page.component.html',
  styleUrls: ['./waiting-page.component.css'],
  inputs: ['waiting', 'waitMsg']
})
export class WaitingPageComponent { }
