import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable()
export class LoginService {

    constructor(
        private authServerProvider: AuthService 
    ) {}

    login(credentials, callback?) {
        const cb = callback || function() {};

        return new Promise((resolve, reject) => {
            this.authServerProvider.login(credentials).subscribe((data) => {
                resolve(data);
                
                return cb();
            }, (err) => {
                this.logout();
                reject(err);
                return cb(err);
            });
        });
    }

    loginWithToken(jwt) {
        return this.authServerProvider.loginWithToken(jwt);
    }

    logout() {
        this.authServerProvider.logout().subscribe();
    }
}
