import { TranslateService } from '@ngx-translate/core';

export class HomeGameDetailsLanguage {
	static define(translateService: TranslateService) {
		translateService.setTranslation('en', {
			'HomeGameDetailsLanguage': {
				'WELCOME': 'Welcome',
				'BACK_HOME': 'Back, homie!',
				'ROOMS': ' room(s).',
				'CURRENT_HAVE': 'Currently exists ',
				'JOIN': 'Join now',
			}
		}, true);
		translateService.setTranslation('vi', {
			'HomeGameDetailsLanguage': {
				'WELCOME': 'Chào mừng',
				'BACK_HOME': 'Bạn đã về nhà!',
				'ROOMS': ' phòng.',
				'CURRENT_HAVE': 'Đang có ',
				'JOIN': 'Tham gia ngay',
			}
		}, true);
	}
}
