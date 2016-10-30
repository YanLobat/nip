import { browser, element, by } from 'protractor';

describe('QuickStart E2E Tests', function () {

  let expectedMsg = 'NIP. Human Brain Project test task';


  beforeEach(function () {
    browser.get('');
  });

  it('should display: ' + expectedMsg, function () {
    expect(element(by.css('h1')).getText()).toEqual(expectedMsg);
  });

  it('should display: Sockets project', function () {
  	browser.get('/result?name=Canyoutouchme&owner=YanLobat');
    expect(element(by.css('h4')).getText()).toEqual('Sockets project');
  });

});
