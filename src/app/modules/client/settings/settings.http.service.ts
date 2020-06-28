import { Injectable, Injector } from "@angular/core";
import { Apollo } from 'apollo-angular';
import { AuthService } from "src/app/common/services/auth.service";
import gql from 'graphql-tag';
import { HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Settings, AccountEditingResult } from './settings.dto';
import { ClientCommonService } from '../client.common-service';

const GET_SETTINGS = gql`
	query{
		getThisAccount {
			id
			setting {
				anonymous
				birthmonth_privacy
				birthyear_privacy
				email_privacy
				phone_privacy
			}
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class SettingsHttpService extends ClientCommonService {
	readonly ssToken: string;
	readonly tokenTitle: string;

	constructor(
		protected injector: Injector
	) {
		super(injector);
		this.ssToken = this.authService.getSessionToken();
		this.tokenTitle = this.authService.getTokenTitle();
	}

	fetchSettings() {
		return this.apollo.use('accountManagementService').query<any>({
			query: GET_SETTINGS,
			context: {
				headers: new HttpHeaders().set(this.tokenTitle, this.ssToken)
			}
		}).pipe(map(
			({ data }): Settings => new Settings(data.getThisAccount.setting)
		));
	}

	updateSettings(settings: Settings) {
		return this.apollo.use('accountManagementService').mutate<any>({
			mutation: gql`
				mutation{
					editThisAccount(account:{
						setting:{
							anonymous:${settings.anonymous}
							birthyear_privacy:${settings.birthmonthPrivacy}
							birthyear_privacy:${settings.birthyearPrivacy}
							email_privacy:${settings.emailPrivacy}
							phone_privacy:${settings.phonePrivacy}
						}
					}){
						status
						describe
					}
			}`,
			context: {
				headers: new HttpHeaders().set(this.tokenTitle, this.ssToken)
			}
		}).pipe(map(
			({ data }): AccountEditingResult => new AccountEditingResult(data.editThisAccount)
		));
	}
}
