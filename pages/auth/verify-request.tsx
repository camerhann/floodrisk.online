import Head from 'next/head';

export default function VerifyRequest() {
  return (
    <>
      <Head>
        <title>Check your email - Floodrisk Online</title>
        <meta name="description" content="Verify your email to sign in" />
      </Head>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              Check your email
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              A sign in link has been sent to your email address.
            </p>
            <div className="mt-8">
              <svg
                className="mx-auto h-12 w-12 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <p className="mt-4 text-sm text-gray-600">
              Click the link in the email to sign in to your account.
            </p>
            <p className="mt-2 text-xs text-gray-500">
              If you don't see the email, check your spam folder.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}