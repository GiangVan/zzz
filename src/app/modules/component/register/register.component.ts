import { Component, OnInit } from '@angular/core';
import { RegistrationAccount, AccountRegistrationResultStatus } from './register.dto';
import { RegisterHttpService } from './register.http.service';
import { AuthService } from 'src/app/common/services/auth.service';
import { AlertService } from 'src/app/common/dialogs/alert/alert.service';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
	account: RegistrationAccount = new RegistrationAccount();

	constructor(
		private registerHttpService: RegisterHttpService,
		private alertService: AlertService,
		private authService: AuthService
	) { }

	ngOnInit() {
	}

	register() {
		this.registerHttpService.register(this.account).subscribe(result => {
			if (result.status === AccountRegistrationResultStatus.SUCCESS) {
				this.authService.setSessionToken(result.token);
				window.location.href = '/';
			} else {
				this.alertService.show(result.status);
				console.log(result);
			}
		})
	}
}
