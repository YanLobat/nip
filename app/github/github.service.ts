import { Injectable }    from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class GithubService {
  private token: string = 'YOUR_TOKEN_HERE';
  private headers: Headers = new Headers({'Content-Type': 'application/json'});
  private gitUrl: string = 'https://api.github.com/';  // URL to web api
  private getUrl: string;

  constructor(private http: Http) { 
  	this.http = http;
  }

  private createAuthorizationHeader(headers:Headers) {
    headers.append('Authorization', 'token ' + this.token); 
  }

  public get(name: string, owner: string): Promise<any> {
  	this.getUrl = this.gitUrl + 'repos/' + owner + '/' + name;
  	let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http
  		.get(this.getUrl, {headers: headers})
  		.toPromise()
  		.then(res => {
        //needs for tests cause github api return stringified JSON and tests can mock JSON only responses
        if (typeof res['_body'] === 'string') {
          return JSON.parse(res['_body']);
        }
        else {
          return res['_body'];
        }
      })
		  .then(response => {
				return this.http
					.get(this.getUrl + '/contributors', { headers: headers })
					.toPromise()
					.then(result => {
            let contributors: Array<Object>
             //needs for tests cause github api return stringified JSON and tests can mock JSON only responses
            if (typeof result['_body'] === 'string') {
						 contributors  = JSON.parse(result['_body']);
            }
            else {
              contributors = result['_body'];
            }
						let array: Array<Object> = [];
					    for (let element of contributors) {
					      	array.push(element);
					    }
					    let finalObject: Object = {
							repo: response,
							contributors: array
						};
						return finalObject;
					});
			})
      .catch(this.handleError);
  }
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}


