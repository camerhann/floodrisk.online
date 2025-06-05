import Head from "next/head";
import AuthTest from "@/components/auth/AuthTest";

export default function Home() {
  return (
    <>
      <Head>
        <title>Floodrisk Online - Auth Test</title>
        <meta name="description" content="Testing NextAuth.js Setup" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-start p-12">
        <h1 className="text-4xl font-bold text-blue-700 mb-8">
          Welcome to Floodrisk Online
        </h1>
        <p className="text-xl text-gray-800 mb-12">
          This page now includes an authentication test module below.
        </p>
        
        <AuthTest />

      </main>
    </>
  );
}
