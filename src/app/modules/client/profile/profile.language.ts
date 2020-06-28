import { TranslateService } from '@ngx-translate/core';

export class ProfileLanguage {
	static define(translateService: TranslateService) {
		translateService.setTranslation('en', {
			'ProfileLanguage': {
				'SETTING': 'Setting',
				'PROFILE': 'Profile',
				'ABOUT': 'About',
				'EDIT_PROFILE': 'Edit profile',
				'TIMELINE': 'Timeline',
				'FRIENDS': 'Friends',
				'PHOTOS': 'Photos',
				'POST': 'Post',
				'ADD_PHOTOS': 'Add photos',
				'ADD_FILES': 'Add files',
				'TYPE_HERE': "What's on your mind?",
				'PHONE': 'Phone',
				'BIRTHYEAR': 'Birth year',
				'BIRTHMONTH': 'Birth month',
				'CREATED_AT': 'Joined on',
				'EMAIL': 'Email',
				'FOLLOWERS': 'Followed by',
			}
		}, true);
		translateService.setTranslation('vi', {
			'ProfileLanguage': {
				'SETTING': 'Cài đặt',
				'PROFILE': 'Thông tin',
				'ABOUT': 'Về tôi',
				'EDIT_PROFILE': 'Sửa thông tin',
				'TIMELINE': 'Dòng thời gian',
				'FRIENDS': 'Bạn bè',
				'PHOTOS': 'Hình ảnh',
				'POST': 'Đăng bài',
				'ADD_PHOTOS': 'Thêm hình ảnh',
				'ADD_FILES': 'Đính kèm tập tin',
				'TYPE_HERE': 'Viết nội dung bài viết tại...',
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
