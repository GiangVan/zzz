import { ViewRef, ViewContainerRef, ComponentRef } from '@angular/core';

export class LocalLoader {
	loaderId: number;
	loaderVR: ComponentRef<any>;

	constructor(loaderId: number, loader: ComponentRef<any>) {
		this.loaderId = loaderId;
		this.loaderVR = loader;
	}
}

export class LoaderOptions {
	isUseGlobalLoader: boolean = true;

	constructor(options = null) {
		if (options) {
			if (typeof options.isUseGlobalLoader === 'boolean') {
				this.isUseGlobalLoader = options.isUseGlobalLoader;
			}
		}
	}
}