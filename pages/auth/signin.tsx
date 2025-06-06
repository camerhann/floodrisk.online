import { GetServerSideProps } from 'next';
import { getCsrfToken, getProviders, signIn } from 'next-auth/react';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { FormEvent, useState } from 'react';

interface SignInProps {
  csrfToken: string | null;
  providers: any;
}

export default function SignIn({ csrfToken, providers }: SignInProps) {
  const router = useRouter();
  const { error } = router.query;
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await signIn('email', { email, callbackUrl: '/' });
  };

  return (
    <>
      <Head>
        <title>Sign In - Floodrisk Online</title>
        <meta name="description" content="Sign in to Floodrisk Online" />
      </Head>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Sign in to your account
            </h2>
          </div>
          
          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="text-sm text-red-800">
                {error === 'Verification' && 'Sign in link is invalid or has expired.'}
                {error === 'Default' && 'Unable to sign in.'}
                {error === 'OAuthSignin' && 'Error in constructing an authorization URL.'}
                {error === 'OAuthCallback' && 'Error in handling the response from OAuth provider.'}
                {error === 'OAuthCreateAccount' && 'Could not create OAuth provider user in the database.'}
                {error === 'EmailCreateAccount' && 'Could not create email provider user in the database.'}
                {error === 'Callback' && 'Error in the OAuth callback handler route.'}
              </div>
            </div>
          )}

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <input name="csrfToken" type="hidden" defaultValue={csrfToken || ''} />
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Sending...' : 'Sign in with Email'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);
  
  // If already logged in, redirect to home
  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  const csrfToken = await getCsrfToken(context);
  const providers = await getProviders();
  
  return {
    props: {
      csrfToken,
      providers,
    },
  };
};