import { Component,OnInit  } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {Principal,LoginService} from 'sitmun-plugin-core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  param = {value:'world'};  
  translate;
  currentAccount : any;

  constructor(public trans: TranslateService, public principal:Principal,public loginService:LoginService  ) {
  	this.translate = trans;
 	this.translate.addLangs(['es', 'ca']);
    this.translate.setDefaultLang('ca');

    //const browserLang = translate.getBrowserLang();
    //translate.use(browserLang.match(/es|ca/) ? browserLang : 'ca');
    this.translate.use('ca');
  }

  changeLanguage(locale: string ){
	this.translate.use(locale);
  }
    
  logout(){
    this.loginService.logout();
  }
    
  isLoggedIn(){
    return this.principal.isAuthenticated();
  }
  
  ngOnInit() {
      
      this.principal.identity().then((account) => {
                 this.currentAccount = account;
   });
  }   
  

}
