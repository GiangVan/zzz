import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, OnDestroy, AfterContentChecked, AfterViewChecked, AfterContentInit, DoCheck, OnChanges, Injector, ViewContainerRef } from "@angular/core";
import { LineSvgMotion } from "svg-motion";

@Component({
	selector: "common-loader",
	template: `
		<div class='box shadow d-flex justify-content-center align-items-center'>
			<svg>
				<g transform="translate(22 21) scale(0.9 1)">
					<path #spinner stroke="#3700b3" stroke-width="3" fill="transparent"
						d="M20,0L0,10L0,30L20,40L40,30L40,10L30,5L10,15L10,25L20,30L30,25L30,15L20,20"></path>
				</g>
			</svg>
		</div>
	`,
	styles: [`
		.box {
			background-color: var(--bg9);
			border-radius: 6px;
		}
		svg {
			transform: rotate(29deg);
			width: 80px;
			height: 80px;
		}
	`],
})
export class LoaderComponent implements OnInit, OnDestroy {
	@ViewChild('spinner', { static: true }) private spinnerRef: ElementRef<HTMLElement>;
	private motion: LineSvgMotion;
	private classList: string;

	constructor(
		private injector: Injector,
		private viewContainerRef: ViewContainerRef
		){
		const data = this.injector.get('data');

		if(data){
			this.classList = data.classList;
		}
		this.motion = new LineSvgMotion();
	}
	
	ngOnInit() {
		this.setClassList();
		
		const spinnerElement = this.spinnerRef.nativeElement;
		this.motion.animateLineGroup(spinnerElement.getAttribute('d'), spinnerElement, {
			mode: 'loading',
			time: 700
		});
	}

	protected setClassList(){
		if(this.classList){
			this.viewContainerRef.element.nativeElement.setAttribute('class', this.viewContainerRef.element.nativeElement.getAttribute('class') + ' ' + this.classList);
		}
	}
	
	ngOnDestroy() {
		if (this.motion) {
			this.motion.removeAllLineAnimation();
		}
	}
}
