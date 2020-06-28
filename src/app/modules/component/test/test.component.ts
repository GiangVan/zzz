import { Component, OnInit, AfterViewInit } from "@angular/core";

@Component({
	selector: "app-test",
	templateUrl: "./test.component.html",
	styleUrls: ["./test.component.css"]
})
export class TestComponent implements OnInit, AfterViewInit {
	constructor() { }

	ngOnInit() {
		// this.loaderService.start();
	}

	ngAfterViewInit() {
		// setTimeout(() => { this.loaderService.end();},2000);

	}
}
