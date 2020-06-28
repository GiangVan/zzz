export class LoggingResultStatus {
	static readonly FAIL = "FAIL";
	static readonly SUCCESS = "SUCCESS";
	static readonly WRONG_USERNAME = "WRONG_USERNAME";
	static readonly WRONG_PWD = "WRONG_PWD";
}

export class LoggingResult {
	token: string;
	status: string;
	describe: string[];

	constructor(rawData) {
		this.token = rawData.token;
		this.status = rawData.status;
		this.describe = rawData.describe;
	}
}
