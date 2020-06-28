import { allIcons } from 'angular-feather/icons';
import { NgModule } from '@angular/core';
import { FeatherModule } from 'angular-feather';

@NgModule({
	imports: [
		FeatherModule.pick(allIcons)
	],
	exports: [
		FeatherModule
	]
})
export class IconsModule { }