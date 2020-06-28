export class ObjectHelper{
	static isDifferent(obj1, obj2): boolean{
		return JSON.stringify(obj1) !== JSON.stringify(obj2);
	}
}