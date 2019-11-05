import { Observable } from 'rxjs';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';

/** Interceptor for authentication token in API requests */
export class AuthInterceptor implements HttpInterceptor {
    /** API base path*/
    public SERVER_API_URL = '/api';
    public TEST_SERVER_API_URL = 'http://localhost:8080/api';
    /** constructor*/
    constructor(
    ) {
    }
    
    /** request handler */
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!request || !request.url || !(request.url.includes("api")) ) {
            return next.handle(request);
        }
        const token = sessionStorage.getItem('authenticationToken');
        if (!!token) {
            request = request.clone({
                setHeaders: {
                    Authorization: 'Bearer ' + token
                }
            });
        }
        return next.handle(request);
    }

}
