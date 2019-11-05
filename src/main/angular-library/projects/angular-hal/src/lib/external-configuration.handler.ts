import {ExternalConfiguration} from './ExternalConfiguration';
import {HttpClient} from '@angular/common/http';

/** Interface for ExternalConfigurationHandlers */
export interface ExternalConfigurationHandlerInterface {
    /** deprecated */
    deserialize();
    /** deprecated */
    serialize();
    
    /** get proxy URL */
    getProxyUri(): string;
    /** get proxy URI */
    getRootUri(): string;
    /** get HttpClient */
    getHttp(): HttpClient;

    /** get ExternalConfiguration */
    getExternalConfiguration(): ExternalConfiguration;
    
    /** set ExternalConfiguration */
    setExternalConfiguration(externalConfiguration: ExternalConfiguration);
}
