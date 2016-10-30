/* tslint:disable:no-unused-variable */
import { AppComponent } from './app.component';
import { AppModule }              from './app.module';
import { AppRoutingModule } from './app-routing.module';
import { SearchComponent }      from './search/search.component';
import { ResultComponent }  from './result/result.component';
import { GithubService } from './github/github.service';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';
import { SpyLocation }         from '@angular/common/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { click, newEvent }               from '../testing';

import * as r                         from  '@angular/router';
import { Router, RouterLinkWithHref } from '@angular/router';

import {
  HttpModule, Http, XHRBackend, Response, ResponseOptions
} from '@angular/http';


import { By }                 from '@angular/platform-browser';
import { DebugElement, Type } from '@angular/core';
import { Location }           from '@angular/common';

let comp:     AppComponent;
let fixture:  ComponentFixture<AppComponent>;
let page:     Page;
let router:   Router;
let location: SpyLocation;

describe('AppComponent & RouterTestingModule', () => {

  beforeEach( async(() => {
    TestBed.configureTestingModule({
      imports: [ AppModule, RouterTestingModule ],
      providers: [
        GithubService,
        { provide: XHRBackend, useClass: MockBackend }
      ]
    })
    .compileComponents();
  }));

  it('should navigate to "Search" immediately', fakeAsync(() => {
    createComponent();
    expect(location.path()).toEqual('/search', 'after initialNavigation()');
    expectElementOf(SearchComponent);
  }));

  it('should navigate to "Result" on click without params', fakeAsync(() => {
    createComponent();
    click(page.button);

    advance();
    expect(location.path()).toEqual('/result?name=undefined&owner=undefined', 'after initialNavigation()');
    expectElementOf(ResultComponent);

    page.expectEvents([
      [r.NavigationStart, '/result?name=undefined&owner=undefined'], [r.RoutesRecognized, '/result?name=undefined&owner=undefined'],
      [r.NavigationEnd, '/result?name=undefined&owner=undefined']
    ]);
  }));

  it('should navigate to "Result" on click with params', fakeAsync(() => {
    createComponent();
    page.name['value'] = "react";
    page.name.dispatchEvent(newEvent('input'));
    fixture.detectChanges();
    page.owner['value'] = "facebook";
    page.owner.dispatchEvent(newEvent('input'));
    fixture.detectChanges();
    click(page.button);

    advance();
    expect(location.path()).toEqual('/result?name=react&owner=facebook', 'after initialNavigation()');
    expectElementOf(ResultComponent);

    page.expectEvents([
      [r.NavigationStart, '/result?name=react&owner=facebook'], [r.RoutesRecognized, '/result?name=react&owner=facebook'],
      [r.NavigationEnd, '/result?name=react&owner=facebook']
    ]);
  }));

  it('should navigate to "Result" w/ browser location URL change', fakeAsync(() => {
    createComponent();
    location.simulateHashChange('/result');
    advance();
    expectPathToBe('/result');
    expectElementOf(ResultComponent);
  }));
});


/** Wait a tick, then detect changes */
function advance(): void {
  tick();
  fixture.detectChanges();
}

function createComponent() {
  fixture = TestBed.createComponent(AppComponent);
  comp = fixture.componentInstance;

  const injector = fixture.debugElement.injector;
  location = injector.get(Location);
  router = injector.get(Router);
  router.initialNavigation();

  advance();

  page = new Page();
}

class Page {
  name:       any; //unfortunately I should use this type cause there 2 issues about unknown property dispatchevent for debugelement
  owner:      any;
  button:     DebugElement;
  recordedEvents:  any[]  =  [];

  // for debugging
  comp: AppComponent;
  location: SpyLocation;
  router: Router;
  fixture: ComponentFixture<AppComponent>;

  expectEvents(pairs: any[]) {
    const events = this.recordedEvents;
    expect(events.length).toEqual(pairs.length, 'actual/expected events length mismatch');
    for (let i = 0; i < events.length; ++i) {
      expect((<any>events[i].constructor).name).toBe(pairs[i][0].name, 'unexpected event name');
      expect((<any>events[i]).url).toBe(pairs[i][1], 'unexpected event url');
    }
  }

  constructor() {
    router.events.forEach(e => this.recordedEvents.push(e));
    this.button = fixture.debugElement.queryAll(By.css('button'))[0];
    this.name = fixture.debugElement.queryAll(By.css('input'))[0].nativeElement;
    this.owner = fixture.debugElement.queryAll(By.css('input'))[1].nativeElement;
    // for debugging
    this.comp    = comp;
    this.fixture = fixture;
    this.router  = router;
  }
}

function expectPathToBe(path: string, expectationFailOutput?: any) {
  expect(location.path()).toEqual(path, expectationFailOutput || 'location.path()');
}

function expectElementOf(type: Type<any>): any {
  const el = fixture.debugElement.query(By.directive(type));
  expect(el).toBeTruthy('expected an element for ' + type.name);
  return el;
}