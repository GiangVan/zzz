import { Injectable, ViewContainerRef, ViewRef, Injector, ComponentRef } from "@angular/core";
import { Apollo } from 'apollo-angular';
import { AuthService } from "src/app/common/services/auth.service";
import gql from 'graphql-tag';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map, finalize } from 'rxjs/operators';
import { FeedbackServiceResponse, Feedback } from './feedback.dto';
import { ServiceUrls } from 'src/environments/environment';
import { ClientCommonService } from '../client.common-service';
import { LoaderOptions } from 'src/app/common/dialogs/loader/loader.dto';

@Injectable({
	providedIn: "root"
})
export class FeedbackHttpService extends ClientCommonService {
	readonly feedbackUrl: string;

	constructor(
		protected injector: Injector
	) {
		super(injector);
		this.feedbackUrl = ServiceUrls.feedback;
	}

	sendFeedback(feedback: Feedback, viewContainerRef: ViewContainerRef) {
		const loader: ComponentRef<any> = this.loaderService.addLocalLoader(viewContainerRef).loaderVR;
		feedback['variables'] = { isUseGlobalLoader: false };

		return this.http.post<FeedbackServiceResponse>(this.feedbackUrl + '/send', feedback).pipe(
			finalize(
				() => loader.destroy()
			)
		);
	}
}
