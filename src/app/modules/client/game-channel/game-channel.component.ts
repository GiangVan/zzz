import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Injector, ViewContainerRef } from '@angular/core';
import { JoinedRoomsComponent } from './joined-rooms/joined-rooms.component';
import { GameChannelLanguage } from './game-channel.language';
import { ClientCommonComponent } from '../client.common-component';
import { GameChannelHttpService } from './game-channel.http.service';
import { GameChannelDataService } from './game-channel.data.service';
import { GameChannelSocketService } from './game-channel.socket.service';
import { RoomOption } from './game-channel.dto';

@Component({
	selector: 'app-game-channel',
	templateUrl: './game-channel.component.html',
	styleUrls: ['./game-channel.component.css']
})
export class GameChannelComponent extends ClientCommonComponent implements OnInit {
	@ViewChild('joinedRooms', { static: true }) joinedRoomsComponent: JoinedRoomsComponent;
	@ViewChild('gameChannelLoaderLocation', { static: true, read: ViewContainerRef }) loaderLocationVR: ViewContainerRef;
	gameTitle: string;
	roomFindingOption: RoomOption;

	constructor(
		protected injector: Injector,
		protected gameChannelHttpService: GameChannelHttpService,
		protected gameChannelSocketService: GameChannelSocketService,
		protected gameChannelDataService: GameChannelDataService
	) {
		super(injector);
		GameChannelLanguage.define(this.translateService);

		if (this.route.snapshot.params.id) {
			this.clientDataService.setCurrentGameChannelId(this.route.snapshot.params.id);
		}
	}
	
	ngOnInit() {
		
		const gameId = this.clientDataService.getCurrentGameChannelId(this.homeUrl);
		
		if(gameId){
			this.gameChannelHttpService.fetchGameChannels(this.loaderLocationVR).subscribe(data => {
				this.gameChannelDataService.gameChannels = data;
				this.gameTitle = data.find(obs => obs.id === this.clientDataService.getCurrentGameChannelId(this.homeUrl)).name;
			});

			this.roomFindingOption = new RoomOption(true, 2, gameId);
			this.gameChannelSocketService.roomFindingOption = this.roomFindingOption;
			this.gameChannelSocketService.initRoomFindingSocket();
		}
	}

	findFastRoom(event){
		const gameId = this.clientDataService.getCurrentGameChannelId(this.homeUrl);

		if(gameId){
			const option = new RoomOption(true, 2, gameId);
			if(this.roomFindingOption.isRoomFinding){
				this.gameChannelSocketService.unsubcribeToFindRoom();
			} else {
				this.gameChannelSocketService.subcribeToFindRoom(event.target);
			}
		}
	}
}
