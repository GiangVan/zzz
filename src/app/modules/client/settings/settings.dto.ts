
export class Settings {
	anonymous: boolean;
	birthmonthPrivacy: string;
	birthyearPrivacy: string;
	emailPrivacy: string;
	phonePrivacy: string;

	constructor(rawData = null) {
		if (rawData) {
			this.anonymous = rawData.anonymous;
			this.birthmonthPrivacy = rawData.birthmonth_privacy;
			this.birthyearPrivacy = rawData.birthyear_privacy;
			this.emailPrivacy = rawData.email_privacy;
			this.phonePrivacy = rawData.phone_privacy;
		}
	}
}

export class AccountEditingResult {
	status: string;
	describe: string;

	constructor(rawData) {
		this.status = rawData.status;
		this.describe = rawData.describe;
	}
}

export class AccountEditingResultStatus {
	static readonly FAIL = "FAIL";
	static readonly SUCCESS = "SUCCESS";
	static readonly ACC_NOT_FOUND = "ACC_NOT_FOUND";
}
