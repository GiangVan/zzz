import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ComponentRoutingModule } from "./component.routing.module";
import { LoginComponent } from "./login/login.component";
import { FormsModule } from "@angular/forms";
import { TestComponent } from './test/test.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
	declarations: [LoginComponent, TestComponent, RegisterComponent],
	imports: [ComponentRoutingModule, CommonModule, FormsModule],
	providers: []
})
export class ComponentModule { }
