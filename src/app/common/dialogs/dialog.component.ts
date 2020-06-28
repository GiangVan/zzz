import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, OnDestroy, ViewContainerRef, Injector, ComponentRef, Type } from "@angular/core";
import { CssConfigs } from 'src/environments/environment';
import { trigger, transition, style, animate } from '@angular/animations';
import { DialogService } from './dialog.service';
import { PopupOptions } from './dialog.dto';

@Component({
	selector: "common-dialog",
	templateUrl: './dialog.component.html',
	styleUrls: ['./dialog.component.css'],
	animations: [
		trigger('fadeInOut', [
			transition(':enter', [
				style({ opacity: 0 }),
				animate('220ms ease', style({ opacity: 1 }))
			]),
			transition(':leave', [
				animate('220ms ease', style({ opacity: 0 }))
			])
		])
	],
	host: { '[@fadeInOut]': '' }
})
export class DialogComponent implements OnInit, OnDestroy, AfterViewInit {
	@ViewChild('popup', { static: true }) popupER: ElementRef;
	@ViewChild('exitBtn', { static: true }) exitBtnER: ElementRef;
	@ViewChild('insertedComponentLocation', { static: true, read: ViewContainerRef }) insertedComponentLocationVR: ViewContainerRef;
	data: any;
	destroyIfOutFocus: boolean;
	useBackground: boolean;
	dialogType: Type<any>;
	destroy: () => void;
	popup: PopupOptions;
	outFocusHandler: (event) => void;

	constructor(
		private dialogService: DialogService,
		private viewContainerRef: ViewContainerRef,
		private injector: Injector
	) {
		const data = this.injector.get('data');
		this.destroy = this.injector.get('destroy');

		this.popup = data.popupOptions;
		this.useBackground = data.useBackground;
		this.data = data.data;
		this.destroyIfOutFocus = data.destroyIfOutFocus;
		this.dialogType = data.dialogType;
	}

	ngOnInit() {
		this.initPopup(this.initComponent());
		if (this.useBackground) {
			this.initBackground();
		}

		if (this.destroyIfOutFocus) {
			this.addDestroyingOutFocusListener();
		}
	}

	ngAfterViewInit() {
		const bonus: number = 6;
		const popup = this.popupER.nativeElement.getBoundingClientRect();
		const window = document.body.getBoundingClientRect();
		//prevent popup to height
		if(popup.top + popup.height > window.height){
			this.viewContainerRef.element.nativeElement.style.top = window.height - bonus - popup.height + 'px';
		}
		//prevent popup to width
		if(popup.left + popup.width > window.width){
			this.viewContainerRef.element.nativeElement.style.left = window.width - bonus - popup.width + 'px';
		}
	}

	ngOnDestroy() {
		this.removeDestroyingOutFocusListener();
	}

	private initPopup(insertedComponent: ComponentRef<any>) {
		if (this.popup) {
			insertedComponent.location.nativeElement.style.width = '100%';
			insertedComponent.location.nativeElement.style.height = '100%';

			if (this.popup.width) {
				this.popupER.nativeElement.style.width = this.popup.width;
			}
			if (this.popup.height) {
				this.popupER.nativeElement.style.height = this.popup.height;
			}
			if (this.popup.classList) {
				this.popupER.nativeElement.setAttribute('class', this.popupER.nativeElement.getAttribute('class') + ' ' + this.popup.classList);
			}
			this.popupER.nativeElement.style.backgroundColor = this.popup.backgroundColor;

			if (this.popup.useExitBtn) {
				this.exitBtnER.nativeElement.style.display = 'block';
			}
		}
	}

	private initBackground() {
		this.viewContainerRef.element.nativeElement.style.position = 'absolute';
		this.viewContainerRef.element.nativeElement.style.left = 0;
		this.viewContainerRef.element.nativeElement.style.top = 0;
		this.viewContainerRef.element.nativeElement.style.width = '100%';
		this.viewContainerRef.element.nativeElement.style.height = '100%';
		this.viewContainerRef.element.nativeElement.style.backgroundColor = 'rgba(0, 0, 0, .9)';
	}

	private initComponent(): ComponentRef<any> {
		const result = this.dialogService.putDialogComponentToComponent({
			dialogType: this.dialogType,
			viewContainerRef: this.insertedComponentLocationVR,
			data: this.data,
			destroyCallback: this.destroy
		}).componentRef;

		return result;
	}

	private addDestroyingOutFocusListener() {
		this.outFocusHandler = (event: MouseEvent) => {
			const isRightMB = event.which == 3;

			if (!isRightMB && !this.popupER.nativeElement.contains(event.target)) {
				this.destroy();
				return false;
			}
		}
		this.viewContainerRef.element.nativeElement.addEventListener('mousedown', this.outFocusHandler);
	}

	private removeDestroyingOutFocusListener() {
		if (this.outFocusHandler) {
			this.viewContainerRef.element.nativeElement.removeEventListener('mousedown', this.outFocusHandler);
		}
	}
}
