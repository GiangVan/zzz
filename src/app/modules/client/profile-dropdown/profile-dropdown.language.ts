import { TranslateService } from '@ngx-translate/core';

export class ProfileDropdownLanguage {
	static define(translateService: TranslateService) {
		translateService.setTranslation('en', {
			'ProfileDropdownLanguage': {
				'SETTING': 'Setting',
				'MY_PROFILE': 'My profile',
				'FEEDBACK': 'Feedback',
				'LOGOUT': 'Log out',
			}
		}, true);
		translateService.setTranslation('vi', {
			'ProfileDropdownLanguage': {
				'SETTING': 'Cài đặt',
				'MY_PROFILE': 'Trang cá nhân',
				'FEEDBACK': 'Góp ý cho chúng tôi',
				'LOGOUT': 'Đăng xuất',
			}
		}, true);
	}
}
