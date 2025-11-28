export class InvalidShortUrl extends Error {
	constructor() {
		super("O formato do link encurtado é inválido.")
	}
}