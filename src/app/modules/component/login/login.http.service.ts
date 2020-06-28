import { Injectable } from "@angular/core";
import { GraphqlService } from "src/app/common/services/graphql.service";
import { ServiceUrls } from "src/environments/environment";
import { LoggingResult, LoggingResultStatus } from "./login.dto";
import gql from 'graphql-tag';
import { map } from 'rxjs/operators';
import { Apollo } from 'apollo-angular';

@Injectable({
	providedIn: "root"
})
export class LoginHttpService {
	private readonly amsUrl: string = ServiceUrls.accountManagement;

	constructor(private apollo: Apollo) { }

	login(
		name: string,
		pass: string
	) {
		return this.apollo.use('accountManagementService').query<any>({
			query: gql`
				query 
				{
					login(username: "${name}", pwd: "${pass}"){token, status}
				}
			`, 
			fetchPolicy: 'no-cache'
		}).pipe(map(
			({ data }): LoggingResult => new LoggingResult(data.login)
		));
	}
}
