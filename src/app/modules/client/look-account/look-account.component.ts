import { Component, OnInit, Injector } from '@angular/core';
import { AccountLookingResult, AccountRelationShipType } from './look-account.dto';
import { ActivatedRoute } from '@angular/router';
import { LookAccountHttpService } from './look-account.http.service';
import { ClientCommonComponent } from '../client.common-component';
import { LookAccountLanguage } from './look-account.language';
import { LookAccountOptionsDropdownComponent } from './look-account-options-dropdown/look-account-options-dropdown.component';
import { CssConfigs } from 'src/environments/environment';
import { LookAccountFriendedOptionsDropdownComponent } from './look-account-friended-options-dropdown/look-account-friended-options-dropdown.component';
import { finalize } from 'rxjs/operators';

@Component({
	selector: 'app-look-account',
	templateUrl: './look-account.component.html',
	styleUrls: ['./look-account.component.css']
})
export class LookAccountComponent extends ClientCommonComponent implements OnInit {
	lookingAccount: AccountLookingResult;
	accountRelationShipType = AccountRelationShipType;


	constructor(
		protected injector: Injector,
		private lookAccountHttpService: LookAccountHttpService
	) {
		super(injector);
		LookAccountLanguage.define(this.translateService);

		this.initAutoLook();
	}

	ngOnInit() {
	}

	initAutoLook() {
		this.route.params.subscribe(param => {
			this.look(Number(param.id));
		});
	}

	sendFriendRequest() {
		this.lookingAccount.isRequesting = true;
		this.lookAccountHttpService.sendFriendRequest(this.lookingAccount.id)
			.pipe(finalize(() => {
				this.lookingAccount.isRequesting = false;
			})).subscribe(result => {
				if (result) {
					this.lookingAccount.relationship = this.accountRelationShipType.FRIEND_REQUEST;
				}
			});
	}

	acceptFriendRequest() {
		this.lookingAccount.isRequesting = true;
		this.lookAccountHttpService.acceptFriendRequest(this.lookingAccount.id)
			.pipe(finalize(() => {
				this.lookingAccount.isRequesting = false;
			})).subscribe(result => {
				if (result) {
					this.lookingAccount.relationship = this.accountRelationShipType.FRIEND;
					this.clientDataService.reloadFriends();
				}
			});
	}

	cancelFriendRequest() {
		this.lookingAccount.isRequesting = true;
		this.lookAccountHttpService.cancelFriendRequest(this.lookingAccount.id)
			.pipe(finalize(() => {
				this.lookingAccount.isRequesting = false;
			})).subscribe(result => {
				if (result) {
					this.lookingAccount.relationship = this.accountRelationShipType.STRANGER;
				}
			});
	}

	unsendFriendRequest() {
		this.lookingAccount.isRequesting = true;
		this.lookAccountHttpService.unsendFriendRequest(this.lookingAccount.id)
			.pipe(finalize(() => {
				this.lookingAccount.isRequesting = false;
			})).subscribe(result => {
				if (result) {
					this.lookingAccount.relationship = this.accountRelationShipType.STRANGER;
				}
			});
	}

	showLookAccountOptionsDropdown(event) {
		this.dialogService.putDialogComponentToComponentWithOptions({
			dialogType: LookAccountOptionsDropdownComponent,
			anchorElement: event.target,
			anchorTo: "right",
			destroyIfOutFocus: true,
			zIndex: CssConfigs.dropdownMenuZIndex,
			popupOptions: {
				classList: 'py-4 px-3 bg6',
				useExitBtn: false
			}
		});
	}

	showLookAccountFriendedOptionsDropdown(event) {
		this.dialogService.putDialogComponentToComponentWithOptions({
			dialogType: LookAccountFriendedOptionsDropdownComponent,
			anchorElement: event.target,
			anchorTo: "right",
			destroyIfOutFocus: true,
			zIndex: CssConfigs.dropdownMenuZIndex,
			popupOptions: {
				classList: 'py-4 px-3 bg6',
				useExitBtn: false
			}
		});
	}

	look(id: number) {
		this.lookAccountHttpService.look(id).subscribe(lookedAccount => {
			this.lookingAccount = lookedAccount;
			console.log(lookedAccount);
		});
	}
}
