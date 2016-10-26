import { Component } from '@angular/core';
import { Router }            from '@angular/router';

import { GithubService } from './github.service';

@Component({
  moduleId: module.id,
  selector: 'result',
  templateUrl: 'result.component.html',
})
export class ResultComponent {

  constructor(
    private router: Router
  ) {}



}

