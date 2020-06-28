import { Component, OnInit, Injector } from '@angular/core';
import { SettingsHttpService } from './settings.http.service';
import { Settings, AccountEditingResultStatus } from './settings.dto';
import { AccountPrivacyType } from 'src/app/common/constants/account';
import { AlertService } from 'src/app/common/dialogs/alert/alert.service';
import { ObjectHelper } from 'src/app/common/helpers/object';
import { ClientCommonComponent } from '../client.common-component';
import { SettingsLanguage } from './settings.language';

@Component({
	selector: 'app-settings',
	templateUrl: './settings.component.html',
	styleUrls: ['./settings.component.css']
})
export class SettingsComponent extends ClientCommonComponent implements OnInit {
	oldSettings: Settings;
	newSettings: Settings;
	accountPrivacyList: string[];

	constructor(
		protected injector: Injector,
		private settingsHttpService: SettingsHttpService
	) {
		super(injector);
		SettingsLanguage.define(this.translateService);
		this.accountPrivacyList = AccountPrivacyType.createList();
	}

	ngOnInit() {
		this.fetchSettings();
	}

	updateSettings() {
		if (ObjectHelper.isDifferent(this.oldSettings, this.newSettings)) {
			this.settingsHttpService.updateSettings(this.newSettings).subscribe(
				result => {
					if (result.status === AccountEditingResultStatus.SUCCESS) {
						this.oldSettings = Object.assign(new Settings(), this.newSettings);
					} else {
						this.alertService.show(result.status);
					}
				}
			)
		};
	}

	protected fetchSettings() {
		this.settingsHttpService.fetchSettings().subscribe(settings => {
			this.oldSettings = settings;
			this.newSettings = Object.assign(new Settings(), settings);
		});
	}
}
