import { TranslateService } from '@ngx-translate/core';

export class FriendChatLanguage {
	static define(translateService: TranslateService) {
		translateService.setTranslation('en', {
			'FriendChatLanguage': {
				'SEND': 'Send',
				'TYPE_SOMETHING_HERE': 'Type something here...',
			}
		}, true);
		translateService.setTranslation('vi', {
			'FriendChatLanguage': {
				'SEND': 'Gửi',
				'TYPE_SOMETHING_HERE': 'Viết gì đó...',
			}
		}, true);
	}
}
