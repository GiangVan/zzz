import { Component, OnInit, Input, Injector, ViewChild, ViewContainerRef } from '@angular/core';
import { FriendChatHttpService } from './friend-chat.http.service';
import { FriendChatUIService } from './friend-chat.ui.service';
import {  SendingMessage, MessageTypes, Message } from './friend-chat.dto';
import { MyFriend } from '../friends.dto';
import { TranslateService } from '@ngx-translate/core';
import { FriendChatLanguage } from './friend-chat.language';
import { ClientCommonComponent } from '../../client.common-component';
import { FriendChatSocketService } from './friend-chat.socket.service';

@Component({
	selector: 'app-friend-chat',
	templateUrl: './friend-chat.component.html',
	styleUrls: ['./friend-chat.component.css']
})
export class FriendChatComponent extends ClientCommonComponent implements OnInit {
	@ViewChild('loaderLocation', { static: true, read: ViewContainerRef }) loaderLocationVR: ViewContainerRef;
	chatFriend: MyFriend;
	messages: Message[] = [];
	currentMessageContent: string;
	protected sendMessage: (message: SendingMessage) => void;

	constructor(
		protected injector: Injector,
		private friendHttpService: FriendChatHttpService,
		private friendChatSocketService: FriendChatSocketService,
		private friendChatUIService: FriendChatUIService
	) {
		super(injector);
		this.friendChatUIService.showChatBoxFunc = (friend: MyFriend) => {
			this.chatFriend = friend;
			this.initSocket();
		};
		FriendChatLanguage.define(this.translateService);
	}

	ngOnInit() {

	}

	protected initSocket() {
		this.friendChatSocketService.initSocket(
			this.chatFriend,
			(text: string) => {
				const message = new Message();
				message.content = text;
				this.messages.push(message);
			},
			(sendMessage: (message: SendingMessage) => void) => {
				this.sendMessage = sendMessage;
			},
			// (chatId: string) => {
			// 	this.fetchMessages(chatId);
			// }
		);
	}

	protected onMessages(messageContent: string) {
		this.pushMessageToStore(messageContent);
	}

	protected pushMessageToStore(messageContent: string, isMyMessage: boolean = false) {
		const message = new Message();
		message.content = messageContent;
		message.isMyMessage = isMyMessage;
		message.messageType = MessageTypes.TEXT;

		this.messages.push(message);
	}

	protected fetchMessages(chatId: string) {
		this.friendHttpService.fetchMessages(chatId, this.loaderLocationVR).subscribe(messages => {
			this.messages = messages;
		});
	}

	chatBoxKeyPessEvent(event: KeyboardEvent) {
		if (event.keyCode === 13) {
			event.preventDefault();
			event.stopPropagation();

			this.handleMessagesSending();
		}
	}

	handleMessagesSending() {
		const sedingMessage = new SendingMessage();
		sedingMessage.text = { content: this.currentMessageContent };

		if (sedingMessage.text.content.length > 0) {
			sedingMessage.messageType = MessageTypes.TEXT;
			sedingMessage.receiverId = this.chatFriend.id;

			this.sendMessage(sedingMessage);
			this.pushMessageToStore(this.currentMessageContent, true);
			this.currentMessageContent = '';
		}
	}
}
