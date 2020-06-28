import { Component, OnInit, Injector, ViewChild, ViewContainerRef } from '@angular/core';
import { ClientCommonComponent } from '../client.common-component';
import { HomeLanguage } from './home.language';
import { HomeHttpService } from './home.http.service';
import { GameChannel } from './home.dto';
import { HomeGameDetailsUIService } from './home-game-details/home-game-details.ui.service';
import { trigger, transition, style, animate, stagger, query } from '@angular/animations';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css'],
	animations: [
		trigger('listAnimation', [
			transition('* => *', [
				query(':leave', [
					stagger(100, [
						animate('400ms ease', style({
							opacity: 0,
							transform: "translateY(100%)"
						}))
					])
				], { optional: true }),
				query(':enter', [
					style({
						opacity: 0,
						transform: "translateY(100%)"
					}),
					stagger(100, [
						animate('400ms ease', style({
							opacity: 1,
							transform: "translateY(0%)"
						}))
					])
				], { optional: true })
			])
		])
	],
})
export class HomeComponent extends ClientCommonComponent implements OnInit {
	@ViewChild('loaderLocation', { static: true, read: ViewContainerRef }) loaderLocationVR: ViewContainerRef;
	games: GameChannel[] = [];
	selectedGame: GameChannel;

	constructor(
		private homeHttpService: HomeHttpService,
		private homeGameDetailsUIService: HomeGameDetailsUIService,
		protected injector: Injector
	) {
		super(injector);
		HomeLanguage.define(this.translateService);

	}
	
	ngOnInit() {
		this.fetchGameChannels();
	}

	seeGameDetails(game: GameChannel) {
		this.homeGameDetailsUIService.seeGameDetailsFunc(game);
		this.selectedGame = game;
	}

	fetchGameChannels() {
		this.homeHttpService.fetchGameChannels(this.loaderLocationVR).subscribe(data => {
			this.games = data;
		})
	}
}
