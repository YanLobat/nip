import {
   async, inject, TestBed
} from '@angular/core/testing';

import {
  MockBackend,
  MockConnection
} from '@angular/http/testing';

import {
  HttpModule, Http, XHRBackend, Response, ResponseOptions
} from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/toPromise';

import { GithubService } from './github.service';


////////  Tests  /////////////
describe('GithubService (mockBackend)', () => {

  beforeEach( async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpModule ],
      providers: [
        GithubService,
        { provide: XHRBackend, useClass: MockBackend }
      ]
    })
    .compileComponents();
  }));

  it('can instantiate service when inject service',
    inject([GithubService], (service: GithubService) => {
      expect(service instanceof GithubService).toBe(true);
  }));



  it('can instantiate service with "new"', inject([Http], (http: Http) => {
    expect(http).not.toBeNull('http should be provided');
    let service = new GithubService(http);
    expect(service instanceof GithubService).toBe(true, 'new service should be ok');
  }));


  it('can provide the mockBackend as XHRBackend',
    inject([XHRBackend], (backend: MockBackend) => {
      expect(backend).not.toBeNull('backend should be provided');
  }));

  describe('when get from api', () => {
      let backend: MockBackend;
      let service: GithubService;
      let response: Response;

      beforeEach(inject([Http, XHRBackend], (http: Http, be: MockBackend) => {
        backend = be;
        service = new GithubService(http);
      }));
      //i could fake response from github but it will be huge even for just one contributor hope you understand that it is not hard but extra garbish :)
      it('should have expected fields but there is no data', async(inject([], () => {
        let resp = new Response(new ResponseOptions({status: 200, body: {repo: {}, contributors: []}}));
        backend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));
        service.get('react','facebook')
        .then(result => {
          expect(result.length).toEqual(resp['length']);
          expect(result.repo).not.toEqual(undefined);
          expect(result.contributors).not.toEqual(undefined);
        });
      })));
  });
});

