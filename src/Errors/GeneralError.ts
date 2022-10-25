export class GeneralError extends Error {
  constructor(message: string | undefined) {
    super(message);
    this.name = 'GeneralError';
  }
}
