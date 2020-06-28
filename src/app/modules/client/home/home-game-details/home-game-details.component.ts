import { Component, OnInit, Input, Injector } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ClientCommonComponent } from '../../client.common-component';
import { HomeGameDetailsLanguage } from './home-game-details.language';
import { GameChannel } from '../home.dto';
import { HomeGameDetailsUIService } from './home-game-details.ui.service';
import { ClientDataService } from '../../client.data.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { delay } from 'rxjs/operators';

@Component({
	selector: 'app-home-game-details',
	templateUrl: './home-game-details.component.html',
	styleUrls: ['./home-game-details.component.css'],
	animations: [
		trigger('title1SlideIn', [
			transition(':enter', [
				style({
					marginRight: '-350px',
					opacity: 0
				}),
				animate('720ms ease', style({
					marginRight: '2px',
					opacity: 1
				}))
			])
		]),
		trigger('title2SlideIn', [
			transition(':enter', [
				style({
					marginRight: '-200px',
					opacity: 0
				}),
				animate('920ms 200ms ease', style({
					marginRight: '2px',
					opacity: 1
				}))
			])
		]),
	],
})
export class HomeGameDetailsComponent extends ClientCommonComponent implements OnInit {
	game: GameChannel;

	constructor(
		protected injector: Injector,
		private homeGameDetailsUIService: HomeGameDetailsUIService
	) {
		super(injector);
		HomeGameDetailsLanguage.define(this.translateService);

		this.homeGameDetailsUIService.seeGameDetailsFunc = (game: GameChannel) => {
			this.game = game;
			this.clientDataService.setCurrentGameChannelId(game.id);
		};
	}

	ngOnInit() {
	}
}
