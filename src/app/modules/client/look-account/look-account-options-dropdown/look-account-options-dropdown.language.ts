import { TranslateService } from '@ngx-translate/core';

export class LookAccountOptionsDropdownLanguage {
	static define(translateService: TranslateService) {
		translateService.setTranslation('en', {
			'LookAccountOptionsDropdownLanguage': {
				'BLOCK': 'Block',
				'REPORT': 'Report',
			}
		}, true);
		translateService.setTranslation('vi', {
			'LookAccountOptionsDropdownLanguage': {
				'BLOCK': 'Chặn người này',
				'REPORT': 'Báo cáo người này',
			}
		}, true);
	}
}
