export class RoomType {
	static PUBLIC = 'public';
	static PRIVATE = 'private';
	static HIDDEN = 'hidden';

	static getList(): string[] {
		return ['public', 'private', 'hidden'];
	}
}

export class GameRoom {
	id: string;
	name: string;
	logoUrl: string;
	describe: string;
	backgroundUrl: string;
	isRequesting: boolean;
	hasJoined: boolean;
	maxMember: number;
	countMember: number;
	type: string;
	isRequestingFromClient: boolean = false;

	constructor(rawData){
		this.id = rawData._id;
		this.name = rawData.roomName;
		this.describe = rawData.description;
		this.logoUrl = rawData.roomLogo;
		this.backgroundUrl = rawData.roomBackground;
		this.hasJoined = rawData.isJoin;
		this.isRequesting = rawData.isRequest;
		this.maxMember = rawData.maxOfMember;
		this.countMember = rawData.countMember;
		this.type = rawData.roomType;
	}
}

export class ResultCRUD {
	success: string;
	message: string;

	constructor(rawData){
		this.success = rawData.success;
		this.message = rawData.message;
	}
}

export class Approve {
	requestId: string;
	roomId: string;
	isApprove: boolean;

	constructor(rawData){
		this.roomId = rawData.roomID;
		this.requestId = rawData._id;
		this.isApprove = rawData.isApprove;
	}
}