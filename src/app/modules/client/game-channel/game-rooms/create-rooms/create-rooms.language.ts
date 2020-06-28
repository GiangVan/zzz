import { TranslateService } from '@ngx-translate/core';

export class CreateRoomsLanguage {
	static define(translateService: TranslateService) {
		translateService.setTranslation('en', {
			'CreateRoomsLanguage': {
				'ROOM_NAME': 'Room name:',
				'CREATE': 'Create now',
				'PUBLIC': 'Public',
				'HIDDEN': 'Hidden',
				'PRIVATE': 'Private',
				'TYPE_ROOM_NAME': 'Room name...',
				'TYPE_DESCRIPTION': 'Type a description...',
				'MAX_MEMBER': 'Maximum members are: ',
			}
		}, true);
		translateService.setTranslation('vi', {
			'CreateRoomsLanguage': {
				'ROOM_NAME': 'Tên phòng:',
				'CREATE': 'Tạo phòng ngay',
				'PUBLIC': 'Phòng công khai',
				'HIDDEN': 'Phòng ẩn danh',
				'PRIVATE': 'Phòng chờ duyệt',
				'TYPE_ROOM_NAME': 'Tên phòng...',
				'TYPE_DESCRIPTION': 'Mô tả phòng...',
				'MAX_MEMBER': 'Số người tối đa là: ',
			}
		}, true);
	}
}
