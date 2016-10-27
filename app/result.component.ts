import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { GithubService } from './github.service';

@Component({
  moduleId: module.id,
  selector: 'result',
  templateUrl: 'result.component.html',
})
export class ResultComponent implements OnInit  {
  private result: any = {
  	repo: {},
  	contributors: []
  };

  constructor(
  	private githubService: GithubService,
    private activatedRoute: ActivatedRoute
  ) {
  	this.githubService = githubService;
  	this.activatedRoute = activatedRoute;
  }
  
  keys() : Array<string> {
    return Object.keys(this.result.contributors);
  }

  ngOnInit(): void {
  	let params: any = this.activatedRoute.queryParams['value'];
    this.githubService
    	.get(params.name, params.owner)
    	.then(result => {
    		this.result = result;
    		console.log(this.result.contributors);
    	})
  }

}

