import { Injectable, Injector } from '@angular/core';
import { ServiceUrls } from 'src/environments/environment';
import { SendingMessage } from './friend-chat.dto';
import { ClientCommonService } from '../../client.common-service';
import { SocketioHelper } from 'src/app/common/helpers/socketio';
import { MyFriend } from '../friends.dto';
import { FriendChatHttpService } from './friend-chat.http.service';

@Injectable({
	providedIn: "root"
})
export class FriendChatSocketService extends ClientCommonService {
	private socket;

	constructor(
		protected injector: Injector,
		private friendChatHttpService: FriendChatHttpService
	) {
		super(injector);
	}

	initSocket(
		friend: MyFriend,
		onFunc: (message: string) => void,
		emitFunc: (
			sendMessage: (message: SendingMessage) => void
		) => void
		// ,
		// onChatId: (chatId: string) => void
	) {
		if (this.socket) {
			this.socket.disconect();
		}

		this.socket = SocketioHelper.init(ServiceUrls.chat, {
			transportOptions: {
				polling: {
					extraHeaders: {
						token: this.authService.getSessionToken()
					}
				}
			}
		});

		if (friend.chatId) {
			this.socket.emit('join-chat-private', { roomID: friend.chatId });
		} else {
			this.friendChatHttpService.createPrivateChat(friend.id).subscribe(data => {
				this.socket.emit('join-chat-private', { roomID: data.payload });
				friend.chatId = data.payload;
			});
		}
		// this.socket.emit('request-socket-id');
		// this.socket.on('get-socket-id', (chatId: string) => {
		// 	this.chatId = chatId;
		// 	this.socket.emit('join-chat-private', {roomID: this.chatId});
		// 	onChatId(chatId);
		// });
		emitFunc((message: SendingMessage) => {
			this.socket.emit('chat-private', [
				{ chatID: friend.chatId },
				message
			]);
		});
		this.socket.on('receive-message-private', (message: string) => {
			onFunc(message);
			// onFunc(message, this.chatId);
		});
	}
}
