import { Injectable, ViewContainerRef, ViewRef, Injector, ComponentRef } from "@angular/core";
import { Apollo } from 'apollo-angular';
import { AuthService } from "src/app/common/services/auth.service";
import gql from 'graphql-tag';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { map, tap, finalize, switchMap } from 'rxjs/operators';
import { ServiceUrls } from 'src/environments/environment';
import { LoaderService } from 'src/app/common/dialogs/loader/loader.service';
import { LocalLoader } from 'src/app/common/dialogs/loader/loader.dto';
import { ClientCommonService } from '../../../client.common-service';
import { Room, Approve, ResultCRUD } from './search-rooms.dto';

@Injectable({
	providedIn: "root"
})
export class SearchRoomsHttpService extends ClientCommonService {
	readonly ssToken: string;
	readonly tokenTitle: string;

	constructor(
		protected injector: Injector,
	) {
		super(injector);
		this.ssToken = this.authService.getSessionToken();
		this.tokenTitle = this.authService.getTokenTitle();
	}

	search(searchKey: string, gameId: string, viewContainerRef: ViewContainerRef) {
		const loader: ComponentRef<any> = this.loaderService.addLocalLoader(viewContainerRef, false).loaderVR;

		gameId = gameId ? '"' + gameId + '"' : 'null';
		return this.apollo.use('mainService').query<any>({
			query: gql`
				query 
				{
					searchRoom(query:"${searchKey}", gameID:${gameId}, hideJoined: false){
						_id
						roomName
						roomLogo
						isJoin
						isRequest
					}
				}
			`,
			context: {
				headers: new HttpHeaders().set(this.tokenTitle, this.ssToken)
			},
			fetchPolicy: 'no-cache',
			variables: {
				isUseGlobalLoader: false
			}
		}).pipe(
			map(
				({ data }): Room[] => {
					let rooms: Room[] = [];

					data.searchRoom.forEach(data => {
						rooms.push(new Room(data));
					})

					return rooms;
				}
			),
			finalize(() => loader.destroy())
		);
	}

	joinRoom(room: Room) {
		return this.apollo.use('mainService').mutate<any>({
			mutation: gql`
				mutation{
					joinRoom(roomID:"${room.id}"){
						success
						message
					}
				}
			`,
			context: {
				headers: new HttpHeaders().set(this.tokenTitle, this.ssToken)
			},
			variables: {
				isUseGlobalLoader: false
			}
		}).pipe(map(
			({ data }): ResultCRUD => new ResultCRUD(data.joinRoom)));
	}

	
	getPendingJoinRoom() {
		return this.apollo.use('mainService').query<any>({
			query: gql`
				query{
					getPendingJoinRoom_User{
						_id
						roomID
						isApprove
					}
				}
			`,
			fetchPolicy: 'no-cache',
			context: {
				headers: new HttpHeaders().set(this.tokenTitle, this.ssToken)
			},
			variables: {
				isUseGlobalLoader: false
			}
		}).pipe(map(
			({ data }): Approve[] => {
				let approveList: Approve[] = [];

				data.getPendingJoinRoom_User.forEach(data => {
					approveList.push(new Approve(data));
				})

				return approveList;
			}
		));
	}

	cancelRoomRequest(approve: Approve) {
		return this.apollo.use('mainService').mutate<any>({
			mutation: gql`
				mutation{
					cancelRequest(roomID:"${approve.roomId}", requestID:"${approve.requestId}"){
						success
						message
					}
				}
			`,
			context: {
				headers: new HttpHeaders().set(this.tokenTitle, this.ssToken)
			},
			variables: {
				isUseGlobalLoader: false
			}
		}).pipe(map(
			({ data }): ResultCRUD => new ResultCRUD(data.cancelRequest)));
	}
}
