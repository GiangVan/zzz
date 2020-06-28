export class AccountRelationShipType{
	static BLOCKED = 'BLOCKED';
	static STRANGER = 'STRANGER';
	static FRIEND = 'FRIEND';
	static FRIEND_REQUEST = 'FRIEND_REQUEST';
	static FROM_FRIEND_REQUEST = 'FROM_FRIEND_REQUEST';
}

export class AccountLookingResult {
	id: number;
	name: string;
	avatarUrl: string;
	describe: string;
	relationship: string;
	isRequesting: boolean = false;

	constructor(rawData = null){
		if (rawData && rawData.account){
			this.id = rawData.account.id;
			this.name = rawData.account.name;
			this.avatarUrl = rawData.account.avatar_url;
			this.describe = rawData.account.describe;
			this.relationship = rawData.relationship;
		}
	}
}
