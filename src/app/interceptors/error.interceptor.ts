import { Injectable } from '@angular/core';
import {
	HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { LoaderService } from '../common/dialogs/loader/loader.service';
import { tap, finalize, retry } from 'rxjs/operators';
import { AlertService } from '../common/dialogs/alert/alert.service';
import { DebugConfigs, environment } from 'src/environments/environment';
import { DialogService } from '../common/dialogs/dialog.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
	constructor(private alretService: AlertService) { }

	protected alertError(message: string, callback: () => Observable<HttpEvent<any>>) {
		if (DebugConfigs.isAlert) {
			this.alretService.show(message, 'Retry', () => {
				// callback().subscribe(() => {
				// 	this.alertError(message, callback);
				// });
				document.body.innerHTML = '';
				window.location.reload();
			});
		}
	}

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		return next.handle(req).pipe(
			tap(
				event => {
					if (event instanceof HttpResponse && event.body.hasOwnProperty('errors')) {
						const errors = event.body.errors;
						let messages = '';

						errors.forEach(error => {
							messages += error.message + '\n';
						});
						this.alertError(messages, () => next.handle(req));
					}
				},
				error => {
					if (error.hasOwnProperty('error')) {
						if (error.error.hasOwnProperty('errors')) {
							if (error.error.errors[0] && error.error.errors[0].hasOwnProperty('message')) {
								const errors = error.error.errors;
								let messages = '';

								errors.forEach(error => {
									messages += error.message + '\n';
								});
								this.alertError(messages, () => next.handle(req));
							} else {
								this.alertError(JSON.stringify(error.error.errors), () => next.handle(req));
							}
						} else if (error.error.hasOwnProperty('message')) {
							this.alertError(error.error.message, () => next.handle(req));
						} else {
							if (error.error.isTrusted) {
								this.alertError('Rớt mạng rồi :((', () => next.handle(req));
							} else {
								this.alertError(JSON.stringify(error.error), () => next.handle(req));
							}
						}
					} else if (error.hasOwnProperty('errors')) {
						if (error.errors[0] && error.errors[0].hasOwnProperty('message')) {
							const errors = error.errors;
							let messages = '';

							errors.forEach(error => {
								messages += error.message + '\n';
							});
							this.alertError(messages, () => next.handle(req));
						} else {
							this.alertError(JSON.stringify(error.errors), () => next.handle(req));
						}
					} else if (error.hasOwnProperty('message')) {
						this.alertError(error.message, () => next.handle(req));
					} else {
						this.alertError(JSON.stringify(error), () => next.handle(req));
					}
				}
			),
			retry(environment.requestRetryTime)
		);
	}
}