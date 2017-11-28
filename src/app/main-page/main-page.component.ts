import { HypermediaClientService } from './../hypermedia-view/hypermedia-client.service';
import { Component, OnInit, Input } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  private readonly URL_REGEX = /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/;
public urlFormControl: FormControl;

  @Input() apiEntryPoint: string = null;

  constructor(private hypermediaClientService: HypermediaClientService ) {
    this.apiEntryPoint = 'http://localhost:5000/EntryPoint';

    this.urlFormControl = new FormControl('', [
      Validators.required,
      Validators.pattern(this.URL_REGEX)
    ]);
  }

  ngOnInit() {
  }

  navigate() {
    this.hypermediaClientService.InitNavPaths([this.apiEntryPoint]);
    this.hypermediaClientService.NavigateToCurrentNavPath();
  }

}
