export class LinkAlreadyExistsError extends Error {
  public readonly name = 'LinkAlreadyExistsError';
  
  constructor(slug: string) {
    super(`O link "${slug}" já existe.`);
  }
}