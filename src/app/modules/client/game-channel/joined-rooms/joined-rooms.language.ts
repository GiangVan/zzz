import { TranslateService } from '@ngx-translate/core';

export class JoinedRoomsLanguage {
	static define(translateService: TranslateService) {
		translateService.setTranslation('en', {
			'JoinedRoomsLanguage': {
				'JOINED_ROOMS': 'Joined rooms',
				'QUICK_SEARCH_ROOMS': 'Search',
				'ADD_ROOM': 'Add rooms',
			}
		}, true);
		translateService.setTranslation('vi', {
			'JoinedRoomsLanguage': {
				'JOINED_ROOMS': 'Phòng đã tham gia',
				'QUICK_SEARCH_ROOMS': 'Tìm phòng',
				'ADD_ROOM': 'Tạo phòng',
			}
		}, true);
	}
}
