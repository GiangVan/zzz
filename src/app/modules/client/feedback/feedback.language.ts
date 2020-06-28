import { TranslateService } from '@ngx-translate/core';

export class FeedbackLanguage {
	static define(translateService: TranslateService) {
		translateService.setTranslation('en', {
			'FeedbackLanguage': {
				'SEND': 'Send',
				'FEEDBACK': 'Feedback',
				'TYPE_HERE': 'Type here',
			}
		}, true);
		translateService.setTranslation('vi', {
			"FeedbackLanguage": {
				'SEND': 'Gửi',
				'FEEDBACK': 'Đóng góp ý kiến',
				'TYPE_HERE': 'Viết nhận xét tại đây...',
			}
		}, true);
	}
}
