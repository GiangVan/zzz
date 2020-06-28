import { TranslateService } from '@ngx-translate/core';

export class FriendsOptionsDropdownLanguage {
	static define(translateService: TranslateService) {
		translateService.setTranslation('en', {
			'FriendsOptionsDropdownLanguage': {
				'RELOAD_FRIENDS': 'Reload friends',
			}
		}, true);
		translateService.setTranslation('vi', {
			'FriendsOptionsDropdownLanguage': {
				'RELOAD_FRIENDS': 'Tải lại bạn bè',
			}
		}, true);
	}
}
