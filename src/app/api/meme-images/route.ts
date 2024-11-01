import dotenv from "dotenv";
import { NextRequest, NextResponse } from "next/server";

dotenv.config(); // Load environment variables

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = parseInt(process.env.TELEGRAM_CHAT_ID || "", 10);

interface TelegramUpdate {
  message?: {
    chat?: {
      id?: number;
    };
    photo?: {
      file_id: string;
    }[];
  };
}

async function fetchTelegramUpdates(): Promise<Update[]> {
  const response = await fetch(
    `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getUpdates`
  );
  const data = await response.json();

  return data.result;
}

async function fetchImagesFromTelegram(): Promise<string[]> {
  const updates = await fetchTelegramUpdates();

  const seenFileIds = new Set<string>();

  const images = updates
    .filter(
      (update: TelegramUpdate) =>
        update?.message?.chat?.id === TELEGRAM_CHAT_ID &&
        update?.message?.photo &&
        update?.message?.photo?.length > 0
    )
    .flatMap((update: TelegramUpdate) => {
      const lastPhoto =
        update?.message?.photo && update.message.photo.slice(-1)[0]; // Get the last photo
      if (lastPhoto && !seenFileIds.has(lastPhoto.file_id)) {
        seenFileIds.add(lastPhoto.file_id); // Add to seen set
        return [lastPhoto.file_id]; // Return an array with the last photo's file_id
      }
      return []; // Return an empty array if conditions are not met
    })
    .reverse();

  // console.log("Sfhjdghfjsk2223j2kj23j3k2j3k2jk3dh", images);

  return images;
}

async function getFileUrl(fileId: string) {
  console.log({ fileId });
  const response = await fetch(
    `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getFile?file_id=${fileId}`
  );
  const data = await response.json();

  console.log({ data });
  const filePath = data.result.file_path;
  return `https://api.telegram.org/file/bot${TELEGRAM_BOT_TOKEN}/${filePath}`;
}

async function fetchImageUrls() {
  const images = await fetchImagesFromTelegram();
  console.log({ images });
  const imageUrls = await Promise.all(
    images.map(async (image) => {
      const url = await getFileUrl(image);
      return url;
    })
  );

  console.log({ imageUrls });
  return imageUrls;
}
export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const images = await fetchImageUrls();

    return NextResponse.json(images, { status: 200 });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ msg, error }, { status: 401 });
  }
}
