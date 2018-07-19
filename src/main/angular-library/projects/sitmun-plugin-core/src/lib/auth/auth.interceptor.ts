import { Observable } from 'rxjs';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';

export class AuthInterceptor implements HttpInterceptor {
    public SERVER_API_URL = '/api';
    public TEST_SERVER_API_URL = 'http://localhost:8080/api';
    constructor(
    ) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        /*
        if (!request || !request.url || (/^http/.test(request.url) && !(this.SERVER_API_URL && request.url.startsWith(this.SERVER_API_URL))
            && !(this.TEST_SERVER_API_URL && request.url.startsWith(this.TEST_SERVER_API_URL)))) {
            return next.handle(request);
        }
*/
         
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
