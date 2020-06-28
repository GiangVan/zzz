import { Component, OnInit, Input, Injector } from '@angular/core';
import { ClientCommonComponent } from '../../client.common-component';
import { LookAccountFriendedOptionsDropdownLanguage } from './look-account-friended-options-dropdown.language';

@Component({
	selector: 'app-look-account-friended-dropdown',
	templateUrl: './look-account-friended-options-dropdown.component.html'
}) 

export class LookAccountFriendedOptionsDropdownComponent extends ClientCommonComponent implements OnInit {
	destroy: () => void;

	constructor(
		protected injector: Injector,
	) {
		super(injector);
		const data = injector.get('data');
		this.destroy = injector.get('destroy');
		LookAccountFriendedOptionsDropdownLanguage.define(this.translateService);
	}

	ngOnInit() {
	}

	
}
