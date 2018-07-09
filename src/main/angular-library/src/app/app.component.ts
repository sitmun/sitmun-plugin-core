import { Component,OnInit  } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {AuthService} from 'sitmun-plugin-core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  param = {value:'world'};  
  translate;

  constructor(public trans: TranslateService, public authService:AuthService ) {
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
    this.authService.logout().subscribe();
  }
    
  isLoggedIn(){
    return this.authService.isLoggedIn();
  }
  
  ngOnInit() {
  }

}
