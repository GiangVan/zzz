import { Injectable, Injector } from "@angular/core";
import { TranslateService } from '@ngx-translate/core';
import { AlertService } from 'src/app/common/dialogs/alert/alert.service';
import { Router } from '@angular/router';
import { ClientCommonService } from '../client.common-service';
import { GameChannel } from './game-channel.dto';

@Injectable({
	providedIn: "root"
})
export class GameChannelDataService extends ClientCommonService {
	private reloadJoinedRoomsHandler: () => void = null;
	private reloadGameRoomsHandler: () => void = null;
	private showPrivateChatHandler: (roomID: string) => void = null;
	gameChannels: GameChannel[];

	constructor(
		protected injector: Injector,
		protected translateService: TranslateService,
		protected alertService: AlertService,
		protected router: Router,
	) {
		super(injector);
	}

	reloadJoinedRooms() {
		if (this.reloadJoinedRoomsHandler === null) {
			this.alertService.show('reloadJoinedRoomsHandler === null');
		} else {
			this.reloadJoinedRoomsHandler();
		}
	}

	setReloadJoinedRoomsHandler(func: () => void) {
		this.reloadJoinedRoomsHandler = func;
	}
	//reloadGameRoomsHandler
	reloadGameRooms() {
		if (this.reloadGameRoomsHandler === null) {
			this.alertService.show('reloadGameRoomsHandler === null');
		} else {
			this.reloadGameRoomsHandler();
		}
	}

	setReloadGameRoomsHandler(func: () => void) {
		this.reloadGameRoomsHandler = func;
	}
	//showPrivateChatHandler
	showPrivateChat(roomID: string) {
		if (this.showPrivateChatHandler === null) {
			this.alertService.show('showPrivateChatHandler === null');
		} else {
			this.showPrivateChatHandler(roomID);
		}
	}

	setShowPrivateChatHandler(func: (roomID: string) => void) {
		this.showPrivateChatHandler = func;
	}
}
