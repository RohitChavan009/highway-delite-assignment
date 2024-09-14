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
import { readStream, generatePin, returnTemplate } from "../../../lib/utils";

// Services
import { sendMail } from "../../../lib/services/node-mailer";

const JWT_REFRESH_TOKEN_TTL = +process.env.JWT_REFRESH_TOKEN_TTL!;

export async function POST(req: NextApiRequest, _: NextApiResponse) {
  try {
    await dbConnect();

    const stream = await readStream(req.body);

    const json = JSON.parse(stream);

    const { firstName, lastName, password, email, keepLoggedIn } = json;

    const existingUser = await User.findOne({ email }).lean();

    if (existingUser)
      return NextResponse.json(
        {
          message: `user with email address ${email} already exists.`,
        },
        { status: 400 }
      );

    const user = await User.create({
      firstName,
      lastName,
      password,
      email,
      keepLoggedIn,
    });

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

    const pin = generatePin();

    await sendMail(email, "Email Verification", returnTemplate(pin));

    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      {
        pin,
      },
      { new: true }
    );

    return NextResponse.json(
      {
        message: "sign up successful.",
        user: updatedUser,
        accessToken,
        refreshToken,
      },
      { status: 201 }
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
