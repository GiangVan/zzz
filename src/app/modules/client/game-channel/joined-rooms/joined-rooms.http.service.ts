import { Injectable, Injector, ViewContainerRef, ComponentRef } from "@angular/core";
import { Apollo } from 'apollo-angular';
import { AuthService } from "src/app/common/services/auth.service";
import gql from 'graphql-tag';
import { HttpHeaders } from '@angular/common/http';
import { map, finalize } from 'rxjs/operators';
import { JoinedRoom } from './joined-rooms.dto';
import { ClientCommonService } from '../../client.common-service';

@Injectable({
	providedIn: "root"
})
export class JoinedRoomsHttpService extends ClientCommonService {
	readonly ssToken: string;
	readonly tokenTitle: string;

	constructor(
		protected injector: Injector
	) {
		super(injector);
		this.ssToken = this.authService.getSessionToken();
		this.tokenTitle = this.authService.getTokenTitle();
	}

	fetchJoinedRooms(viewContainerRef: ViewContainerRef, reload: boolean = false) {
		const loader: ComponentRef<any> = this.loaderService.addLocalLoader(viewContainerRef, false, 'position-top-left position-absolute w-100 h-100 bg9 d-flex justify-content-center align-items-center').loaderVR;

		return this.apollo.use('mainService').query<any>({
			query: gql`
				query{
					getRoomJoin{
						_id
						roomName
						roomLogo
						roomBackground
					}
				}
			`,
			fetchPolicy: reload ? 'no-cache' : null,
			variables: { isUseGlobalLoader: false },
			context: {
				headers: new HttpHeaders().set(this.tokenTitle, this.ssToken)
			}
		}).pipe(
			map(({ data }): JoinedRoom[] => {
				let rooms: JoinedRoom[] = [];

				data.getRoomJoin.forEach(room => {
					rooms.push(new JoinedRoom(room));
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
}
