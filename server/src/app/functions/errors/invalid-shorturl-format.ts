export class InvalidShortUrl extends Error {
	constructor() {
		super("Não deve ser possível criar um link com URL encurtada já existente")
	}
}