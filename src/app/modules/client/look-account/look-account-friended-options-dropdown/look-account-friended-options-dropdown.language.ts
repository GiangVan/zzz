import { TranslateService } from '@ngx-translate/core';

export class LookAccountFriendedOptionsDropdownLanguage {
	static define(translateService: TranslateService) {
		translateService.setTranslation('en', {
			'LookAccountFriendedOptionsDropdownLanguage': {
				'UNFRIEND': 'Unfriend',
			}
		}, true);
		translateService.setTranslation('vi', {
			'LookAccountFriendedOptionsDropdownLanguage': {
				'UNFRIEND': 'Hủy kết bạn',
			}
		}, true);
	}
}
