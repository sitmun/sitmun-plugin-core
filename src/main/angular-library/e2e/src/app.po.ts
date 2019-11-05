import { browser, by, element } from 'protractor';

/** Demo app page*/
export class AppPage {
  
  /** Navigate to root page*/
  navigateTo() {
    return browser.get('/');
  }

  /** Get paragraph text*/
  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }
}
