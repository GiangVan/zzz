import { Component, OnInit, Injector } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Profile, AccountEditingResultStatus } from './profile.dto';
import { ProfileHttpService } from './profile.http.service';
import { AlertService } from 'src/app/common/dialogs/alert/alert.service';
import { ObjectHelper } from 'src/app/common/helpers/object';
import { ProfileLanguage } from './profile.language';
import { ClientCommonComponent } from '../client.common-component';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.css']
})
export class ProfileComponent extends ClientCommonComponent implements OnInit {
	oldProfile: Profile;
	newProfile: Profile;

	constructor(
		private profileHttpService: ProfileHttpService,
		protected injector: Injector
	) {
		super(injector);
		ProfileLanguage.define(this.translateService);

		this.initAutoFetchProfile();
	}
	
	ngOnInit() {
	}
	
	initAutoFetchProfile(){
		this.route.params.subscribe(() => {
			this.profileHttpService.fetchProfile().subscribe(profile => {
				this.oldProfile = profile;
				this.newProfile = Object.assign(new Profile(), profile);
			});
		});
	}

	updateProfile() {
		if (ObjectHelper.isDifferent(this.oldProfile, this.newProfile)) {
			this.profileHttpService.updateProfile(this.newProfile).subscribe(
				result => {
					if (result.status === AccountEditingResultStatus.SUCCESS) {
						this.oldProfile = Object.assign(new Profile(), this.newProfile);
					} else {
						this.alertService.show(result.status);
					}
				}
			)
		};
	}
}
