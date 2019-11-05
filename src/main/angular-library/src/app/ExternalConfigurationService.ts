import { ExternalConfiguration , ExternalConfigurationHandlerInterface } from 'angular-hal';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

/** REST API access configuration service*/
@Injectable()
export class ExternalConfigurationService implements ExternalConfigurationHandlerInterface {
  /** deperecated*/
  deserialize() {
    throw new Error('Method not implemented.');
  }
  
  /** deperecated*/
  serialize() {
    throw new Error('Method not implemented.');
  }

  /** get proxy uri*/
  getProxyUri(): string {
    return "/api/";
  }

  /** get REST API root uri*/
  getRootUri(): string {
    return "/api/";
  }

  /** get HttpClient*/
  getHttp(): HttpClient {
    return this.http;
  }

  /** Constructor*/
  constructor(private http: HttpClient) {
  }

  /**deprecated*/
  getExternalConfiguration(): ExternalConfiguration {
    return null;
  }

  /**deprecated*/
  setExternalConfiguration(externalConfiguration: ExternalConfiguration) {
  }
}