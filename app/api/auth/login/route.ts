import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { prisma } from "../../../../lib/prisma";
import { generateToken } from "../../../../lib/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "Username dan password wajib diisi",
        },
        {
          status: 400,
        }
      );
    }

    const admin = await prisma.admin.findUnique({
      where: {
        username,
      },
    });

    if (!admin) {
      return NextResponse.json(
        {
          success: false,
          message: "Username tidak ditemukan",
        },
        {
          status: 404,
        }
      );
    }

    const isValidPassword = await bcrypt.compare(
      password,
      admin.password
    );

    if (!isValidPassword) {
      return NextResponse.json(
        {
          success: false,
          message: "Password salah",
        },
        {
          status: 401,
        }
      );
    }

    const token = generateToken(admin.id);

    const response = NextResponse.json({
      success: true,
      message: "Login berhasil",
    });

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Terjadi kesalahan server",
      },
      {
        status: 500,
      }
    );
  }
}