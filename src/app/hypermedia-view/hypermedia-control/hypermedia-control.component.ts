import { Component, OnInit } from '@angular/core';
import { HypermediaClientService } from '../hypermedia-client.service';
import { SirenClientObject } from '../siren-parser/siren-client-object';

// todo for query pagination use a drop down button containing all with smae url but different query string
// todo make breadcrum component
@Component({
  selector: 'app-hypermedia-control',
  templateUrl: './hypermedia-control.component.html',
  styleUrls: ['./hypermedia-control.component.scss']
})
export class HypermediaControlComponent implements OnInit {
  public rawResponse: object;
  public hto: SirenClientObject;
  public navPaths: string[];

  constructor(private hypermediaClient: HypermediaClientService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.hypermediaClient.getHypermediaObjectStream().subscribe((hto) => {
      this.hto = hto;
    });

    this.hypermediaClient.getHypermediaObjectRawStream().subscribe((rawResponse) => {
      this.rawResponse = rawResponse;
    });

    this.hypermediaClient.getNavPathsStream().subscribe((navPaths) => {
      this.navPaths = navPaths;
    });

    const urlNavPaths: Array<string> = this.GetNavPathsFromQueryString();
    this.hypermediaClient.InitNavPaths(urlNavPaths);
    this.hypermediaClient.NavigateToCurrentNavPath();

    // todo use rel of hypermedia links to name breadcrums buttons
    // todo fix example.com navigation: detect html page content -> open new tab
  }

  private GetNavPathsFromQueryString(): Array<string> {
    let urlNavPaths: any;

    this.route.queryParams.subscribe(params => {
      urlNavPaths = params['navPaths'];
    });

    if (!urlNavPaths) {
      this.router.navigate(['']);
    }

    if (!Array.isArray(urlNavPaths)) {
      urlNavPaths = [urlNavPaths];
    }

    return urlNavPaths;
  }

  public getUrlShortName(url: string): string {
    const index = url.lastIndexOf('/');
    if (index === -1) {
      return url;
    }

    const lastSegment = url.substr(index + 1);
    const queryStartIndex = lastSegment.indexOf('?');

    let shortName: string;
    if (queryStartIndex !== -1) {
      shortName = lastSegment.substring(0, queryStartIndex);
    } else {
      shortName = lastSegment;
    }

    return shortName;
  }

  public navigateLink(url: string) {
    this.hypermediaClient.Navigate(url);
  }

  public navigateMainPage() {
    this.hypermediaClient.navigateToMainPage();
  }
}
