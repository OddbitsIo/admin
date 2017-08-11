import { Component } from '@angular/core';
import { Http, Response, RequestOptionsArgs, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  private title: string = 'admin';
  private apiUrl: string = 'http://localhost:9000/organization/test123';

  constructor(private http : Http) {
  }

  clicked(event: Event) {
    console.log("button clicked");

    this.getOrganization()
      .subscribe((org) => {
        console.log("org fetched")
      });
  }

  getOrganization() : Observable<Organization>{
    var headers = new Headers();
    headers.append('Accept', 'application/json');
    
    var args : RequestOptionsArgs = {
      headers: headers
    };

    return this.http.get(this.apiUrl, args)
      .map((response: Response) => {
        let json = response.json();
        let org = new Organization();
        org.id = json.id;
        org.name = json.name;
        console.log(org);
        return org;
      });
  }

}

export class Organization {
  public id: string;
  public name : string;
  public taxId: string;
}
