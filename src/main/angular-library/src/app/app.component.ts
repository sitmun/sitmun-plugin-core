import { Component,OnInit  } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  param = {value:'world'};  
  translate;

  constructor(public trans: TranslateService ) {
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
  
  ngOnInit() {
  }

}
