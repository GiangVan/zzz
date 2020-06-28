import { Component, OnInit, Injector } from '@angular/core';
import { SwtAlert } from 'src/app/common/helpers/sweet_alert';
import { FriendsOptionsDropdownLanguage } from './friends-options-dropdown.language';
import { ClientCommonComponent } from '../../client.common-component';

@Component({
	selector: 'app-friends-options-dropdown',
	templateUrl: './friends-options-dropdown.component.html',
})
export class FriendsOptionsDropdownComponent extends ClientCommonComponent implements OnInit {
	reloadRooms: () => void;
	destroy: () => void;

	constructor(
		private injector: Injector,
	) {
		super(injector);
		FriendsOptionsDropdownLanguage.define(this.translateService);
		const data = this.injector.get('data');
		this.destroy = this.injector.get('destroy');
	}
	
	ngOnInit() {
		this.reloadRooms = () => this.clientDataService.reloadFriends();
	}
}
