// 3rd Party
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";

const JWT_SECRET = process.env.JWT_SECRET!;
const JWT_ACCESS_TOKEN_TTL = process.env.JWT_ACCESS_TOKEN_TTL!;

export const generateJwtTokens = (userId: string) => {
  const accessToken = jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: JWT_ACCESS_TOKEN_TTL,
  });

  const refreshToken = uuidv4();

  return {
    accessToken,
    refreshToken,
  };
};
