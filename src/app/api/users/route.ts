import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const response = await fetch(`${process.env.USER_DATA}`, {
      cache: "force-cache",
    });
    const allUsers = await response.json();

    return NextResponse.json(allUsers);
  } catch (error) {
    NextResponse.json({
      message: "Users not found!",
      state: "ERROR",
    });
  }
}
