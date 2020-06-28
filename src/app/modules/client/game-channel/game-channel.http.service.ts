import { Injectable, Injector, ComponentRef, ViewContainerRef } from "@angular/core";
import gql from 'graphql-tag';
import { HttpHeaders } from '@angular/common/http';
import { map, finalize } from 'rxjs/operators';
import { ClientCommonService } from '../client.common-service';
import { GameChannel } from './game-channel.dto';
import { CssConfigs } from 'src/environments/environment';


@Injectable({
	providedIn: "root"
})
export class GameChannelHttpService extends ClientCommonService {
	readonly ssToken: string;
	readonly tokenTitle: string;

	constructor(
		protected injector: Injector
	) {
		super(injector);
		this.ssToken = this.authService.getSessionToken();
		this.tokenTitle = this.authService.getTokenTitle();
	}

	fetchGameChannels(viewContainerRef: ViewContainerRef) {
		const loader: ComponentRef<any> = this.loaderService.addLocalLoader(viewContainerRef, true, null, CssConfigs.loaderZIndex + 1).loaderVR;

		return this.apollo.use('mainService').query<any>({
			query: gql`
				query{
					countRoomOnEachGame(sort: DESC){
						_id
						name
					}
				}
			`,
			variables: { isUseGlobalLoader: false },
			context: {
				headers: new HttpHeaders().set(this.tokenTitle, this.ssToken)
			}
		}).pipe(
			map(({ data }): GameChannel[] => {
				let games: GameChannel[] = [];

				data.countRoomOnEachGame.forEach(game => {
					games.push(new GameChannel(game));
				})

				return games;
			}),
			finalize(() => {
				if (loader) {
					loader.destroy();
				}
			})
		);
	}
}
