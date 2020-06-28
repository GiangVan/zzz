import { Injectable } from "@angular/core";
import { GraphqlService } from "src/app/common/services/graphql.service";
import { ServiceUrls } from "src/environments/environment";
import gql from 'graphql-tag';
import { map } from 'rxjs/operators';
import { Apollo } from 'apollo-angular';
import { AccountRegistrationResult, RegistrationAccount } from './register.dto';

@Injectable({
	providedIn: "root"
})
export class RegisterHttpService {
	private readonly amsUrl: string = ServiceUrls.accountManagement;

	constructor(private apollo: Apollo) { }

	register(account: RegistrationAccount) {
		return this.apollo.use('accountManagementService').mutate<any>({
			mutation: gql`
				mutation{
					register(account:{
						login_name:"${account.loginName}"
						name:"${account.name}"
						password:"${account.pass}"
					}){
						token
						status
					}
				}
			`,
			fetchPolicy: 'no-cache'
		}).pipe(map(
				({ data }): AccountRegistrationResult => new AccountRegistrationResult(data.register)
			));
	}
}
