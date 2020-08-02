import { LoginService } from './../home/login/service/login.service';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private router: Router, private authenticationService: LoginService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        let currentUser = this.authenticationService.currentUserValue;
        console.log(`url: ${this.router.url}`);
        if (currentUser) {
            console.log("inter3");
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${currentUser}`
                }
            });
        }

        return next.handle(request);
    }
}