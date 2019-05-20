import jwt from 'jsonwebtoken';

export class Vault {
  public options: jwt.SignOptions;
  private _secret: string;

  constructor(secret: string, options: jwt.SignOptions = {
    expiresIn: '24h'
  }) {
    if (!secret) {
      throw new Error('Missing secret.');
    }

    this._secret = secret;
    this.options = options;
  }

  private sign(key: string) {
    if (!key) {
      throw new Error('Missing key.');
    }

    const token = jwt.sign({ key }, this._secret, this.options);
    return token;
  }

  private verify(token: string) {
    jwt.verify(token, this._secret, (err, decoded) => {
      if (err) {
        throw new Error('Token is not valid or expired.');
      } else {
        return decoded;
      }
    });
  }
}
