import { useSession, signIn, signOut } from 'next-auth/react';

export default function AuthTest() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <p className="text-gray-600">Loading session...</p>;
  }

  if (session && session.user) {
    return (
      <div className="border border-gray-300 p-5 m-5 rounded-lg shadow-sm">
        <h4 className="text-lg font-semibold mb-3">Authentication Status</h4>
        <p className="mb-2">
          Signed in as: <strong className="font-bold">{session.user.email}</strong>
        </p>
        <p className="mb-2">Name: {session.user.name || 'N/A'}</p>
        <p className="mb-2">
          Role: <strong className="font-bold">{session.user.role || 'N/A'}</strong>
        </p>
        <p className="mb-2">User ID: {session.user.id || 'N/A'}</p>
        <button 
          onClick={() => signOut()} 
          className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors cursor-pointer"
        >
          Sign out
        </button>
      </div>
    );
  }

  return (
    <div className="border border-gray-300 p-5 m-5 rounded-lg shadow-sm">
      <h4 className="text-lg font-semibold mb-3">Authentication Status</h4>
      <p className="mb-2 text-gray-600">Not signed in</p>
      <p className="mb-4">Enter your email to sign in with a magic link:</p>
      <form onSubmit={(e) => {
        e.preventDefault();
        const email = (e.target as HTMLFormElement).email.value;
        if (email) {
          signIn('email', { email });
        }
      }}>
        <input 
          type="email" 
          name="email" 
          placeholder="your@email.com" 
          required 
          className="px-3 py-2 border border-gray-300 rounded mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button 
          type="submit" 
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors cursor-pointer"
        >
          Sign in with Email
        </button>
      </form>
    </div>
  );
} 