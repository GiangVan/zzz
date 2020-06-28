import { TranslateService } from '@ngx-translate/core';

export class GameRoomsOptionsDropdownLanguage {
	static define(translateService: TranslateService) {
		translateService.setTranslation('en', {
			'GameRoomsOptionsDropdownLanguage': {
				'RELOAD_ROOMS': 'Reload rooms',
			}
		}, true);
		translateService.setTranslation('vi', {
			'GameRoomsOptionsDropdownLanguage': {
				'RELOAD_ROOMS': 'Tải lại phòng',
			}
		}, true);
	}
}
