import { Injector, Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
//import 'rxjs/add/operator/do';
import { AuthService } from './auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Principal } from './principal.service';

@Injectable()
export class AuthExpiredInterceptor implements HttpInterceptor {

    constructor(
        private router: Router,     
        private authService: AuthService, 
        private principal: Principal
    ) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).do((event: HttpEvent<any>) => {}, (err: any) => {
            if (err instanceof HttpErrorResponse) {
                if (err.status === 401) {                    
                    this.authService.logout().subscribe();
                    this.principal.authenticate(null);
                    this.router.navigate(['/']);
                }
            }
        });
    }
}
