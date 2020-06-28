export class GameChannel {
	id: string;
	name: string;

	constructor(raw) {
		this.id = raw._id;
		this.name = raw.name;
	}
}

export class RoomOption {
	isAbsolute: boolean;
	roomSize: number;
	gameId: string;
	isRoomFinding: boolean = false;

	constructor(isAbsolute: boolean, roomSize: number, gameId: string) {
		this.isAbsolute = isAbsolute;
		this.roomSize = roomSize;
		this.gameId = gameId;
	}
}

export class ResultCRUD {
	success: string;
	payload: any;
	message: string;
	status: number;

	constructor(rawData){
		this.success = rawData.success;
		this.payload = rawData.payload;
		this.status = rawData.status;
		this.message = rawData.message;
	}
}