import { NgModule, Component } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ClientComponent } from "./client.component";
import { GameChannelComponent } from "./game-channel/game-channel.component";
import { ProfileComponent } from './profile/profile.component';
import { SettingsComponent } from './settings/settings.component';
import { LookAccountComponent } from './look-account/look-account.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
	{
		path: "",
		component: ClientComponent,
		children: [
			{
				path: "",
				redirectTo: "home"
			},
			{
				path: "home",
				component: HomeComponent
			},
			{
				path: "game-channel",
				component: GameChannelComponent
			},
			{
				path: "game-channel/:id",
				component: GameChannelComponent
			},
			{
				path: "profile",
				component: ProfileComponent
			},
			{
				path: "look/:id",
				component: LookAccountComponent
			},
			{
				path: "settings",
				component: SettingsComponent
			}
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ClientRoutingModule { }
