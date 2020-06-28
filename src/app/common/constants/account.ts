export class AccountPrivacyType {
	static readonly PRIVATE = "PRIVATE";
	static readonly PUBLIC = "PUBLIC";
	static readonly FRIEND = "FRIEND";

	public static createList(): string[] {
		return [AccountPrivacyType.PRIVATE, AccountPrivacyType.PUBLIC, AccountPrivacyType.FRIEND];
	}
}
