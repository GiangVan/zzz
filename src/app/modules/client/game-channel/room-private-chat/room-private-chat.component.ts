import { Component, OnInit, ViewContainerRef, Injector } from '@angular/core';
import { RoomPrivateChatLanguage } from './room-private-chat.language';
import { ClientCommonComponent } from '../../client.common-component';
import { GameChannelDataService } from '../game-channel.data.service';
import { RoomPrivateHttpService } from './room-private-chat.http.service';
import { RoomDetail } from './room-private-chat.dto';

@Component({
	selector: 'app-room-private-chat',
	templateUrl: './room-private-chat.component.html',
	styleUrls: ['./room-private-chat.component.css']
})
export class RoomPrivateChatComponent extends ClientCommonComponent implements OnInit {
	roomDetail: RoomDetail;

	constructor(
		protected injector: Injector,
		private viewContainerRef: ViewContainerRef,
		private roomPrivateHttpService: RoomPrivateHttpService,
		private gameChannelDataService: GameChannelDataService
	) {
		super(injector);
		RoomPrivateChatLanguage.define(this.translateService);

		this.gameChannelDataService.setShowPrivateChatHandler((roomID: string) => {
			this.show(roomID);
			this.roomPrivateHttpService.fetchRoomDetail(roomID, this.viewContainerRef).subscribe(data => this.roomDetail = data);
		});
	}

	ngOnInit() {
	}

	hide() {
		this.viewContainerRef.element.nativeElement.style.display = 'none';
	}

	protected show(roomID: string) {
		this.viewContainerRef.element.nativeElement.style.display = 'block';
	}

	protected initSocket() {

	}
}
