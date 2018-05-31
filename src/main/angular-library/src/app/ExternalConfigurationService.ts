import { ExternalConfiguration , ExternalConfigurationHandlerInterface } from 'angular-hal';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class ExternalConfigurationService implements ExternalConfigurationHandlerInterface {
  deserialize() {
    throw new Error('Method not implemented.');
  }
  serialize() {
    throw new Error('Method not implemented.');
  }

  getProxyUri(): string {
    return "http://localhost:8080/api/";
  }

  getRootUri(): string {
    return "http://localhost:8080/api/";
  }

  getHttp(): HttpClient {
    return this.http;
  }

  constructor(private http: HttpClient) {
  }

  getExternalConfiguration(): ExternalConfiguration {
    return null;
  }

  setExternalConfiguration(externalConfiguration: ExternalConfiguration) {
  }
}