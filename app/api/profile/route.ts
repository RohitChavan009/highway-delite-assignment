import { NextResponse } from "next/server";
import type { NextApiRequest, NextApiResponse } from "next";

// Middlewares
import { withAuth } from "../../../lib/middlewares/auth";

// Models
import { UserInterface } from "../../../lib/models/user.model";

const handler = async (req: NextApiRequest, _: NextApiResponse) => {
  try {
    const user: UserInterface = (req as any).user;

    if (user)
      return NextResponse.json(
        {
          message: "success.",
          user,
        },
        { status: 200 }
      );

    return NextResponse.json(
      {
        message: "user does not exist on the request.",
      },
      { status: 400 }
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

export const GET = withAuth(handler);
