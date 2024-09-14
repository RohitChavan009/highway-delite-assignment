import { NextResponse } from "next/server";
import type { NextApiRequest, NextApiResponse } from "next";

// DB
import dbConnect from "../../../lib/db";

// JWT
import { generateJwtTokens } from "../../../lib/jwt";

// Models
import { User } from "../../../lib/models/user.model";
import { RefreshToken } from "../../../lib/models/refreshToken.model";

// Utils
import { readStream } from "../../../lib/utils";

export async function POST(req: NextApiRequest, _: NextApiResponse) {
  try {
    await dbConnect();

    const stream = await readStream(req.body);

    const json = JSON.parse(stream);

    const { token } = json;

    const refreshToken = await RefreshToken.findOne({
      token,
      expiry: { $gte: new Date() },
    });

    if (!refreshToken)
      return NextResponse.json(
        {
          message: "refresh token is invalid or expired. please log in again.",
        },
        { status: 403 }
      );

    const user = await User.findById(refreshToken.userId);

    const { accessToken, refreshToken: newRefreshToken } = generateJwtTokens(
      user?._id.toString()!
    );

    return NextResponse.json(
      {
        message: "refresh successful.",
        accessToken,
        refreshToken: newRefreshToken,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.log("error : ", error.message);

    return NextResponse.json(
      {
        message: "something went wrong.",
      },
      { status: 500 }
    );
  }
}
