import { Injectable, ViewContainerRef, ViewRef, Injector, ComponentRef } from "@angular/core";
import { Apollo } from 'apollo-angular';
import { AuthService } from "src/app/common/services/auth.service";
import gql from 'graphql-tag';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { map, tap, finalize, switchMap } from 'rxjs/operators';
import { ServiceUrls } from 'src/environments/environment';
import { AccountLookingResult } from './search-friends.dto';
import { LoaderService } from 'src/app/common/dialogs/loader/loader.service';
import { LocalLoader } from 'src/app/common/dialogs/loader/loader.dto';
import { ClientCommonService } from '../../client.common-service';

@Injectable({
	providedIn: "root"
})
export class SearchFriendsHttpService extends ClientCommonService {
	readonly ssToken: string;
	readonly tokenTitle: string;

	constructor(
		protected injector: Injector,
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

	search(searchKey: string, viewContainerRef: ViewContainerRef) {
		const loader: ComponentRef<any> = this.loaderService.addLocalLoader(viewContainerRef, false).loaderVR;

		return this.apollo.use('accountManagementService').query<any>({
			query: gql`
				query 
				{
					searchAccounts(key: "${searchKey}"){
						account{
							id
							name
							avatar_url
							describe
						}
						relationship
					}
				}
			`,
			context: {
				headers: new HttpHeaders().set(this.tokenTitle, this.ssToken)
			},
			fetchPolicy: 'no-cache',
			variables: {
				isUseGlobalLoader: false
			}
		}).pipe(
			map(
				({ data }): AccountLookingResult[] => {
					let accountLookingResults: AccountLookingResult[] = [];

					data.searchAccounts.forEach(accountLookingResult => {
						if(accountLookingResult.account){
							accountLookingResults.push(new AccountLookingResult(accountLookingResult));
						}
					})

					return accountLookingResults;
				}
			),
			finalize(() => loader.destroy())
		);
	}
}
