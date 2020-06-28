export class Room {
	id: string;
	name: string;
	logoUrl: string;
	isRequesting: boolean;
	hasJoined: boolean;
	isRequestingFromClient: boolean = false;

	constructor(rawData){
		this.id = rawData._id;
		this.name = rawData.roomName;
		this.logoUrl = rawData.roomLogo;
		this.hasJoined = rawData.isJoin;
		this.isRequesting = rawData.isRequest;
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