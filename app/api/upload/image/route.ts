import { NextResponse } from "next/server";
import cloudinary from "../../../../lib/cloudinary";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        {
          message: "File tidak ditemukan",
        },
        {
          status: 400,
        }
      );
    }

    const bytes = await file.arrayBuffer();

    const buffer = Buffer.from(bytes);

    const result = await new Promise<any>(
      (resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              folder: "umkm-baru-ilir",
            },
            (error, result) => {
              if (error) {
                console.error(
                  "CLOUDINARY ERROR:",
                  error
                );

                reject(error);
                return;
              }

              resolve(result);
            }
          )
          .end(buffer);
      }
    );

    return NextResponse.json({
      url: result.secure_url,
    });
  } catch (error) {
    console.error(
      "UPLOAD ERROR:",
      error
    );

    return NextResponse.json(
      {
        message: "Upload gagal",
        error:
          error instanceof Error
            ? error.message
            : String(error),
      },
      {
        status: 500,
      }
    );
  }
}