export class GameChannel {
	id: string;
	name: string;
	roomNumber: number;
	backgroundUrl: string;

	constructor(raw = null) {
		if (raw) {
			this.id = raw._id;
			this.name = raw.name;
			this.roomNumber = raw.count;
			this.backgroundUrl = raw.background;
		}
	}
}
