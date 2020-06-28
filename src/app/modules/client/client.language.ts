import { TranslateService } from '@ngx-translate/core';

export class ClientLanguage {
	static define(translateService: TranslateService) {
		translateService.setTranslation('en', {
			'ClientLanguage': {
				'GAME': 'Games',
				'COMMUNITY': 'Community',
				'OPTIONS': 'Options',
				'HOME': 'Home',
				'YOU_HAVENT_CHOOSED_ANY_GAMES': "You haven't choosed any rooms!",
			}
		}, true);
		translateService.setTranslation('vi', {
			'ClientLanguage': {
				'GAME': 'Trò chơi',
				'COMMUNITY': 'Cộng đồng',
				'OPTIONS': 'Tùy chỉnh',
				'HOME': 'Nhà',
				'YOU_HAVENT_CHOOSED_ANY_GAMES': 'Bạn chưa chọn trò chơi',
			}
		}, true);
	}
}
