import jwt from 'jwt-simple';

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';
const TOKEN_EXPIRY = 7 * 24 * 60 * 60; // 7 days in seconds

export const generateToken = (userId) => {
  const payload = {
    userId,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + TOKEN_EXPIRY,
  };
  return jwt.encode(payload, JWT_SECRET);
};

export const verifyToken = (token) => {
  try {
    return jwt.decode(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
};

export const generatePhoneOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};
