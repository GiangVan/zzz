import { NgModule } from "@angular/core";
import { ClientRoutingModule } from "./client.routing.module";
import { ClientComponent } from "./client.component";
import { CommonModule } from "@angular/common";
import { GameChannelComponent } from './game-channel/game-channel.component';
import { FriendsComponent } from './friends/friends.component';
import { JoinedRoomsComponent } from './game-channel/joined-rooms/joined-rooms.component';
import { GameRoomsComponent } from './game-channel/game-rooms/game-rooms.component';
import { ProfileComponent } from './profile/profile.component';
import { FriendChatComponent } from './friends/friend-chat/friend-chat.component';
import { FriendChatUIService } from './friends/friend-chat/friend-chat.ui.service';
import { IconsModule } from './client.feather-icon.module';
import { SettingsComponent } from './settings/settings.component';
import { FormsModule } from '@angular/forms';
import { RoomGlobalChatComponent } from './game-channel/room-global-chat/room-global-chat.component';
import { RoomPrivateChatComponent } from './game-channel/room-private-chat/room-private-chat.component';
import { LookAccountComponent } from './look-account/look-account.component';
import { TranslateModule } from '@ngx-translate/core';
import { HomeComponent } from './home/home.component';
import { HomeGameDetailsComponent } from './home/home-game-details/home-game-details.component';
import { RoomPrivateChatPostComponent } from './game-channel/room-private-chat/room-private-chat-post/room-private-chat-post.component';

@NgModule({
	declarations: [
		ClientComponent,
		GameChannelComponent,
		FriendsComponent,
		JoinedRoomsComponent,
		HomeComponent,
		GameRoomsComponent,
		ProfileComponent,
		FriendChatComponent,
		RoomGlobalChatComponent,
		RoomPrivateChatComponent,
		SettingsComponent,
		RoomPrivateChatPostComponent,
		LookAccountComponent,
		HomeGameDetailsComponent,
	],
	imports: [
		IconsModule,
		ClientRoutingModule,
		FormsModule,
		CommonModule,
		TranslateModule.forChild()
	],
	providers: [
		FriendChatUIService,
	]
})
export class ClientModule { }
