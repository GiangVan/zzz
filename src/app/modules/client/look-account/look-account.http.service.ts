import { Injectable, Injector } from "@angular/core";
import { Apollo } from 'apollo-angular';
import { AuthService } from "src/app/common/services/auth.service";
import gql from 'graphql-tag';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { AccountLookingResult } from './look-account.dto';
import { ClientCommonService } from '../client.common-service';

@Injectable({
	providedIn: "root"
})
export class LookAccountHttpService extends ClientCommonService {
	readonly ssToken: string;
	readonly tokenTitle: string;

	constructor(
		protected injector: Injector
	) {
		super(injector);
		this.ssToken = this.authService.getSessionToken();
		this.tokenTitle = this.authService.getTokenTitle();
	}


	sendFriendRequest(id: number) {
		return this.apollo.use('accountManagementService').mutate<any>({
			mutation: gql`
				mutation 
				{
					sendFriendRequest(receiver_id: ${id})
				}
			`,
			context: {
				headers: new HttpHeaders().set(this.tokenTitle, this.ssToken)
			},
			variables: {
				isUseGlobalLoader: false
			}
		}).pipe(map(
			({ data }): boolean => data.sendFriendRequest
		));
	}

	unsendFriendRequest(id: number) {
		return this.apollo.use('accountManagementService').mutate<any>({
			mutation: gql`
				mutation 
				{
					removeFriendRequest(receiver_id: ${id})
				}
			`,
			context: {
				headers: new HttpHeaders().set(this.tokenTitle, this.ssToken)
			},
			variables: {
				isUseGlobalLoader: false
			}
		}).pipe(map(
			({ data }): boolean => data.removeFriendRequest
		));
	}

	acceptFriendRequest(id: number) {
		return this.apollo.use('accountManagementService').mutate<any>({
			mutation: gql`
				mutation 
				{
					confirmFriendRequest(sender_id: ${id}, is_confirm: true)
				}
			`,
			context: {
				headers: new HttpHeaders().set(this.tokenTitle, this.ssToken)
			},
			variables: {
				isUseGlobalLoader: false
			}
		}).pipe(map(
			({ data }): boolean => data.confirmFriendRequest
		));
	}

	cancelFriendRequest(id: number) {
		return this.apollo.use('accountManagementService').mutate<any>({
			mutation: gql`
				mutation 
				{
					confirmFriendRequest(sender_id: ${id}, is_confirm: false)
				}
			`,
			context: {
				headers: new HttpHeaders().set(this.tokenTitle, this.ssToken)
			},
			variables: {
				isUseGlobalLoader: false
			}
		}).pipe(map(
			({ data }): boolean => data.confirmFriendRequest
		));
	}


	look(id: number) {
		return this.apollo.use('accountManagementService').query<any>({
			query: gql`
				query 
				{
					lookAccount(ids: [${id}]){
						account{
							id
							name
							avatar_url
							cover_url
							describe
							email
							is_following
							count_followers
							phone
							birthmonth
							birthyear
							created_at
						}
						relationship
					}
				}
			`,
			context: {
				headers: new HttpHeaders().set(this.tokenTitle, this.ssToken)
			},
			fetchPolicy: 'no-cache'
		}).pipe(map(
			({ data }): AccountLookingResult => new AccountLookingResult(data.lookAccount[0])
		));
	}
}
