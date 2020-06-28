import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, ViewContainerRef, AfterViewChecked, Injector } from "@angular/core";
import { ClientLanguage } from './client.language';
import { ClientCommonComponent } from './client.common-component';
import { ProfileDropdownComponent } from './profile-dropdown/profile-dropdown.component';
import { CssConfigs } from 'src/environments/environment';

@Component({
	selector: "client-root",
	templateUrl: "./client.component.html",
	styleUrls: ["./client.component.css"]
})
export class ClientComponent extends ClientCommonComponent {
	// @ViewChild('profileDropdown', { static: true }) profileDropdownER: ElementRef;
	// @ViewChild('profileDropdown', { static: true, read: ViewContainerRef }) profileDropdownVR: ViewContainerRef;
	redirectLink: string;

	constructor(
		protected injector: Injector,
	) {
		super(injector);
		ClientLanguage.define(this.translateService);
	}

	checkExistUrl(url: string): boolean {
		const currentUrl = this.router.url;
		return currentUrl.length >= url.length && currentUrl.substring(0, url.length).toLocaleUpperCase() === url.toLocaleUpperCase();
	}

	redirectToGameChannel() {
		const gameChannelId = this.clientDataService.getCurrentGameChannelId(this.homeUrl);
		if(gameChannelId){
			this.router.navigateByUrl(this.gameChannelUrl + '/' + gameChannelId);
		}
	}

	showProfileDropdown(event) {
		this.dialogService.putDialogComponentToComponentWithOptions({
			dialogType: ProfileDropdownComponent,
			anchorElement: event.target,
			destroyIfOutFocus: true,
			anchorTo: 'right',
			popupOptions: {
				classList: 'py-4 px-3 bg6',
				useExitBtn: false
			},
			zIndex: CssConfigs.dropdownMenuZIndex
		});
	}
}
