import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Floodrisk Online - Tailwind Test</title>
        <meta name="description" content="Testing Tailwind CSS Setup" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <h1 className="text-3xl font-bold underline text-blue-600">
          Hello Tailwind!
        </h1>
        <p className="mt-4 text-lg text-gray-700">
          If this text is styled, Tailwind CSS is working. The heading should be large, bold, underlined, and blue.
        </p>
      </main>
    </>
  );
}
