import { Component, OnInit, Injector, ViewContainerRef, ComponentRef, AfterViewInit, ElementRef } from '@angular/core';
import { CssConfigs } from 'src/environments/environment';
import { ClientCommonComponent } from '../client.common-component';
import { ProfileDropdownLanguage } from './profile-dropdown.language';
import { LanguageService } from 'src/app/common/services/language.service';
import { FeedbackComponent } from '../feedback/feedback.component';

@Component({
	selector: 'app-profile-dropdown',
	templateUrl: './profile-dropdown.component.html'
})
export class ProfileDropdownComponent extends ClientCommonComponent {
	destroy: () => void;

	constructor(
		protected injector: Injector,
		protected languageService: LanguageService,
	) {
		super(injector);
		ProfileDropdownLanguage.define(this.translateService);
		this.destroy = injector.get('destroy');
	}

	showFeedback() {
		this.dialogService.putDialogComponentToComponentWithOptions({
			dialogType: FeedbackComponent,
			destroyIfOutFocus: true,
			useBackground: true,
			data: { 'accountId': this.currentAccountId },
			zIndex: CssConfigs.popupZIndex,
			popupOptions: {
				width: 500,
				height: 600,
			}
		});
	}

	changeLanguage() {
		if (this.translateService.getDefaultLang() === 'vi') {
			this.translateService.setDefaultLang('en');
		} else {
			this.translateService.setDefaultLang('vi');
		}
		this.languageService.setCurrentLang(this.translateService.getDefaultLang());
	}

	logOut() {
		this.authService.removeSessionToken();
		window.location.href = "/";
	}
}
