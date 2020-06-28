import { LoaderService } from 'src/app/common/dialogs/loader/loader.service';
import { Injector } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/common/services/auth.service';

export class ClientCommonService {
	protected readonly loaderService: LoaderService;
	protected readonly authService: AuthService;
	protected readonly apollo: Apollo;
	protected readonly http: HttpClient;

	protected outFocusHandler: (event) => void;

	constructor(injector: Injector) {
		this.loaderService = injector.get(LoaderService);
		this.apollo = injector.get(Apollo);
		this.http = injector.get(HttpClient);
		this.authService = injector.get(AuthService);
	}
}
