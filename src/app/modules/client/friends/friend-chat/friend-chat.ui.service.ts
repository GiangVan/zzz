import { Injectable } from "@angular/core";
import { MyFriend } from '../friends.dto';

@Injectable({
	providedIn: "root"
})
export class FriendChatUIService {
	public showChatBoxFunc: (selectedFriend: MyFriend) => void;
	
	constructor() { }
}
