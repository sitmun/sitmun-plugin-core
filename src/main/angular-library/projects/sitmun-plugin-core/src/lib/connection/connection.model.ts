import {Resource} from 'angular-hal';  
export class Connection extends Resource {

  public name: string;
  public type: string;
  public user: string;
  public password: string;
  public connectionString: string;

}
