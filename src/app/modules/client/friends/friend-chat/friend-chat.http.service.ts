import { Injectable, Injector, ViewContainerRef, ComponentRef } from "@angular/core";
import { ClientCommonService } from '../../client.common-service';
import gql from 'graphql-tag';
import { HttpHeaders } from '@angular/common/http';
import { finalize, map } from 'rxjs/operators';
import { Message, ResultCRUD } from './friend-chat.dto';

@Injectable({
	providedIn: "root"
})
export class FriendChatHttpService extends ClientCommonService {
	readonly ssToken: string;
	readonly tokenTitle: string;

	constructor(
		protected injector: Injector
	) {
		super(injector);
		this.ssToken = this.authService.getSessionToken();
		this.tokenTitle = this.authService.getTokenTitle();
	}

	createPrivateChat(friendId: number) {
		return this.apollo.use('mainService').mutate<any>({
			mutation: gql`
				mutation 
				{
					createPrivateChat(input:{friendID:"${friendId}"}){
						payload
						success
						message
					}
				}
			`,
			context: {
				headers: new HttpHeaders().set(this.tokenTitle, this.ssToken)
			},
		}).pipe(map(
			({ data }): ResultCRUD => new ResultCRUD(data.createPrivateChat)
		));
	}

	fetchMessages(chatId: string, viewContainerRef: ViewContainerRef, reload: boolean = false) {
		const loader: ComponentRef<any> = this.loaderService.addLocalLoader(viewContainerRef, false, 'position-top-left position-absolute w-100 h-100 bg8 d-flex justify-content-center align-items-center').loaderVR;

		return this.apollo.use('mainService').query<any>({
			query: gql`
				query{
					getPrivateChatMessage(chatID:"${chatId}", page: 1, limit: 20){
						id
						messageType
						status
						text{
							content
						}
						createAt
					}
				}
			`,
			fetchPolicy: reload ? 'no-cache' : null,
			variables: { isUseGlobalLoader: false },
			context: {
				headers: new HttpHeaders().set(this.tokenTitle, this.ssToken)
			}
		}).pipe(
			map(({ data }): Message[] => {
				let messages: Message[] = [];

				data.getPrivateChatMessage.forEach(message => {
					messages.push(new Message(message));
				})

				return messages;
			}),
			finalize(() => {
				if (loader) {
					loader.destroy();
				}
			})
		);
	}
}
