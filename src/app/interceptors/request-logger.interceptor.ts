import { Injectable } from '@angular/core';
import {
	HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpClient
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { LoaderService } from '../common/dialogs/loader/loader.service';
import { tap, finalize } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ifError } from 'assert';

@Injectable()
export class RequestLoggerInterceptor implements HttpInterceptor {
	constructor() { }

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		const startedTime: number = Date.now();
		const httpRequest: HttpRequest<any> = req;
		
		return next.handle(req).pipe(
			tap(
				event => {
					if (!environment.production) {
						console.log('\n\n\n');
						console.log(new Date(Date.now()).toLocaleString());
						console.log('%c HttpRequest: ', 'background: #222; color: #bada55');
						console.log(httpRequest);
						console.log('%c HttpResponse: ', 'background: #222; color: #bada55');
						console.log(event);
						console.log(`%c ----- request time: ${Date.now() - startedTime}ms.`, 'background: #222; color: #bada55');
						console.log('\n\n\n');
					}
				}
			)
		);
	}
}