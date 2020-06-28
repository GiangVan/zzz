import { Injectable, ViewContainerRef, ViewRef, Injector, ComponentRef } from "@angular/core";
import gql from 'graphql-tag';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { map, tap, finalize, switchMap } from 'rxjs/operators';
import { ServiceUrls } from 'src/environments/environment';
import { LoaderService } from 'src/app/common/dialogs/loader/loader.service';
import { LocalLoader } from 'src/app/common/dialogs/loader/loader.dto';
import { ClientCommonService } from '../../../client.common-service';
import { ResultCRUD, RoomInput } from './create-rooms.dto';

@Injectable({
	providedIn: "root"
})
export class CreateRoomsHttpService extends ClientCommonService {
	readonly ssToken: string;
	readonly tokenTitle: string;

	constructor(
		protected injector: Injector,
	) {
		super(injector);
		this.ssToken = this.authService.getSessionToken();
		this.tokenTitle = this.authService.getTokenTitle();
	}

	create(room: RoomInput, gameChannelId: string) {
		if(room.name == null){
			room.name = '';
		}
		
		return this.apollo.use('mainService').mutate<any>({
			mutation: gql`
				mutation 
				{
					createRoom(roomInput:{
						roomName: "${room.name}"
							roomType: ${room.type}
							description: "${room.describe}"
							maxOfMember: ${room.maxMember}
							member: []
							game: {
								gameID: "${gameChannelId}"
							}
						},
						needApproved: true
					){
						message
						success
						payload
					}
				}
			`,
			context: {
				headers: new HttpHeaders().set(this.tokenTitle, this.ssToken)
			},
		}).pipe(map(
			({ data }): ResultCRUD => new ResultCRUD(data.createRoom)
		));
	}
}
