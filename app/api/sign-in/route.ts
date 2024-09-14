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

const JWT_REFRESH_TOKEN_TTL = +process.env.JWT_REFRESH_TOKEN_TTL!;

export async function POST(req: NextApiRequest, _: NextApiResponse) {
  try {
    await dbConnect();

    const stream = await readStream(req.body);

    const json = JSON.parse(stream);

    const { email, password, keepLoggedIn } = json;

    const user = await User.findOne({ email });

    if (!user)
      return NextResponse.json(
        {
          message: `no user registered with email address ${email}.`,
        },
        { status: 400 }
      );

    const isPasswordOk = await user.comparePassword(password);

    if (!isPasswordOk)
      return NextResponse.json(
        {
          message: "password you entered is incorrect.",
        },
        { status: 403 }
      );

    const { accessToken, refreshToken } = generateJwtTokens(
      user._id.toString()
    );

    // saving refresh token
    const expiry = new Date();

    expiry.setDate(expiry.getDate() + JWT_REFRESH_TOKEN_TTL);

    await RefreshToken.updateOne(
      {
        userId: user._id,
      },
      { token: refreshToken, expiry },
      { upsert: true }
    );

    return NextResponse.json(
      { message: "sign in successful.", user, accessToken, refreshToken },
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
