import { Component, OnInit, Injector } from '@angular/core';
import { trigger, state, transition, animate, style } from '@angular/animations';
import { ClientCommonComponent } from '../../../client.common-component';
import { RoomPrivateChatPostLanguage } from './room-private-chat-post.language';

@Component({
	selector: 'app-room-private-chat-post',
	templateUrl: './room-private-chat-post.component.html',
	styleUrls: ['./room-private-chat-post.component.css'],
	animations: [
		trigger('changeContainerState', [
			state('expand', style({
				width: '360px',
				minWidth: '360px'
			})),
			state('collapse', style({
				width: '15px',
				minWidth: '15px'
			})),
			transition('*=>expand', animate('100ms ease')),
			transition('*=>collapse', animate('100ms ease'))
		])
	]
})
export class RoomPrivateChatPostComponent extends ClientCommonComponent implements OnInit {
	containerState: string = 'expand';

	constructor(
		protected injector: Injector,
	) {
		super(injector);
		RoomPrivateChatPostLanguage.define(this.translateService);
	}

	ngOnInit() {
	}


	resizeContainer() {
		if (this.containerState === 'expand') {
			this.containerState = 'collapse';
		} else {
			this.containerState = 'expand';
		};
	}
}
