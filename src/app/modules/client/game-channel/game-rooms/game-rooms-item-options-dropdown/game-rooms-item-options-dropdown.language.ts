import { TranslateService } from '@ngx-translate/core';

export class GameRoomsItemOptionsDropdownLanguage {
	static define(translateService: TranslateService) {
		translateService.setTranslation('en', {
			'GameRoomsItemOptionsDropdownLanguage': {
				'GO': 'Join now',
				'JOIN': 'Join this room',
				'CANCEL': 'Cancel room request',
				'REPORT': 'Report',
				'INFO': 'Info',
			}
		}, true);
		translateService.setTranslation('vi', {
			'GameRoomsItemOptionsDropdownLanguage': {
				'GO': 'Vào ngay',
				'JOIN': 'Tham gia',
				'CANCEL': 'Huỷ tham gia',
				'REPORT': 'Báo cáo phòng này',
				'INFO': 'Thông tin',
			}
		}, true);
	}
}
