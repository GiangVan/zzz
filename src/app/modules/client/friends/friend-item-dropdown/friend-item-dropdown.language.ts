import { TranslateService } from '@ngx-translate/core';

export class FriendItemDropdownLanguage {
	static define(translateService: TranslateService) {
		translateService.setTranslation('en', {
			'FriendItemDropdownLanguage': {
				'PROFILE': 'Profile',
			}
		}, true);
		translateService.setTranslation('vi', {
			'FriendItemDropdownLanguage': {
				'PROFILE': 'Xem trang cá nhân',
			}
		}, true);
	}
}
