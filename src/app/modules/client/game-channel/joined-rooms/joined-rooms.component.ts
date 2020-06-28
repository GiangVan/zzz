import { Component, OnInit, ViewContainerRef, ViewChild, Injector, Input } from '@angular/core';
import { JoinedRoom } from './joined-rooms.dto';
import { JoinedRoomsHttpService } from './joined-rooms.http.service';
import { trigger, state, style, transition, animate, query, stagger } from '@angular/animations';
import { JoinedRoomsLanguage } from './joined-rooms.language';
import { ClientCommonComponent } from '../../client.common-component';
import { SearchRoomsComponent } from './search-rooms/search-rooms.component';
import { CssConfigs } from 'src/environments/environment';
import { JoinedRoomsOptionsDropdownComponent } from './joined-rooms-options-dropdown/joined-rooms-options-dropdown.component';
import { GameChannelDataService } from '../game-channel.data.service';

@Component({
	selector: 'app-joined-rooms',
	templateUrl: './joined-rooms.component.html',
	styleUrls: ['./joined-rooms.component.css'],
	animations: [
		trigger('changeContainerState', [
			state('expand', style({
				padding: '15px',
				width: '340px'
			})),
			state('collapse', style({
				width: '94px',
				padding: '0px',
			})),
			transition('*=>expand', animate('100ms ease')),
			transition('*=>collapse', animate('100ms ease'))
		]),
		trigger('listAnimation', [
			transition('* => *', [
				query(':leave', [
					stagger(50, [
						animate('500ms ease', style({
							opacity: 0,
							transform: "translateX(-100%)"
						}))
					])
				], { optional: true }),
				query(':enter', [
					style({
						opacity: 0,
						transform: "translateX(-100%)"
					}),
					stagger(50, [
						animate('500ms ease', style({
							opacity: 1,
							transform: "translateX(0%)"
						}))
					])
				], { optional: true })
			])
		])
	]
})
export class JoinedRoomsComponent extends ClientCommonComponent implements OnInit {
	@ViewChild('loaderLocation', { static: true, read: ViewContainerRef }) loaderLocationVR: ViewContainerRef;
	joinedRooms: JoinedRoom[] = [];
	containerState: string = 'expand';

	constructor(
		protected injector: Injector,
		protected gameChannelDataService: GameChannelDataService,
		private joinedRoomHttpService: JoinedRoomsHttpService
	) {
		super(injector);
		JoinedRoomsLanguage.define(this.translateService);
	}
	
	ngOnInit() {
		this.fetchJoinedRooms();
		this.gameChannelDataService.setReloadJoinedRoomsHandler(
			() => {
				this.joinedRooms = [];
				this.joinedRoomHttpService.fetchJoinedRooms(this.loaderLocationVR, true).subscribe(data => this.joinedRooms = data);
			}
		)
	}

	showPrivateChat(roomID: string){
		this.gameChannelDataService.showPrivateChat(roomID);
	}

	resizeContainer() {
		if (this.containerState === 'expand') {
			this.containerState = 'collapse';
		} else {
			this.containerState = 'expand';
		};
	}

	showSearchPopup() {
		this.dialogService.putDialogComponentToComponentWithOptions({
			dialogType: SearchRoomsComponent,
			useBackground: true,
			destroyIfOutFocus: true,
			zIndex: CssConfigs.popupZIndex,
			popupOptions: {
			}
		});
	}

	showJoinedRoomsOptionsDropdown(event) {
		this.dialogService.putDialogComponentToComponentWithOptions({
			dialogType: JoinedRoomsOptionsDropdownComponent,
			anchorElement: event.target,
			anchorTo: "right",
			destroyIfOutFocus: true,
			zIndex: CssConfigs.dropdownMenuZIndex,
			popupOptions: {
				classList: 'py-3 px-2 bg6',
				useExitBtn: false
			}
		});
	}



	protected fetchJoinedRooms() {
		this.joinedRoomHttpService.fetchJoinedRooms(this.loaderLocationVR).subscribe(data => this.joinedRooms = data);
	}
}
