import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, OnDestroy, ViewContainerRef, Injector, ComponentRef } from "@angular/core";
import { CssConfigs } from 'src/environments/environment';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
	selector: "common-alert",
	template: `
		<div class="box">
			<p class="text-wrap">{{ message }}</p>
			<div class="d-flex">
				<button *ngIf='buttonName.length > 0' class="btn mr-3" (click)='callback()' (click)='destroy()'>{{ buttonName }}</button>
				<button class="btn btn-border" (click)='destroy()'>Cancel</button>
			</div>
		</div>
	`,
	styles: [`
		.box {
			width: 500px;
			height: 240px;
		}
	`]
})
export class AlertComponent {
	message: string = '';
	buttonName: string;
	callback: () => void;
	destroy: () => void;

	constructor(private viewContainerRef: ViewContainerRef, private injector: Injector) {
		const data = this.injector.get('data');
		this.destroy = this.injector.get('destroy');
		this.callback = data.callback;
		this.buttonName = data.buttonName;
		this.message = data.message;
	}
}
