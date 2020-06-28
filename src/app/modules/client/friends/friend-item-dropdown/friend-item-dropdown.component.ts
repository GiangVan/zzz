import { Component, OnInit, Input, Injector } from '@angular/core';
import { ClientCommonComponent } from '../../client.common-component';
import { FriendItemDropdownLanguage } from './friend-item-dropdown.language';
import { ActivatedRouteSnapshot } from '@angular/router';

@Component({
	selector: 'app-friend-item-dropdown',
	templateUrl: './friend-item-dropdown.component.html'
}) 

export class FriendItemDropdownComponent extends ClientCommonComponent implements OnInit {
	accountId: number;
	destroy: () => void;

	constructor(
		protected injector: Injector,
	) {
		super(injector);
		const data = injector.get('data');
		this.destroy = injector.get('destroy');
		FriendItemDropdownLanguage.define(this.translateService);

		this.accountId = data.accountId;
	}

	ngOnInit() {
	}

	
}
