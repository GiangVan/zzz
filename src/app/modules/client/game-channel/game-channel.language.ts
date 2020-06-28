import { TranslateService } from '@ngx-translate/core';

export class GameChannelLanguage {
	static define(translateService: TranslateService) {
		translateService.setTranslation('en', {
			'GameChannelLanguage': {
				'FIND_QUICKLY': 'Find quickly',
				'FINDING': 'Finding...',
			}
		}, true);
		translateService.setTranslation('vi', {
			'GameChannelLanguage': {
				'FIND_QUICKLY': 'Tìm phòng nhanh',
				'FINDING': 'Đang tìm',
			}
		}, true);
	}
}
