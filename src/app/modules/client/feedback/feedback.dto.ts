export class Feedback {
	accountId: number;
	content: string;

	constructor() { }
}

export class FeedbackServiceResponseTypes{
	static SUCCESSFUL = "SUCCESSFUL";
	static FAILED = "FAILED";
}

export class FeedbackServiceResponse{
	status: string;
	data: any;
	describe: string;

	constructor(rawData = null){
		if (rawData){
			this.status = rawData.status;
			this.data = rawData.data;
			this.describe = rawData.describe;
		}
	}
}
