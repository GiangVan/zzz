export class RoomType {
	static PUBLIC = 'public';
	static PRIVATE = 'private';
	static HIDDEN = 'hidden';

	static getList(): string[] {
		return ['public', 'private', 'hidden'];
	}
}

export class RoomInput {
	name: string;
	describe: string = '';
	type: string;
	maxMember: number;
}

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
