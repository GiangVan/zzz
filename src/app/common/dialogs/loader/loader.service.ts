import { Injectable, ComponentFactoryResolver, ViewContainerRef, ViewRef, Type, ComponentRef } from "@angular/core";
import { LoaderComponent } from './loader.component';
import { DialogService } from '../dialog.service';
import { LocalLoader } from './loader.dto';
import { CssConfigs } from 'src/environments/environment';

@Injectable({
	providedIn: "root"
})
export class LoaderService extends DialogService {
	private globalLoaderIds: any[] = [];
	private localLoaders: LocalLoader[] = [];
	private globalLoaderRef: ComponentRef<any>;

	constructor(protected factoryResolver: ComponentFactoryResolver) {
		super(factoryResolver);
	}

	start(id) {
		if (this.globalLoaderIds.length === 0) {
			this.globalLoaderRef = this.putDialogComponentToComponentWithOptions({
				dialogType: LoaderComponent,
				useBackground: true,
				zIndex: CssConfigs.loaderZIndex
			});
		}

		this.globalLoaderIds.push(id);
	}

	end(id) {
		this.removeAnGlobalLoaderId(id);

		if (this.globalLoaderIds.length === 0 && this.globalLoaderRef) {
			this.globalLoaderRef.destroy();
		}
	}

	addLocalLoader(viewContainerRef: ViewContainerRef, useBackground = true, classList: string = null, backgroundZIndex = 10): LocalLoader {
		const id = Date.now();
		const loader = this.putDialogComponentToComponentWithOptions({
			dialogType: LoaderComponent,
			viewContainerRef: viewContainerRef,
			useBackground: useBackground,
			zIndex: backgroundZIndex,
			data: {
				classList: classList
			}
		});
		const locolLoader = new LocalLoader(id, loader);
		this.localLoaders.push(locolLoader);
		return locolLoader;
	}

	destroyLocalLoader(id: number) {
		const localLoader = this.localLoaders.find(item => item.loaderId === id);
		if (localLoader) {
			localLoader.loaderVR.destroy();
			this.removeAnLocalLoader(localLoader);
		}
	}

	protected removeAnGlobalLoaderId(id) {
		const index = this.globalLoaderIds.indexOf(id);
		if (index > -1) {
			this.globalLoaderIds.splice(index, 1);
		}
	}

	protected removeAnLocalLoader(localLoader: LocalLoader) {
		const index = this.localLoaders.indexOf(localLoader);
		if (index > -1) {
			this.localLoaders.splice(index, 1);
		}
	}
}
