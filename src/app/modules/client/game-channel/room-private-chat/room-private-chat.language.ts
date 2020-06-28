import { TranslateService } from '@ngx-translate/core';

export class RoomPrivateChatLanguage {
	static define(translateService: TranslateService) {
		translateService.setTranslation('en', {
			'RoomPrivateChatLanguage': {
				'aaaa': 'bbbbbb',
			}
		}, true);
		translateService.setTranslation('vi', {
			'RoomPrivateChatLanguage': {
				'aaaa': 'bbbbbb',
			}
		}, true);
	}
}
