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
	coverUrl: string;
	describe: string;
	email: string;
	phone: string;
	birthmonth: string;
	birthyear: string;
	createdAt: string;
	relationship: string;
	isFollowing: boolean;
	countFollowers: number;
	isRequesting: boolean = false;

	constructor(rawData = null){
		if (rawData && rawData.account){
			this.id = rawData.account.id;
			this.name = rawData.account.name;
			this.avatarUrl = rawData.account.avatar_url;
			this.coverUrl = rawData.account.cover_url;
			this.describe = rawData.account.describe;
			this.email = rawData.account.email;
			this.phone = rawData.account.phone;
			this.birthmonth = rawData.account.birthmonth;
			this.birthyear = rawData.account.birthyear;
			this.createdAt = rawData.account.created_at;
			this.isFollowing = rawData.account.is_following;
			this.countFollowers = rawData.account.count_followers;
			this.relationship = rawData.relationship;
		}
	}
}
