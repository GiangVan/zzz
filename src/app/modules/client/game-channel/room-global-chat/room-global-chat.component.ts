import { Component, OnInit, Injector } from '@angular/core';
import { ClientCommonComponent } from '../../client.common-component';
import { RoomGlobalChatLanguage } from './room-global-chat.language';
import { environment } from 'src/environments/environment';

@Component({
	selector: 'app-room-global-chat',
	templateUrl: './room-global-chat.component.html',
	styleUrls: ['./room-global-chat.component.css']
})
export class RoomGlobalChatComponent extends ClientCommonComponent implements OnInit {
	searchKey: string;

	constructor(
		protected injector: Injector,
	) {
		super(injector);
		RoomGlobalChatLanguage.define(this.translateService);
	}

	ngOnInit() {
	}


	searchBoxKeyPressEvent(event: KeyboardEvent) {
		if (event.keyCode === 13 && !environment.production) {
			event.preventDefault();
			event.stopPropagation();

			switch (this.searchKey.toLocaleLowerCase()) {
				case 'view':
					console.log(this.dialogService.getViewContainerRef());
					break;
				case 'url':
					alert(this.router.url);
					break;
				case 'router':
					console.log(this.router);
					break;
				case 'route':
					console.log(this.route);
					break;
				case 'clientdata':
					console.log(this.clientDataService);
					break;
			}
			this.searchKey = '';
		}

		
	}
}
