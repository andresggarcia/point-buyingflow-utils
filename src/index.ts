import jwt from 'jsonwebtoken';

export class Vault {
  public options: jwt.SignOptions;
  private SECRET: string;

  /**
   * Instantiates the Vault class
   * @param secret The seed string. 
   * @param options Extra options for jwt
   */
  constructor(secret: string, options: jwt.SignOptions = {
    expiresIn: '24h'
  }) {
    if (!secret) {
      throw new Error('Missing secret.');
    }

    this.SECRET = secret;
    this.options = options;
  }

  /**
   * Token signing
   * @param {string} key
   */
  private sign(key: string) {
    if (!key) {
      throw new Error('Missing key.');
    }

    const token = jwt.sign({ key }, this.SECRET, this.options);
    return token;
  }


  /**
   * Token verification
   * @param {string} token 
   */
  private verify(token: string) {
    let decodedToken = {};
    jwt.verify(token, this.SECRET, (err, decoded) => {
      if (err) {
        throw new Error('Token is not valid or expired.');
      }
      decodedToken = decoded;
    });
    return decodedToken;
  }
}
