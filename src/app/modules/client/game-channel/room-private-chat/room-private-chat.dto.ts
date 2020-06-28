
// export class ResultCRUD {
// 	success: string;
// 	payload: any;
// 	message: string;
// 	status: number;

// 	constructor(rawData){
// 		this.success = rawData.success;
// 		this.payload = rawData.payload;
// 		this.status = rawData.status;
// 		this.message = rawData.message;
// 	}
// }

export class RoomDetail {
	id: string;
	name: string;
	logoUrl: string;
	backgroundUrl: string;

	constructor(rawData){
		this.id = rawData._id;
		this.name = rawData.roomName;
		this.logoUrl = rawData.roomLogo;
		this.backgroundUrl = rawData.roomBackground;
	}
}