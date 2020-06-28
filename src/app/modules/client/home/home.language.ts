import { TranslateService } from '@ngx-translate/core';

export class HomeLanguage {
	static define(translateService: TranslateService) {
		translateService.setTranslation('en', {
			'HomeLanguage': {
				'GAME_CHANNEL': 'Games:',
				'ROOMS': 'room(s)',
			}
		}, true);
		translateService.setTranslation('vi', {
			'HomeLanguage': {
				'GAME_CHANNEL': 'Trò chơi:',
				'ROOMS': 'phòng',
			}
		}, true);
	}
}
