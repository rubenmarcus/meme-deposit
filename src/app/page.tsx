import Head from "next/head";
import MemeGallery from "../components/MemeGallery";
import { fetchImageUrls } from "@/data/fetchTelegram";




const Home = async () => {
  const res = await fetchImageUrls();



  return (
    <div>
      <Head>
        <title>$NOEAR MEME DEPOSIT</title>
        <meta name="description" content="A gallery of memes from a $noear" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto bg-black">
        <div className="flex items-center justify-center mt-4 gap-4">
          <img src="/illia.gif" alt="GIF" className="w-24 h-24" />
          <h1 className="text-3xl font-bold text-center my-8">
            $NOEAR MEME DEPOSIT
          </h1>
          <img src="/illia.gif" alt="GIF" className="w-24 h-24" />
        </div>

        <MemeGallery images={res} />
      </main>
    </div>
  );
};

export default Home;
