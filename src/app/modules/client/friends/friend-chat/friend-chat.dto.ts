// export class Friend {
// 	id: number;
// 	name: string;
// 	avatarUrl: string;

// 	constructor(friend) {
// 		this.id = friend.id;
// 		this.name = friend.name;
// 		this.avatarUrl = friend.avatar_url;
// 	}
// }

export class ResultCRUD {
	success: string;
	message: string;
	payload: string;

	constructor(rawData) {
		this.success = rawData.success;
		this.message = rawData.message;
		this.payload = rawData.payload;
	}
}

export class MessageTypes {
	static readonly TEXT = 'text';
	static readonly IMG = 'image';
	static readonly VIDEO = 'video';
	static readonly GIF = 'gif';
	static readonly URL = 'url';
	static readonly FILE = 'file';
}

export class SendingMessage {
	receiverId: number;
	messageType: string;
	text: { content: string };
	media: string;
}

export class Message {
	id: string;
	messageType: string;
	status: string;
	createdAt: Date;
	content: string;
	isMyMessage: boolean = false;

	constructor(raw = null) {
		if (raw) {
			this.id = raw.id;
			this.messageType = raw.messageType;
			this.status = raw.status;
			this.createdAt = raw.createAt;
			this.content = raw.text.content;
		}
	}
}
