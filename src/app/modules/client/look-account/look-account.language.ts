import { TranslateService } from '@ngx-translate/core';

export class LookAccountLanguage {
	static define(translateService: TranslateService) {
		translateService.setTranslation('en', {
			'LookAccountLanguage': {
				'SEARCH': 'Search',
				'UNFRIEND_REQUEST': 'Cancel friend request',
				'CONFIRM': 'Confirm to be friends',
				'CANCEL': 'Cancel',
				'MAKE_FRIEND': 'Make friend',
				'FRIEND': 'Friend',
				'ABOUT': 'About',
				'TIMELINE': 'Timeline',
				'FRIENDS': 'Friends',
				'PHOTOS': 'Photos',
				'REQUESTING': 'requesting...',
				'PHONE': 'Phone',
				'BIRTHYEAR': 'Birth year',
				'BIRTHMONTH': 'Birth month',
				'CREATED_AT': 'Joined on',
				'EMAIL': 'Email',
				'FOLLOWERS': 'Followers',
			}
		}, true);
		translateService.setTranslation('vi', {
			'LookAccountLanguage': {
				'SEARCH': 'Tìm',
				'UNFRIEND_REQUEST': 'Huỷ yêu cầu kết bạn',
				'CONFIRM': 'Đồng ý làm bạn',
				'CANCEL': 'Huỷ',
				'MAKE_FRIEND': 'Kết bạn',
				'FRIEND': 'Bạn bè',
				'ABOUT': 'Về tôi',
				'TIMELINE': 'Dòng thời gian',
				'FRIENDS': 'Bạn bè',
				'PHOTOS': 'Hình ảnh',
				'REQUESTING': 'đang gửi...',
				'PHONE': 'Điện thoại',
				'BIRTHYEAR': 'Năm sinh',
				'BIRTHMONTH': 'Tháng sinh',
				'CREATED_AT': 'Đã tham gia từ',
				'EMAIL': 'Email',
				'FOLLOWERS': 'Người theo dõi',
			}
		}, true);
	}
}
