import { Injectable, Injector } from '@angular/core';
import { ServiceUrls } from 'src/environments/environment';
import { SocketioHelper } from 'src/app/common/helpers/socketio';
import { ClientCommonService } from '../client.common-service';
import { RoomOption, ResultCRUD } from './game-channel.dto';
import { GameChannelDataService } from './game-channel.data.service';
import { SwtAlert } from 'src/app/common/helpers/sweet_alert';

@Injectable({
	providedIn: "root"
})
export class GameChannelSocketService extends ClientCommonService {
	private socket: SocketIOClient.Socket;
	roomFindingOption: RoomOption;

	constructor(
		protected injector: Injector,
		protected gameChannelDataService: GameChannelDataService,
	) {
		super(injector);
	}

	initRoomFindingSocket() {
		if (this.socket == null) {
			this.socket = SocketioHelper.init(ServiceUrls.roomFastFinding, {
				transportOptions: {
					polling: {
						extraHeaders: {
							token: this.authService.getSessionToken()
						}
					}
				}
			});

			this.socket.on('FINDING_RESULT', (result: ResultCRUD) => {

				this.roomFindingOption.isRoomFinding = false;
				
				this.gameChannelDataService.showPrivateChat(result.payload);
				this.gameChannelDataService.reloadJoinedRooms();
				this.gameChannelDataService.reloadGameRooms();
			});

			this.socket.on('NOTIFICATION', (result: ResultCRUD) => {

				SwtAlert.display({
					title: result.message
				});
				this.roomFindingOption.isRoomFinding = false;
			});

			this.socket.on('IS_FINDING_ROOMS', (result: boolean) => {
				this.roomFindingOption.isRoomFinding = result;
			});

			this.socket.on('NOTIFICATION', (result: ResultCRUD) => {

				SwtAlert.display({
					title: result.message
				});
				this.roomFindingOption.isRoomFinding = false;
			});
		}
	}

	subcribeToFindRoom(buttonElement) {
		this.roomFindingOption.isRoomFinding = true;

		this.socket.emit('FIND_ROOMS', {
			option: this.roomFindingOption
		});
	}

	unsubcribeToFindRoom() {
		this.roomFindingOption.isRoomFinding = false;

		this.socket.emit('UNFIND_ROOMS', '');
	}
}
