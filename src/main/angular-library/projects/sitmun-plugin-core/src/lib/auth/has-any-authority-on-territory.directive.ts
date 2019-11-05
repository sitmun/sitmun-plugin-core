import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { Principal } from './principal.service';

/**
 * @whatItDoes Conditionally includes an HTML element if current user has any
 * of the authorities passed as the `expression`.
 *
 * @howToUse
 * ```
 *     <some-element *sitmunHasAnyAuthority="'ROLE_ADMIN'">...</some-element>
 *
 *     <some-element *sitmunHasAnyAuthority="['ROLE_ADMIN', 'ROLE_USER']">...</some-element>
 * ```
 */
@Directive({
    selector: '[sitmunHasAnyAuthorityOnTerritory]'
})
export class HasAnyAuthorityOnTerritoryDirective {

    /** authorities to check */
    public authorities: string[]; 

    /** territory to check authorities*/
    public territory: string; 

    /** constructor */
    constructor(private principal: Principal, private templateRef: TemplateRef<any>, private viewContainerRef: ViewContainerRef) {
    }
    
    /** Set whether current user has any of the given authorities on territory */
    @Input()
    set sitmunHasAnyAuthorityOnTerritory(opts: any) {

        this.authorities = typeof opts.authorities === 'string' ? [ <string> opts.authorities ] : <string[]> opts.authorities;
        this.territory = opts.territory;
        this.updateView();
        // Get notified each time authentication state changes.
        this.principal.getAuthenticationState().subscribe((identity) => this.updateView());
    }
    
    /** update view */
    private updateView(): void {
        if (this.territory){
        this.principal.hasAnyAuthorityOnTerritory(this.authorities,this.territory).then((result) => {
            this.viewContainerRef.clear();
            if (result) {
                this.viewContainerRef.createEmbeddedView(this.templateRef);
            }
        });

        } else {
        this.principal.hasAnyAuthority(this.authorities).then((result) => {
            this.viewContainerRef.clear();
            if (result) {
                this.viewContainerRef.createEmbeddedView(this.templateRef);
            }
        });
        }
    }
}
