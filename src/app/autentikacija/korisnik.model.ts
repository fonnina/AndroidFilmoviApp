export class Korisnik {
  constructor(public id: string, public email: string, private tokenA: string, private tokenExpirationDate: Date) {
  }

  get token() {
      if (!this.tokenExpirationDate || this.tokenExpirationDate <= new Date()) {
          return null;
      }
      return this.tokenA;
  }
}
