export class InvalidLink extends Error {
	constructor() {
		super("Link não encontrado");
	}
}