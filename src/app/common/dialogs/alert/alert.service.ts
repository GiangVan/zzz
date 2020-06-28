import { Injectable, ComponentFactoryResolver, ViewContainerRef, Injector } from "@angular/core";
import { AlertComponent } from './alert.component';
import { DialogService } from '../dialog.service';
import { CssConfigs } from 'src/environments/environment';

@Injectable({
	providedIn: "root"
})
export class AlertService extends DialogService {
	
	constructor(protected factoryResolver: ComponentFactoryResolver) {
		super(factoryResolver);
	}

	show(message: string, buttonName: string = '', callback: () => void = () => {}) {
		super.putDialogComponentToComponentWithOptions({
			dialogType: AlertComponent,
			useBackground: true,
			data: {
				message: message,
				buttonName: buttonName,
				callback: callback
			},
			zIndex: CssConfigs.errorPopupZIndex
		});
	}
}
