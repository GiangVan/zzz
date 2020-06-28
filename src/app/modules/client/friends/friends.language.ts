import { TranslateService } from '@ngx-translate/core';

export class FriendsLanguage {
	static define(translateService: TranslateService) {
		translateService.setTranslation('en', {
			'FriendsLanguage': {
				'MAKE_FRIENDS': 'Find friends',
				'FRIENDS': 'Friends',
			}
		}, true);
		translateService.setTranslation('vi', {
			'FriendsLanguage': {
				'MAKE_FRIENDS': 'Tìm bạn',
				'FRIENDS': 'Bạn bè',
			}
		}, true);
	}
}
