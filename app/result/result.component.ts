import { Component, OnInit } from '@angular/core';
import {  ActivatedRoute } from '@angular/router';

import { FilterComponent } from '../filter/filter.component';
import { GithubService } from '../github/github.service';

@Component({
  moduleId: module.id,
  selector: 'result',
  templateUrl: 'result.component.html',
  styleUrls: [ 'result.component.css' ]
})
export class ResultComponent implements OnInit  {
  private result: Object = {
  	repo: {},
  	contributors: []
  };
  private filteredContributors: Array<Object>;
  private count: number;


  constructor(
  	private githubService: GithubService,
    private activatedRoute: ActivatedRoute
  ) {
  	this.githubService = githubService;
  	this.activatedRoute = activatedRoute;
    this.filteredContributors = [];
  }
  
  keys() : Array<string> {
    return Object.keys(this.filteredContributors);
  }

  filter(count: number) : void {
      this.filteredContributors = this.result['contributors'].filter((item: Object) => {
        return item['contributions'] >= count;
      });
  }

  filterContributors(count: number): void {
    this.count = count;
    this.filter(this.count);
  }
  
  ngOnInit(): void {
  	let params: any = this.activatedRoute.queryParams['value'];
    this.githubService
    	.get(params.name, params.owner)
    	.then(result => {
    		this.result = result;
        this.filteredContributors = this.result['contributors'];
        return this.filteredContributors;
    	})
      .catch(err => {
        console.error(err);
      });
  }  
  
}

