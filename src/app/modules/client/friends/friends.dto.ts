export class MyFriend {
	id: number;
	name: string;
	avatarUrl: string;
	latestMessage: string;
	chatId: string;

	constructor(friend) {
		this.id = friend.id;
		this.name = friend.name;
		this.avatarUrl = friend.avatar_url;
	}
}


export class Chat {
	id: string;
	latestMessage: string;
	members: string[];

	constructor(raw) {
		this.id = raw._id;
		this.members = raw.member;
		if(raw.latest_message){
			this.latestMessage = raw.latest_message.text.content;
		}
	}
}