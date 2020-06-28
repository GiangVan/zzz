import { TranslateService } from '@ngx-translate/core';
import { Injector, ViewContainerRef, ElementRef } from '@angular/core';
import { AlertService } from 'src/app/common/dialogs/alert/alert.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/common/services/auth.service';
import { DialogService } from 'src/app/common/dialogs/dialog.service';
import { ClientDataService } from './client.data.service';

export class ClientCommonComponent {
	readonly translateService: TranslateService;
	readonly clientDataService: ClientDataService;
	readonly alertService: AlertService;
	readonly dialogService: DialogService;
	readonly authService: AuthService;
	readonly router: Router;
	readonly route: ActivatedRoute;
	readonly currentAccountId: number;
	readonly lookAccountUrl: string = '/look';
	readonly homeUrl: string = '/home';
	readonly settingsUrl: string = '/settings';
	readonly profileUrl: string = '/profile';
	readonly gameChannelUrl: string = '/game-channel';
	readonly defaultAvatarUrl: string = 'https://cdn.image4.io/mattstacey/f_auto/57882dae-888d-4c43-9dc5-924ae05b332c.png';
	readonly defaultCoverUrl: string = 'https://cdn.image4.io/mattstacey/f_auto/cover/9df0a69a-209d-468f-8171-51c8417eabe0.png';

	constructor(injector: Injector) {
		this
		this.translateService = injector.get(TranslateService);
		this.clientDataService = injector.get(ClientDataService);
		this.alertService = injector.get(AlertService);
		this.route = injector.get(ActivatedRoute);
		this.router = injector.get(Router);
		this.authService = injector.get(AuthService);
		this.dialogService = injector.get(DialogService);
		this.currentAccountId = this.authService.getAccountId();
	}

	hideClickedELement(event) {
		event.target.style.display = 'none';
	}
}
