import { Component, OnInit, Injector } from '@angular/core';
import { SwtAlert } from 'src/app/common/helpers/sweet_alert';
import { GameRoomsOptionsDropdownLanguage } from './game-rooms-options-dropdown.language';
import { ClientCommonComponent } from '../../../client.common-component';
import { GameChannelDataService } from '../../game-channel.data.service';

@Component({
	selector: 'app-game-rooms-options-dropdown',
	templateUrl: './game-rooms-options-dropdown.component.html',
})
export class GameRoomsOptionsDropdownComponent extends ClientCommonComponent implements OnInit {
	reloadRooms: () => void;
	destroy: () => void;

	constructor(
		private injector: Injector,
		private gameChannelDataService: GameChannelDataService,
	) {
		super(injector);
		GameRoomsOptionsDropdownLanguage.define(this.translateService);
		const data = this.injector.get('data');
		this.destroy = this.injector.get('destroy');
	}
	
	ngOnInit() {
		this.reloadRooms = () => this.gameChannelDataService.reloadGameRooms();
	}
}
