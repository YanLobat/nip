/* tslint:disable:no-unused-variable */
import { AppComponent } from './app.component';

import { TestBed }      from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { By }           from '@angular/platform-browser';

////////  SPECS  /////////////

describe('AppComponent', function () {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [ RouterTestingModule ]
    });
  });

  it('should instantiate component', () => {
    let fixture = TestBed.createComponent(AppComponent);
    expect(fixture.componentInstance instanceof AppComponent).toBe(true, 'should create AppComponent');
  });

  it('should have expected <h1> text', () => {
    let fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();

    let h1 = fixture.debugElement.query(el => el.name === 'h1').nativeElement;  // it works

        h1 = fixture.debugElement.query(By.css('h1')).nativeElement;            // preferred

        expect(h1.innerText).toMatch('NIP. Human Brain Project test task');
  });
});
