export class AuthenticationError extends Error {
  constructor(message: string | undefined) {
    super(message);
    this.name = 'AuthenticationError';
  }
}
