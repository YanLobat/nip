import { Injectable }    from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class GithubService {
  private token: string = '74b4b2d0148985a18875eaafba07a29bf9ade190';
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
    			let response: object = res._body;
				return JSON.parse(response);
			})
			.then(response => {
				return this.http
					.get(this.getUrl + '/contributors', { headers: headers })
					.toPromise()
					.then(result => {
						let contributors: object = JSON.parse(result._body);
						let array: array = [];
					    for (let element of contributors) {
					      	array.push(element);
					    }
					    let finalObject: object = {
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


