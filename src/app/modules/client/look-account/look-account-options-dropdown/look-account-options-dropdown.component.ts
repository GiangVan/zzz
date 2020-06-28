import { Component, OnInit, Input, Injector } from '@angular/core';
import { ClientCommonComponent } from '../../client.common-component';
import { LookAccountOptionsDropdownLanguage } from './look-account-options-dropdown.language';

@Component({
	selector: 'app-look-account-options-dropdown',
	templateUrl: './look-account-options-dropdown.component.html'
}) 

export class LookAccountOptionsDropdownComponent extends ClientCommonComponent implements OnInit {
	destroy: () => void;

	constructor(
		protected injector: Injector,
	) {
		super(injector);
		const data = injector.get('data');
		this.destroy = injector.get('destroy');
		LookAccountOptionsDropdownLanguage.define(this.translateService);
	}

	ngOnInit() {
	}

	
}
