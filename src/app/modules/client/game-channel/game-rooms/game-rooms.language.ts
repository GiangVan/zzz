import { TranslateService } from '@ngx-translate/core';

export class GameRoomsLanguage {
	static define(translateService: TranslateService) {
		translateService.setTranslation('en', {
			'GameRoomsLanguage': {
				'ROOMS_LIST': 'Rooms list',
				'REQUESTED': 'Requested',
				'REQUESTING': 'Requesting...',
				'JOINED': 'Joined',
				'YES': 'Join now',
				'NO': 'No',
				'DO_YOU_WANNA_JOIN': 'Do you wanna join?',
			}
		}, true);
		translateService.setTranslation('vi', {
			'GameRoomsLanguage': {
				'ROOMS_LIST': 'Phòng chat',
				'REQUESTED': 'Đã gửi yêu cầu',
				'REQUESTING': 'Đang gửi...',
				'JOINED': 'Đã tham gia',
				'YES': 'Tham gia ngay',
				'NO': 'Không',
				'DO_YOU_WANNA_JOIN': 'Bạn có muốn tham gia?',
			}
		}, true);
	}
}
