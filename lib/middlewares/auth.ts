// Next.js
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse, NextApiHandler } from "next";

// 3rd Party
import jwt from "jsonwebtoken";

// Models
import { User } from "../models/user.model";

// Secrets
const JWT_SECRET = process.env.JWT_SECRET!;

export const withAuth = (handler: NextApiHandler) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const headersList = headers();
    const referer = headersList.get("authorization");

    const token = referer?.split(" ")[1];

    if (!token)
      return NextResponse.json(
        {
          message: "access token is not provided.",
        },
        { status: 403 }
      );

    try {
      const { userId } = jwt.verify(token, JWT_SECRET) as { userId: string };

      const conditions = {
        _id: userId,
      };

      const user = await User.findOne(conditions).lean();

      (req as any).user = user;

      return handler(req, res);
    } catch (error: any) {
      console.log("auth middleware error : ", error.message);

      return NextResponse.json(
        {
          message: "access token is invalid or expired.",
        },
        { status: 403 }
      );
    }
  };
};
