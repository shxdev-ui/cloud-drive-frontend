import { useState, useEffect } from "react";
import LandingPage from "./LandingPage";
import PricingPage from "./PricingPage";
import AuthPage from "./AuthPage";
import { signOut, getCurrentUser } from 'aws-amplify/auth';
import FilioApp from "./FilioApp";


// ─────────────────────────────────────────────────────────────────────────────
// This is the main router for Filio.
// Pages: landing → pricing → auth → app
// ─────────────────────────────────────────────────────────────────────────────

export default function App() {
  const [page, setPage] = useState("landing"); // landing | pricing | auth | app
  const [theme, setTheme] = useState("light");
  const [user, setUser] = useState(null);

  // Persist theme
  useEffect(() => {
    const saved = localStorage.getItem("filio-theme");
    if (saved) setTheme(saved);
  }, []);

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    localStorage.setItem("filio-theme", next);
  };

  // Check if already logged in
  useEffect(() => {
    const savedUser = localStorage.getItem("filio-user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setPage("app");
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem("filio-user", JSON.stringify(userData));
    setPage("app");
  };

  const handleSignout = async () => {
  try {
    await signOut();
  } catch (error) {
    console.error('Sign out failed:', error);
  }

  setUser(null);
  localStorage.removeItem('filio-user');
  setPage('landing');
};

  const handleSelectPlan = (plan) => {
    // Free plan → go straight to auth
    // Paid plan → go to auth, then payment flow after
    setPage("auth");
  };

  if (page === "landing") {
    return (
      <LandingPage
        theme={theme}
        onToggleTheme={toggleTheme}
        onGetStarted={() => setPage("auth")}
        onSeePricing={() => setPage("pricing")}
        onLogin={() => setPage("auth")}
      />
    );
  }

  if (page === "pricing") {
    return (
      <PricingPage
        theme={theme}
        onToggleTheme={toggleTheme}
        onSelectPlan={handleSelectPlan}
        onBack={() => setPage("landing")}
      />
    );
  }

  if (page === "auth") {
    return (
      <AuthPage
        theme={theme}
        onToggleTheme={toggleTheme}
        onLogin={handleLogin}
        onBack={() => setPage("landing")}
      />
    );
  }

  if (page === "app") {
    return (
      <FilioApp
        user={user}
        theme={theme}
        onToggleTheme={toggleTheme}
        onSignout={handleSignout}
      />
    );
  }
}
