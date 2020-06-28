import { Injectable } from "@angular/core";
import { GameChannel } from '../home.dto';

@Injectable({
	providedIn: "root"
})
export class HomeGameDetailsUIService {
	public seeGameDetailsFunc: (selectedGame: GameChannel) => void;
	
	constructor() { }
}
