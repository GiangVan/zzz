import { Component, OnInit, Injector, ViewChild, ElementRef, ViewContainerRef, OnDestroy } from '@angular/core';
import { FeedbackHttpService } from './feedback.http.service';
import { Feedback, FeedbackServiceResponseTypes } from './feedback.dto';
import { trigger, transition, style, animate } from '@angular/animations';
import { FeedbackLanguage } from './feedback.language';
import { ClientCommonComponent } from '../client.common-component';

@Component({
	selector: 'app-feedback',
	templateUrl: './feedback.component.html',
	styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent extends ClientCommonComponent {
	@ViewChild('loaderLocation', { static: true, read: ViewContainerRef }) loaderLocationVR: ViewContainerRef;
	destroy: () => void;
	feedback: Feedback = new Feedback();

	constructor(
		protected injector: Injector,
		private viewContainerRef: ViewContainerRef,
		private feedbackHttpService: FeedbackHttpService
	) {
		super(injector);
		const data = this.injector.get('data');
		this.destroy = this.injector.get('destroy');
		this.feedback.accountId = data.accountId;
		FeedbackLanguage.define(this.translateService);
	}

	sendFeedback() {
		if (this.feedback.content) {
			this.feedbackHttpService.sendFeedback(this.feedback, this.loaderLocationVR).subscribe(result => {
				if (result.status === FeedbackServiceResponseTypes.SUCCESSFUL) {
					this.destroy();
				} else {
					this.alertService.show(result.describe);
				}
			});
		}
	}
}
