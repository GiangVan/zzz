import { Injectable } from "@angular/core";
import {
	HttpClient,
	HttpHeaders,
	HttpErrorResponse
} from "@angular/common/http";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { AlertService } from '../dialogs/alert/alert.service';

@Injectable({
	providedIn: "root"
})
export class GraphqlService {
	constructor(private http: HttpClient, private alertService: AlertService) { }

	query(
		requestInfo: {
			url: string;
			query: string;
			headers?:
			| string
			| {
				[name: string]: string | string[];
			};
		},
		callback: (data: any) => void
	) {
		const data = JSON.stringify({
			operationName: null,
			variables: {},
			query: `{${requestInfo.query}}`
		});

		this.http
			.post(requestInfo.url, data, {
				headers: this.generateHeaders(requestInfo.headers)
			})
			.pipe(
				catchError((error: HttpErrorResponse) => {
					callback(null);
					this.alertError(error);
					return throwError(error);
				})
			)
			.subscribe((res: any) => {
				let result = null;

				if (res && res.data) {
					result = res.data;
				} else {
					this.alertError(res);
				}

				callback(result);
			});
	}

	protected generateHeaders(
		headers?:
			| string
			| {
				[name: string]: string | string[];
			}
	): HttpHeaders {
		if (headers) {
			return new HttpHeaders(headers).append(
				"content-type",
				"application/json"
			);
		} else {
			return new HttpHeaders("content-type: application/json");
		}
	}

	protected alertError(error: any) {
		console.log(error)
		this.alertService.show(error.toString());
	}
}
