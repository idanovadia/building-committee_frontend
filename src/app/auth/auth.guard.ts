import { LoginService } from './../home/login/service/login.service';
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    private role: any;
    constructor(
        private router: Router,
        private authenticationService: LoginService
    ) { }

    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.authenticationService.currentUserValue;
        const auth = await this.authenticationService.authentication();
        if (currentUser != null  && auth.permission) {
            // logged in so return true
            this.role = auth.role;
            return true;
        }
        // not logged in so redirect to login page with the return url
        localStorage.removeItem('currentUserBCE');
        this.router.navigate(['/home'], { queryParams: { returnUrl: state.url } });
        return false;
    }

    getRole() {
        return this.role;
    }
}