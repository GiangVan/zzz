import { TranslateService } from '@ngx-translate/core';

export class SettingsLanguage {
	static define(translateService: TranslateService) {
		translateService.setTranslation('en', {
			'SettingsLanguage': {
				'SETTING': 'Setting',
				'UPDATE': 'Update',
			}
		}, true);
		translateService.setTranslation('vi', {
			'SettingsLanguage': {
				'SETTING': 'Cài đặt',
				'UPDATE': 'Cập nhật',
			}
		}, true);
	}
}
