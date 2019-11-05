import { Component,OnInit  } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {Principal,LoginService} from 'sitmun-plugin-core';

/** Demo app component*/
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  /** app title*/  
  title = 'app';
  /** app param*/
  param = {value:'world'};
  
  /** translate service*/
  translate;
  
  /** current logged in user account*/
  currentAccount : any;

  /** Component constructor*/
  constructor(/** Translate service */public trans: TranslateService, /** Identity service */public principal:Principal,/** Login service */public loginService:LoginService  ) {
  	this.translate = trans;
 	this.translate.addLangs(['es', 'ca']);
    this.translate.setDefaultLang('ca');

    //const browserLang = translate.getBrowserLang();
    //translate.use(browserLang.match(/es|ca/) ? browserLang : 'ca');
    this.translate.use('ca');
  }

  /** Change app language*/
  changeLanguage(locale: string ){
	this.translate.use(locale);
  }
    
  /** User log out*/  
  logout(){
    this.loginService.logout();
  }
    
  /** Whether user is logged in */
  isLoggedIn(){
    return this.principal.isAuthenticated();
  }
  
  /** On component init, get logged user account*/
  ngOnInit() {
      
      this.principal.identity().then((account) => {
                 this.currentAccount = account;
   });
  }   
  

}
