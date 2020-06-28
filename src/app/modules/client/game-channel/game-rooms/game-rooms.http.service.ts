import { Injectable, Injector, ComponentRef, ViewContainerRef } from "@angular/core";
import { Apollo } from 'apollo-angular';
import { AuthService } from "src/app/common/services/auth.service";
import gql from 'graphql-tag';
import { HttpHeaders } from '@angular/common/http';
import { map, finalize } from 'rxjs/operators';
import { GameRoom, Approve, ResultCRUD } from './game-rooms.dto';
import { ClientCommonService } from '../../client.common-service';

@Injectable({
	providedIn: "root"
})
export class GameRoomsHttpService extends ClientCommonService {
	readonly ssToken: string;
	readonly tokenTitle: string;

	constructor(
		protected injector: Injector
	) {
		super(injector);
		this.ssToken = this.authService.getSessionToken();
		this.tokenTitle = this.authService.getTokenTitle();
	}

	fetchGameRooms(gameChannelId: string, viewContainerRef: ViewContainerRef, reload: boolean = false) {
		const loader: ComponentRef<any> = this.loaderService.addLocalLoader(viewContainerRef, false, 'position-top-left position-absolute w-100 h-100 bg8 d-flex justify-content-center align-items-center').loaderVR;

		return this.apollo.use('mainService').query<any>({
			query: gql`
				query{
					getRoomByGame(limit:20, page:1, gameID:"${gameChannelId}", groupSize: none, hideJoined: false){
						_id
						roomName
						roomLogo
						roomType
						roomBackground
						isJoin
						isRequest
						description
						maxOfMember
						countMember
					}
				}
			`,
			fetchPolicy: reload ? 'no-cache' : null,
			variables: { isUseGlobalLoader: false },
			context: {
				headers: new HttpHeaders().set(this.tokenTitle, this.ssToken)
			}
		}).pipe(
			map(({ data }): GameRoom[] => {
				let rooms: GameRoom[] = [];

				data.getRoomByGame.forEach(room => {
					rooms.push(new GameRoom(room));
				})

				return rooms;
			}),
			finalize(() => {
				if (loader) {
					loader.destroy();
				}
			})
		);
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

	joinRoom(room: GameRoom) {
		return this.apollo.use('mainService').mutate<any>({
			mutation: gql`
				mutation{
					joinRoom(roomID:"${room.id}", roomType:${room.type}){
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
