import { useSession, signIn, signOut } from 'next-auth/react';

export default function AuthTest() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <p>Loading session...</p>;
  }

  if (session && session.user) {
    return (
      <div style={{ border: '1px solid #ccc', padding: '20px', margin: '20px' }}>
        <h4>Authentication Status</h4>
        <p>Signed in as: <strong>{session.user.email}</strong></p>
        <p>Name: {session.user.name || 'N/A'}</p>
        <p>Role: <strong>{session.user.role || 'N/A'}</strong></p> {/* Assuming role is in session.user */}
        <p>User ID: {session.user.id || 'N/A'}</p> {/* Assuming id is in session.user */}
        <button 
          onClick={() => signOut()} 
          style={{ marginTop: '10px', padding: '8px 12px', backgroundColor: '#f00', color: 'white', border: 'none', cursor: 'pointer' }}
        >
          Sign out
        </button>
      </div>
    );
  }

  return (
    <div style={{ border: '1px solid #ccc', padding: '20px', margin: '20px' }}>
      <h4>Authentication Status</h4>
      <p>Not signed in</p>
      <p>Enter your email to sign in with a magic link:</p>
      <form onSubmit={(e) => {
        e.preventDefault();
        const email = (e.target as HTMLFormElement).email.value;
        if (email) {
          signIn('email', { email });
        }
      }}>
        <input type="email" name="email" placeholder="your@email.com" required style={{ padding: '8px', marginRight: '10px' }} />
        <button 
          type="submit" 
          style={{ padding: '8px 12px', backgroundColor: '#0070f3', color: 'white', border: 'none', cursor: 'pointer' }}
        >
          Sign in with Email
        </button>
      </form>
    </div>
  );
} 