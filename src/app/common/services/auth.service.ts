import { Injectable } from "@angular/core";
import { Router } from '@angular/router';

@Injectable({
	providedIn: "root"
})
export class AuthService {
	private readonly tokenTitle: string = 'token';
	private readonly sessionToken: string = localStorage.getItem(this.tokenTitle);

	constructor(private router: Router) { }

	getTokenTitle(): string {
		return this.tokenTitle;
	}

	getSessionToken(): string | null {
		if (this.sessionToken && this.sessionToken != '') {
			return this.sessionToken;
		} else {
			window.location.href = "/component/login";
			return null;
		}
	}

	getAccountId(): number {
		if(this.sessionToken){
			return parseInt(this.parseJwt(this.sessionToken).id);
		} else {
			window.location.href = "/component/login";
			return null;
		}
	}

	setSessionToken(token: string) {
		localStorage.setItem(this.tokenTitle, token);
	}

	removeSessionToken() {
		localStorage.removeItem(this.tokenTitle);
	}

	protected parseJwt(token) {
		var base64Url = token.split('.')[1];
		var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
		var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
			return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
		}).join(''));

		return JSON.parse(jsonPayload);
	};
}
