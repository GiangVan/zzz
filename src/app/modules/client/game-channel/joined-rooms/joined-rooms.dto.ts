export class JoinedRoom {
	id: string;
	name: string;
	logoUrl: string;
	backgroundUrl: string;

	constructor(room) {
		this.id = room._id;
		this.name = room.roomName;
		this.backgroundUrl = room.roomBackground;
		this.logoUrl = room.roomLogo;
	}
}
