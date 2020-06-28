import { TranslateService } from '@ngx-translate/core';

export class SearchFriendLanguage {
	static define(translateService: TranslateService) {
		translateService.setTranslation('en', {
			'SearchFriendLanguage': {
				'SEARCH': 'Search',
				'UNFRIEND_REQUEST': 'Cancel friend request',
				'CONFIRM': 'Confirm to be friends',
				'CANCEL': 'Cancel',
				'MAKE_FRIEND': 'Make friend',
				'TYPE_HERE': 'Type here...',
				'FRIEND': 'Friend',
				'EMPTY_RESULT': 'Empty!',
				'REQUESTING': 'requesting...',
			}
		}, true);
		translateService.setTranslation('vi', {
			'SearchFriendLanguage': {
				'SEARCH': 'Tìm ngay',
				'UNFRIEND_REQUEST': 'Huỷ yêu cầu kết bạn',
				'CONFIRM': 'Đồng ý làm bạn',
				'CANCEL': 'Huỷ',
				'MAKE_FRIEND': 'Kết bạn',
				'TYPE_HERE': 'Nhập thông tin tìm kiếm...',
				'FRIEND': 'Bạn bè',
				'EMPTY_RESULT': 'Rỗng!',
				'REQUESTING': 'đang gửi...',
			}
		}, true);
	}
}
