import { useEffect, useState } from 'react';
import { getCurrentUser, signOut } from 'aws-amplify/auth';

import LandingPage from './LandingPage';
import AuthPage from './AuthPage';
import FilioApp from './FilioApp';

export default function App() {
  const [page, setPage] = useState('landing'); // landing | auth | app
  const [user, setUser] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [theme, setTheme] = useState('light');

  // Check if user is already logged in
  useEffect(() => {
    async function checkAuth() {
      try {
        const currentUser = await getCurrentUser();

        setUser({
          email:
            currentUser.signInDetails?.loginId ||
            currentUser.username,
          name: currentUser.username,
        });

        setPage('app');
      } catch {
        setPage('landing');
      } finally {
        setCheckingAuth(false);
      }
    }

    checkAuth();
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    setPage('app');
  };

  const handleSignout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Sign out failed:', error);
    }

    setUser(null);
    setPage('landing');
  };

  if (checkingAuth) {
    return <div style={{ padding: 40 }}>Loading...</div>;
  }

  if (page === 'landing') {
    return (
      <LandingPage
        theme={theme}
        onToggleTheme={() =>
          setTheme(theme === 'light' ? 'dark' : 'light')
        }
        onGetStarted={() => setPage('auth')}
        onLogin={() => setPage('auth')}
        onSeePricing={() => {}}
      />
    );
  }

  if (page === 'auth') {
    return (
      <AuthPage
        theme={theme}
        onBack={() => setPage('landing')}
        onLogin={handleLogin}
      />
    );
  }

  if (page === 'app') {
    return (
      <FilioApp
        user={user}
        onSignout={handleSignout}
      />
    );
  }

  return null;
}