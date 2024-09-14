import { NextResponse } from "next/server";
import type { NextApiRequest, NextApiResponse } from "next";

// DB
import dbConnect from "../../../lib/db";

// Middlewares
import { withAuth } from "../../../lib/middlewares/auth";

// Models
import { UserInterface } from "../../../lib/models/user.model";

// Utils
import { readStream } from "../../../lib/utils";

const handler = async (req: NextApiRequest, _: NextApiResponse) => {
  try {
    await dbConnect();

    const stream = await readStream(req.body);

    const json = JSON.parse(stream);

    const { pin } = json;

    const user: UserInterface = (req as any).user;

    if (pin !== user.pin)
      return NextResponse.json(
        {
          message: `email verification failed, provided pin ${pin} is invalid.`,
        },
        { status: 400 }
      );

    return NextResponse.json(
      {
        email: user.email,
        message: `email verification successful.`,
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
};

export const POST = withAuth(handler);
