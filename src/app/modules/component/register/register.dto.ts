export class AccountRegistrationResultStatus {
	static readonly FAIL = "FAIL";
	static readonly SUCCESS = "SUCCESS";
	static readonly NAMESAKE = "NAMESAKE";
}


export class RegistrationAccount {
	loginName: string;
	name: string;
	pass: string;

	constructor() {
	}
}

export class AccountRegistrationResult  {
	token: string;
	status: string;

	constructor(rawData) {
		this.token = rawData.token;
		this.status = rawData.status;
	}
}
