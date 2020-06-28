import { Component, OnInit, Injector, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { GameRoomsHttpService } from './game-rooms.http.service';
import { GameRoom, RoomType } from './game-rooms.dto';
import { ClientCommonComponent } from '../../client.common-component';
import { GameRoomsLanguage } from './game-rooms.language';
import { SwtAlert } from 'src/app/common/helpers/sweet_alert';
import { GameRoomsOptionsDropdownComponent } from './game-rooms-options-dropdown/game-rooms-options-dropdown.component';
import { CssConfigs } from 'src/environments/environment';
import { LookAccountOptionsDropdownComponent } from '../../look-account/look-account-options-dropdown/look-account-options-dropdown.component';
import { GameRoomsItemOptionsDropdownComponent } from './game-rooms-item-options-dropdown/game-rooms-item-options-dropdown.component';
import { finalize, catchError, tap } from 'rxjs/operators';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';
import { GameChannelDataService } from '../game-channel.data.service';
import { CreateRoomsComponent } from './create-rooms/create-rooms.component';

@Component({
	selector: 'app-game-rooms',
	templateUrl: './game-rooms.component.html',
	styleUrls: ['./game-rooms.component.css'],
	animations: [
		trigger('listAnimation', [
			transition('* => *', [
				query(':leave', [
					stagger(100, [
						animate('300ms ease', style({
							opacity: 0,
							transform: "translateY(100%)"
						}))
					])
				], { optional: true }),
				query(':enter', [
					style({
						opacity: 0,
						transform: "translateY(100%)"
					}),
					stagger(100, [
						animate('400ms ease', style({
							opacity: 1,
							transform: "translateY(0%)"
						}))
					])
				], { optional: true })
			])
		])
	]
})
export class GameRoomsComponent extends ClientCommonComponent implements OnInit {
	@ViewChild('loaderLocation', { static: true, read: ViewContainerRef }) loaderLocationVR: ViewContainerRef;
	gameRooms: GameRoom[] = [];
	ROOM_TYPE = RoomType;

	constructor(
		private injector: Injector,
		private gameChannelDataService: GameChannelDataService,
		private gameRoomHttpService: GameRoomsHttpService
	) {
		super(injector);
		GameRoomsLanguage.define(this.translateService);
	}

	ngOnInit() {
		this.fetchGameRooms();
		this.gameChannelDataService.setReloadGameRoomsHandler(() => this.reloadRooms());
	}

	showGameRoomsOptionsDropdownDropdown(event) {
		this.dialogService.putDialogComponentToComponentWithOptions({
			dialogType: GameRoomsOptionsDropdownComponent,
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

	reloadRooms() {
		const currentGameChannelId = this.clientDataService.getCurrentGameChannelId(this.homeUrl);
		if (currentGameChannelId) {
			this.gameRooms = [];
			this.gameRoomHttpService.fetchGameRooms(currentGameChannelId, this.loaderLocationVR, true).subscribe(data => {
				this.gameRooms = data;
			});
		}
	}

	protected fetchGameRooms() {
		const currentGameChannelId = this.clientDataService.getCurrentGameChannelId(this.homeUrl);
		if (currentGameChannelId) {
			this.gameRoomHttpService.fetchGameRooms(currentGameChannelId, this.loaderLocationVR).subscribe(data => {
				this.gameRooms = data;
			});
		}
	}

	showCreateRoomsPopup() {
		this.dialogService.putDialogComponentToComponentWithOptions({
			dialogType: CreateRoomsComponent,
			useBackground: true,
			destroyIfOutFocus: true,
			zIndex: CssConfigs.popupZIndex,
			popupOptions: {
				classList: 'p-5',
				width: '700px',
			}
		});
	}

	handleRoomItemsClick(room: GameRoom, event: MouseEvent) {
		this.dialogService.putDialogComponentToComponentWithOptions({
			dialogType: GameRoomsItemOptionsDropdownComponent,
			anchorTo: 'left',
			anchorElement: event.target,
			destroyIfOutFocus: true,
			zIndex: CssConfigs.dropdownMenuZIndex,
			popupOptions: {
				classList: 'py-4 px-3 bg6',
				useExitBtn: false
			},
			data: {
				room: room,
				joinRoomHandler: () => {
					if (room.hasJoined) {
						this.gameChannelDataService.showPrivateChat(room.id);
					} else {
						room.isRequestingFromClient = true;
						this.gameRoomHttpService.joinRoom(room)
							.pipe(finalize(() => {
								room.isRequestingFromClient = false;
							})
							).subscribe(result => {
								if (result.success) {
									room.isRequesting = true;
								}
							})
					}
				},
				cancelRoomHandler: () => {
					room.isRequestingFromClient = true;
					this.gameRoomHttpService.getPendingJoinRoom()
						.pipe(tap(null, () => room.isRequestingFromClient = false)).subscribe(approveList => {
							const approve = approveList.find(approve => approve.roomId === room.id);
							if (approve) {
								if (approve.isApprove) {
									//reload if this is the old data
									this.reloadRooms();
								} else {
									this.gameRoomHttpService.cancelRoomRequest(approve)
										.pipe(tap(null, () => room.isRequestingFromClient = false)).subscribe(result => {
											if (result.success) {
												room.isRequesting = false;
											}
											room.isRequestingFromClient = false;
										})
								}
							} else {
								SwtAlert.display({
									icon: 'error',
									title: 'Something went wrong!',
									text: `"cancelRoomHandler":"không tìm thấy approve match với roomId:${room.id}"`
								});
							}
						})
				},
			}
		});
	}
}
