import { Component } from '@angular/core';
import { Router, NavigationExtras }            from '@angular/router';

import { GithubService } from './github.service';

@Component({
  moduleId: module.id,
  selector: 'search',
  templateUrl: 'search.component.html',
})
export class SearchComponent {
  private name: String,
  private owner: String
  constructor(
    private router: Router,
  ) {}

  goToResult(): void {
  	let navigationExtras: NavigationExtras = {
      queryParams: { 'name': this.name, 'owner': this.owner}
    };
  	let link = ['/result'];
  	this.router.navigate(link, navigationExtras);
  }


}

