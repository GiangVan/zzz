

export class PopupOptions {
	width: string;
	height: string;
	useExitBtn: boolean;
	classList: string;
	backgroundColor: string;

	constructor({
		width = null,
		height = null,
		classList = null,
		backgroundColor = 'var(--bg8)',
		useExitBtn = true,
	}) {
		this.width = (typeof width === 'number') ? width + 'px' : width;
		this.height = (typeof height === 'number') ? height + 'px' : height;
		this.useExitBtn = useExitBtn;
		this.classList = classList;
		this.backgroundColor = backgroundColor;
	 }
}