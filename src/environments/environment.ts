// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
	production: true,
	requestRetryTime: 0,
	requestTimeOut: 8000
};

export const DebugConfigs = {
	isAlert: true
}

export const CssConfigs = {
	errorPopupZIndex: 3000,
	loaderZIndex: 2000,
	popupZIndex: 1200,
	dropdownMenuZIndex: 1000
}

export const ServiceUrls = {
	accountManagement: "http://hutech.tech/graphql",
	chat: "https://socketchat.glitch.me",
	feedback: "https://equal-spectacles.glitch.me",
	post: "http://post-service.glitch.me/graphql",
	roomFastFinding: "https://fast-finding-sv.glitch.me",
	main: "https://gmgraphql.glitch.me/graphql" 
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
