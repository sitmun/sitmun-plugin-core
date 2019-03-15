import {Resource} from 'angular-hal';
import {Service} from '../service/service.model';
import {Connection} from '../connection/connection.model';
import {CartographyAvailability} from './cartography-availability.model';
export class Cartography extends Resource {

  public name: string;
  public type : string;

  public visible: Boolean;

  public transparency: Number;

  public queryable: Boolean;

  public queryAct: Boolean;

  public queryLay: string;

  public createdDate: any;

  public order: Number; 

  public minimumScale: Number;

  public maximumScale: Number;

  public layers: string;

  public service : Service;

  public connection: Connection;

  public availabilities : CartographyAvailability[];

  public selectable: Boolean;

  public selectionLayer: string;

  public selectionService: Service;

  public legendTip: string;

  public legendUrl: string;

  public editable: Boolean;

  public metadataUrl: string;

  public themeable: Boolean;

  public geometryType: string;
  

}
