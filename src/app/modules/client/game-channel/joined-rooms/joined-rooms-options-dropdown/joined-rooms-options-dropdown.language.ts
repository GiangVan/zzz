import { TranslateService } from '@ngx-translate/core';

export class JoinedRoomsOptionsDropdownLanguage {
	static define(translateService: TranslateService) {
		translateService.setTranslation('en', {
			'JoinedRoomsOptionsDropdownLanguage': {
				'RELOAD_ROOMS': 'Reload rooms',
			}
		}, true);
		translateService.setTranslation('vi', {
			'JoinedRoomsOptionsDropdownLanguage': {
				'RELOAD_ROOMS': 'Tải lại phòng',
			}
		}, true);
	}
}
