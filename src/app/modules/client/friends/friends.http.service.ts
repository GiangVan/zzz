import { Injectable, Injector, ViewContainerRef, ComponentRef } from "@angular/core";
import { Apollo } from 'apollo-angular';
import { MyFriend, Chat } from "./friends.dto";
import { AuthService } from "src/app/common/services/auth.service";
import gql from 'graphql-tag';
import { HttpHeaders } from '@angular/common/http';
import { map, finalize } from 'rxjs/operators';
import { ClientCommonService } from '../client.common-service';

const MY_FRIENDS = gql`
  	query 
	{
		getFriends{ friend{ id, name, avatar_url }}
	}
`;

@Injectable({
	providedIn: "root"
})
export class FriendsHttpService extends ClientCommonService {
	readonly ssToken: string;
	readonly tokenTitle: string;

	constructor(
		protected injector: Injector
	) {
		super(injector);
		this.ssToken = this.authService.getSessionToken();
		this.tokenTitle = this.authService.getTokenTitle();
	}

	fetchFriends(viewContainerRef: ViewContainerRef, reload: boolean = false) {
		const loader: ComponentRef<any> = this.loaderService.addLocalLoader(viewContainerRef, false, 'position-top-left position-absolute w-100 h-100 bg7 d-flex justify-content-center align-items-center').loaderVR;

		return this.apollo.use('accountManagementService').query<any>({
			query: MY_FRIENDS,
			fetchPolicy: reload ? 'no-cache' : null,
			variables: { isUseGlobalLoader: false },
			context: {
				headers: new HttpHeaders().set(this.tokenTitle, this.ssToken)
			}
		}).pipe(
			map(({ data }): MyFriend[] => {
				let friends: MyFriend[] = [];

				data.getFriends.forEach(friend => {
					friends.push(new MyFriend(friend.friend));
				})

				return friends;
			}),
			finalize(() => {
				if (loader) {
					loader.destroy();
				}
			})
		);
	}

	protected convertFriendIdsToString(friends: MyFriend[]): string {
		let result = '';

		friends.forEach((friend: MyFriend) => {
			result += `"${friend.id},"`;
		});

		return result.length > 0 ? result.substring(0, result.length - 1) : '';
	}

	fetchAllChats(friends: MyFriend[], reload: boolean = true) {
		//, ids:[${this.convertFriendIdsToString(friends)}]
		return this.apollo.use('mainService').query<any>({
			query: gql`
				query{
					getAllPrivateChat(page:1, limit:20){
						_id
						member
						latest_message{
							text{
								content
							}
						}
					}
				}
			`,
			fetchPolicy: reload ? 'no-cache' : null,
			variables: { isUseGlobalLoader: false },
			context: {
				headers: new HttpHeaders().set(this.tokenTitle, this.ssToken)
			}
		}).pipe(
			map(({ data }): Chat[] => {
				let chats: Chat[] = [];

				data.getAllPrivateChat.forEach(chat => {
					chats.push(new Chat(chat));
				})

				return chats;
			}));
	}
}
