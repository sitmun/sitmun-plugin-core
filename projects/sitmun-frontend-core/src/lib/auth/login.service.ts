import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Principal } from './principal.service';

/** Login service*/
@Injectable()
export class LoginService {
    
    /** constructor */
    constructor(
        private authServerProvider: AuthService, 
        private principal: Principal
    ) {}

    /**Login operation*/
    login(credentials, callback?) {
        const cb = callback || function() {};

        return new Promise((resolve, reject) => {
            this.authServerProvider.login(credentials).subscribe((data) => {
                this.principal.identity(true).then((account) => {
                    // After the login the language will be changed to
                    // the language selected by the user during his registration
                    resolve(data);
                });
                
                
                return cb();
            }, (err) => {
                this.logout();
                reject(err);
                return cb(err);
            });
        });
    }
    /**login with jwt token */
    loginWithToken(jwt) {
        return this.authServerProvider.loginWithToken(jwt);
    }

    /** logout operation */
    logout() {
       this.authServerProvider.logout().subscribe();
       this.principal.authenticate(null);
    }
}
