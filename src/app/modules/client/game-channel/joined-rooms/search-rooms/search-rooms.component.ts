import { Component, OnInit, Injector, ViewChild, ViewContainerRef, ElementRef, OnDestroy } from '@angular/core';
import { SearchRoomsHttpService } from './search-rooms.http.service';
import { ClientCommonComponent } from '../../../client.common-component';
import { SearchRoomsLanguage } from './search-rooms.language';
import { Subscription } from 'rxjs';
import { trigger, transition, style, animate, state } from '@angular/animations';
import { Room } from './search-rooms.dto';
import { GameChannel } from '../../game-channel.dto';
import { GameChannelDataService } from '../../game-channel.data.service';
import { finalize, tap } from 'rxjs/operators';

@Component({
	selector: 'app-search-rooms',
	templateUrl: './search-rooms.component.html',
	styleUrls: ['./search-rooms.component.css'],
	animations: [
		trigger('containerSizeStyle', [
			state('expand', style({
				height: '700px',
				width: '900px',
				opacity: 1,
			})),
			state('collapse', style({
				height: '320px',
				width: '600px',
				opacity: 1,
			})),
			transition('*=>expand', animate('200ms ease')),
			transition('*=>collapse', animate('200ms ease'))
		])
	]
})
export class SearchRoomsComponent extends ClientCommonComponent implements OnInit, OnDestroy {
	@ViewChild('loaderLocation', { static: true, read: ViewContainerRef }) loaderLocationVR: ViewContainerRef;
	rooms: Room[] = [];
	destroy: () => void;
	searchKey: string = '';
	gameChannels: GameChannel[];
	selectedGameChannelId: string = null;
	searchSubscription: Subscription;

	constructor(
		protected injector: Injector,
		private viewContainerRef: ViewContainerRef,
		private gameChannelDataService: GameChannelDataService,
		private searchRoomsHttpService: SearchRoomsHttpService
	) {
		super(injector);
		this.destroy = this.injector.get('destroy');
		const data = this.injector.get('data');
		SearchRoomsLanguage.define(this.translateService);
	}

	ngOnInit() {
		this.gameChannels = [new GameChannel({ _id: null }), ...this.gameChannelDataService.gameChannels];
		this.selectedGameChannelId = this.clientDataService.getCurrentGameChannelId(this.homeUrl);
	}

	joinRoom(room: Room) {
		if (room.hasJoined) {
			this.destroy();
			this.gameChannelDataService.showPrivateChat(room.id);
		} else {
			room.isRequestingFromClient = true;
			this.searchRoomsHttpService.joinRoom(room)
				.pipe(finalize(() => {
					room.isRequestingFromClient = false;
				})
				).subscribe(result => {
					if (result.success) {
						room.isRequesting = true;
					}
				})
		}
	}

	unjoinRoom(room: Room) {
		room.isRequestingFromClient = true;
		this.searchRoomsHttpService.getPendingJoinRoom()
			.pipe(tap(null, () => room.isRequestingFromClient = false)).subscribe(approveList => {
				const approve = approveList.find(approve => approve.roomId === room.id);
				if (approve) {
					this.searchRoomsHttpService.cancelRoomRequest(approve)
						.pipe(tap(null, () => room.isRequestingFromClient = false)).subscribe(result => {
							if (result.success) {
								room.isRequesting = false;
							}
							room.isRequestingFromClient = false;
						});
				} else {
					this.alertService.show('something went wrong!');
				}
			});
	}

	search() {
		this.unsubcribeSearch();
		this.rooms = [];

		if (this.searchKey) {
			this.searchSubscription = this.searchRoomsHttpService.search(this.searchKey, this.selectedGameChannelId, this.loaderLocationVR).subscribe(data => {
				this.rooms = data;
			});
		}
		this.searchKey = '';
	}

	ngOnDestroy() {
		this.unsubcribeSearch();
	}

	protected unsubcribeSearch() {
		if (this.searchSubscription) {
			this.searchSubscription.unsubscribe();
			this.searchSubscription = null;
		}
	}

	handleEnterToSearch(event: KeyboardEvent) {
		if (this.searchKey.length > 0 && event.keyCode === 13) {
			event.preventDefault();
			this.search();
		}
	}
}
