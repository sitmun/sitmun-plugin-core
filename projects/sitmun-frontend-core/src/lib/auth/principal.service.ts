import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { AccountService } from '../account/account.service';

/** Principal service*/
@Injectable()
export class Principal {
    private userIdentity: any;
    private authenticated = false;
    private authenticationState = new Subject<any>();

    /** constructor */
    constructor(
        private account: AccountService
    ) {}

    /** authenticate with given identity*/
    authenticate(identity) {
        this.userIdentity = identity;
        this.authenticated = identity !== null;
        this.authenticationState.next(this.userIdentity);
    }

    /** check whether current user has any of the given authorities */
    hasAnyAuthority(authorities: string[]): Promise<boolean> {
        return Promise.resolve(this.hasAnyAuthorityDirect(authorities));
    }

    /** check whether current user has any of the given authorities on the given territory */
    hasAnyAuthorityOnTerritory(authorities: string[],territory: string ): Promise<boolean> {
        return Promise.resolve(this.hasAnyAuthorityDirectOnTerritory(authorities,territory));
    }

    /** check whether current user has any of the given authorities without resolving promises*/
    hasAnyAuthorityDirect(authorities: string[]): boolean {
        if (!this.authenticated || !this.userIdentity || !this.userIdentity.authorities) {
            return false;
        }

        for (let i = 0; i < authorities.length; i++) {
            if (this.userIdentity.authorities.includes(authorities[i])) {
                return true;
            }
        }

        return false;
    }

    /** check whether current user has any of the given authorities on the given territory without resolving promises */
    hasAnyAuthorityDirectOnTerritory(authorities: string[],territory: string): boolean {
        if (!this.authenticated || !this.userIdentity || !this.userIdentity.authorities) {
            return false;
        }

        for (let i = 0; i < authorities.length; i++) {

            if (this.userIdentity.authoritiesPerTerritory[territory] && this.userIdentity.authoritiesPerTerritory[territory].includes(authorities[i])) {
                return true;
            }
        }

        return false;
    }

    /** check whether current user has the given authority */
    hasAuthority(authority: string): Promise<boolean> {
        if (!this.authenticated) {
           return Promise.resolve(false);
        }

        return this.identity().then((id) => {
            return Promise.resolve(id.authorities && id.authorities.includes(authority));
        }, () => {
            return Promise.resolve(false);
        });
    }

    /** check whether current user has the given authority on the given territory*/
    hasAuthorityOnTerritory(authority: string,territory: string): Promise<boolean> {
        if (!this.authenticated) {
           return Promise.resolve(false);
        }

        return this.identity().then((id) => {
            return Promise.resolve(id.authoritiesPerTerritory && id.authoritiesPerTerritory[territory] && id.authoritiesPerTerritory[territory].includes(authority));
        }, () => {
            return Promise.resolve(false);
        });
    }

    /** check user identity*/
    identity(force?: boolean): Promise<any> {
        if (force === true) {
            this.userIdentity = undefined;
        }

        // check and see if we have retrieved the userIdentity data from the server.
        // if we have, reuse it by immediately resolving
        if (this.userIdentity) {
            return Promise.resolve(this.userIdentity);
        }

        // retrieve the userIdentity data from the server, update the identity object, and then resolve.
        return this.account.get().toPromise().then((response) => {
            const account = response;
            if (account) {
                this.userIdentity = account;
                this.authenticated = true;
            } else {
                this.userIdentity = null;
                this.authenticated = false;
            }
            this.authenticationState.next(this.userIdentity);
            return this.userIdentity;
        }).catch((err) => {
            this.userIdentity = null;
            this.authenticated = false;
            this.authenticationState.next(this.userIdentity);
            return null;
        });
    }

    /** check whether current user is authenticated */
    isAuthenticated(): boolean {
        return this.authenticated;
    }

    /** check whether current user identity is resolved */
    isIdentityResolved(): boolean {
        return this.userIdentity !== undefined;
    }

    /** get current user authentication state */
    getAuthenticationState(): Observable<any> {
        return this.authenticationState.asObservable();
    }


}
