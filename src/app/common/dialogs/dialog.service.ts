import { Injectable, ComponentFactoryResolver, ViewContainerRef, Injector, HostListener, ElementRef, Type, ViewRef, ComponentRef } from "@angular/core";
import { DialogComponent } from './dialog.component';
import { CssConfigs } from 'src/environments/environment';
import { PopupOptions } from './dialog.dto';

@Injectable({
	providedIn: "root"
})
export class DialogService {
	protected viewContainerRef: ViewContainerRef;

	constructor(protected factoryResolver: ComponentFactoryResolver) { }

	setViewContainerRef(viewContainerRef: ViewContainerRef) {
		this.viewContainerRef = viewContainerRef;
	}

	getViewContainerRef() {
		return this.viewContainerRef;
	}

	addDialogComponentToComponentPuttingEvent(
		{
			dialogType,
			anchorElement,
			anchorTo = null,
			viewContainerRef = null,
			destroyIfOutFocus = false,
			useBackground = false,
			zIndex = null,
			data = null,
			popupOptions = null,
			isPreventDefault = true
		},
	) {
		anchorElement.addEventListener('mousedown', (event: MouseEvent) => {
			if (isPreventDefault) {
				event.stopPropagation();
				event.preventDefault();
			}
			this.putDialogComponentToComponentWithOptions(
				{
					dialogType: dialogType,
					anchorElement: anchorElement,
					anchorTo: anchorTo,
					viewContainerRef: viewContainerRef,
					useBackground: useBackground,
					destroyIfOutFocus: destroyIfOutFocus,
					data: data,
					zIndex: zIndex,
					popupOptions: popupOptions
				},
			);
		});
	}

	putDialogComponentToComponent({
		dialogType,
		viewContainerRef,
		data = null,
		destroyCallback = null,
		zIndex = null
	}) {
		const componentIndex = Date.now();
		const factory = this.factoryResolver.resolveComponentFactory(dialogType);
		const componentRef: ComponentRef<any> = viewContainerRef.createComponent(factory, componentIndex, Injector.create({
			providers: [
				{
					provide: 'destroy', useValue: () => {
						if (destroyCallback) {
							destroyCallback();
						}
						componentRef.destroy();
					}
				},
				{
					provide: 'data', useValue: data
				}
			],
			parent: viewContainerRef.injector
		}));
		if (zIndex) {
			componentRef.location.nativeElement.style.zIndex = zIndex;
		}

		return {
			componentIndex: componentIndex,
			componentRef: componentRef
		}
	}

	putDialogComponentToComponentWithOptions(
		{
			dialogType,
			anchorElement = null,//require viewContainerRef's positon is relative
			anchorTo = null,//require viewContainerRef's positon is relative
			viewContainerRef = null,
			destroyIfOutFocus = false,
			useBackground = false,//require viewContainerRef's positon is relative
			zIndex = null,
			data = null,
			popupOptions = null
		},
	): ComponentRef<any> {
		let result;
		if (anchorTo) {
			viewContainerRef = null;
		}

		viewContainerRef = viewContainerRef ? viewContainerRef : this.viewContainerRef;

		if (popupOptions || useBackground) {
			result = this.putDialogComponentToComponent({
				dialogType: DialogComponent,
				viewContainerRef: viewContainerRef,
				data: {
					data: data,
					dialogType: dialogType,
					destroyIfOutFocus: destroyIfOutFocus,
					popupOptions: popupOptions ? new PopupOptions(popupOptions) : null,
					useBackground: useBackground
				},
				zIndex: zIndex
			});
		} else {
			result = this.putDialogComponentToComponent({
				dialogType: dialogType,
				viewContainerRef: viewContainerRef,
				data: data,
				zIndex: zIndex
			});
		}

		if (!useBackground && destroyIfOutFocus) {
			if (anchorElement) {
				this.addOutFocusEventListener(result.componentRef, result.componentIndex);
			} else {
				this.addOutFocusEventListener(result.componentRef);
			}
		}

		//move dialog to anchorElement
		if (!useBackground && anchorTo) {
			const bonus = 9;
			const anchorElementRect = anchorElement.getBoundingClientRect();
			const y = anchorElementRect.top + anchorElementRect.height + bonus;
			//set y
			result.componentRef.location.nativeElement.style.top = y + 'px';
			result.componentRef.location.nativeElement.style.position = 'absolute';
			//xet x
			if (anchorTo.toUpperCase() === 'LEFT') {
				const x = anchorElementRect.left + bonus;
				result.componentRef.location.nativeElement.style.left = x + 'px';
			} else {
				const dialogWidth = (popupOptions && typeof popupOptions.width === 'number') ? popupOptions.width : result.componentRef.location.nativeElement.offsetWidth;
				const x = anchorElementRect.left + anchorElementRect.width - dialogWidth;
				result.componentRef.location.nativeElement.style.left = x + 'px';
			}
		}

		return result.componentRef;
	}

	protected addOutFocusEventListener(dialogComponentRef: ComponentRef<any>, componentIndex: number = null) {
		const handler = (event: MouseEvent) => {
			const isRightMB = event.which == 3;

			if (!isRightMB) {
				if (!dialogComponentRef.location.nativeElement.contains(event.target)) {
					event.stopPropagation();
					event.preventDefault();
					window.removeEventListener('mousedown', handler);
					dialogComponentRef.destroy();
				}
			}
		};

		window.addEventListener('mousedown', handler);
	}
}
