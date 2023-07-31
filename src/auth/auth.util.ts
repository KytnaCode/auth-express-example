import {SignJWT} from 'jose';
import {User} from '../users/userModel.js';

export const createToken = async (user: User) => {
  const secret = new TextEncoder().encode(process.env['JWT_SECRET']!); // Get JWT secret from environment variables

  // Create JWT
  return  await new SignJWT({email: user.email, id: user._id})
    .setProtectedHeader({alg: 'HS256'})
    .setIssuedAt()
    .setIssuer('kytnacode:auth-example:issuer')
    .setAudience('kytnacode:auth-example:auth')
    .setExpirationTime('15m')
    .sign(secret);
};