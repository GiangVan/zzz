import { Component, OnInit, Injector } from '@angular/core';
import { SwtAlert } from 'src/app/common/helpers/sweet_alert';
import { ClientCommonComponent } from '../../../client.common-component';
import { JoinedRoomsOptionsDropdownLanguage } from './joined-rooms-options-dropdown.language';
import { GameChannelDataService } from '../../game-channel.data.service';

@Component({
	selector: 'app-joined-rooms-options-dropdown',
	templateUrl: './joined-rooms-options-dropdown.component.html',
})
export class JoinedRoomsOptionsDropdownComponent extends ClientCommonComponent implements OnInit {
	reloadRooms: () => void;
	destroy: () => void;

	constructor(
		private injector: Injector,
		private gameChannelDataService: GameChannelDataService
	) {
		super(injector);
		JoinedRoomsOptionsDropdownLanguage.define(this.translateService);
		const data = this.injector.get('data');
		this.destroy = this.injector.get('destroy');
	}
	
	ngOnInit() {
		this.reloadRooms = () => this.gameChannelDataService.reloadJoinedRooms();
	}
}
