import { TranslateService } from '@ngx-translate/core';

export class SearchRoomsLanguage {
	static define(translateService: TranslateService) {
		translateService.setTranslation('en', {
			'SearchRoomsLanguage': {
				'SEARCH': 'Search',
				'TYPE_HERE': 'Type here...',
				'SEARCH_BY': 'Search by game:',
				'ALL_GAMES': 'All games',
				'REQUESTING': 'Requesting...',
				'REQUEST': 'Join',
				'UNREQUEST': 'Unjoin',
				'JOINED': 'Đã',
			}
		}, true);
		translateService.setTranslation('vi', {
			'SearchRoomsLanguage': {
				'SEARCH': 'Tìm ngay',
				'TYPE_HERE': 'Nhập thông tin tìm kiếm...',
				'SEARCH_BY': 'Tìm theo trò chơi:',
				'ALL_GAMES': 'Tất cả trò chơi',
				'REQUESTING': 'Đang gửi...',
				'REQUEST': 'Tham gia',
				'UNREQUEST': 'Hủy tham gia',
				'JOINED': 'Đã tham gia',
			}
		}, true);
	}
}
