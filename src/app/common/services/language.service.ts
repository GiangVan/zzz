import { Injectable } from "@angular/core";
import {
	HttpClient,
	HttpHeaders,
	HttpErrorResponse
} from "@angular/common/http";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { AlertService } from '../dialogs/alert/alert.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
	providedIn: "root"
})
export class LanguageService {
	private defaultLang: string = 'vi';
	private langTitle: string = 'lang';
	
	constructor(private cookie: CookieService) { }

	getCurrentLang(): string{
		const lang = this.cookie.get(this.langTitle);

		if(lang){
			return lang;
		} else {
			this.cookie.set(this.langTitle, this.defaultLang);
			return this.defaultLang;
		}
	}

	setCurrentLang(lang: string){
		this.cookie.set(this.langTitle, lang);
	}
}
