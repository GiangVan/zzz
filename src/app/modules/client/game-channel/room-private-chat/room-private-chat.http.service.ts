import { Injectable, Injector, ComponentRef, ViewContainerRef } from "@angular/core";
import gql from 'graphql-tag';
import { HttpHeaders } from '@angular/common/http';
import { map, finalize } from 'rxjs/operators';
import { CssConfigs } from 'src/environments/environment';
import { ClientCommonService } from '../../client.common-service';
import { RoomDetail } from './room-private-chat.dto';


@Injectable({
	providedIn: "root"
})
export class RoomPrivateHttpService extends ClientCommonService {
	readonly ssToken: string;
	readonly tokenTitle: string;

	constructor(
		protected injector: Injector
	) {
		super(injector);
		this.ssToken = this.authService.getSessionToken();
		this.tokenTitle = this.authService.getTokenTitle();
	}

	fetchRoomDetail(roomId: string, viewContainerRef: ViewContainerRef) {
		const loader: ComponentRef<any> = this.loaderService.addLocalLoader(viewContainerRef, true, null, CssConfigs.loaderZIndex + 1).loaderVR;

		return this.apollo.use('mainService').query<any>({
			query: gql`
				query{
					getRoomInfo(roomID:"${roomId}"){
						_id
						roomName
						roomLogo
						roomBackground
					}
				}
			`,
			variables: { isUseGlobalLoader: false },
			context: {
				headers: new HttpHeaders().set(this.tokenTitle, this.ssToken)
			}
		}).pipe(
			map(({ data }): RoomDetail => new RoomDetail(data.getRoomInfo)),
			finalize(() => {
				if (loader) {
					loader.destroy();
				}
			})
		);
	}
}
