import { LoginService } from './../home/login/service/login.service';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authenticationService: LoginService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            console.log("ErrorInterceptor " + JSON.parse(err).error);
            if (err.status === 401) {
                // auto logout if 401 response returned from api
                console.log("ErrorInterceptor")
                this.authenticationService.logout();
                // location.reload(true);
            }

            const error = err.error.message || err.statusText;
            return throwError(error);
        }))
    }
}