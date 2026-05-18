import { useState } from "react";

const css = `
.ap * { box-sizing: border-box; margin: 0; padding: 0; }
.ap {
  font-family: 'DM Sans', sans-serif;
  min-height: 100vh; display: grid; grid-template-columns: 1fr 1fr;
  background: #F5F3EE; color: #1A1814;
}
[data-theme="dark"] .ap { background: #141210; color: #F0EDE8; }

/* Left panel */
.ap-left {
  background: #1A1814; color: #F0EDE8;
  display: flex; flex-direction: column;
  justify-content: space-between; padding: 48px;
  position: relative; overflow: hidden;
}
[data-theme="dark"] .ap-left { background: #0A0908; }
.ap-left-bg {
  position: absolute; inset: 0; pointer-events: none; opacity: 0.06;
  background: repeating-linear-gradient(
    45deg, #C8500A 0px, #C8500A 1px, transparent 1px, transparent 40px
  );
}
.ap-left-logo {
  font-family: 'Syne', sans-serif; font-weight: 800; font-size: 28px;
  color: #C8500A; display: flex; align-items: center; gap: 8px; z-index: 1;
  background: none; border: none; cursor: pointer;
}
.ap-left-logo-dot { width: 10px; height: 10px; background: #C8500A; border-radius: 50%; }
.ap-left-body { z-index: 1; }
.ap-left-h {
  font-family: 'Syne', sans-serif; font-size: 38px; font-weight: 700;
  line-height: 1.15; margin-bottom: 16px; letter-spacing: -1px;
}
.ap-left-h span { color: #C8500A; }
.ap-left-p { font-size: 15px; color: #9E9B94; line-height: 1.7; max-width: 360px; margin-bottom: 36px; }
.ap-testimonial {
  background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.08);
  border-radius: 14px; padding: 20px;
}
.ap-testimonial-text { font-size: 14px; color: #C8C5BE; line-height: 1.6; margin-bottom: 14px; font-style: italic; }
.ap-testimonial-author { display: flex; align-items: center; gap: 10px; }
.ap-testimonial-avatar {
  width: 36px; height: 36px; border-radius: 50%;
  background: #C8500A; display: flex; align-items: center; justify-content: center;
  font-family: 'Syne', sans-serif; font-weight: 700; font-size: 14px; color: #fff;
}
.ap-testimonial-name { font-size: 13px; font-weight: 500; color: #F0EDE8; }
.ap-testimonial-role { font-size: 11px; color: #6B6860; }
.ap-left-footer { font-size: 12px; color: #4A4740; z-index: 1; }

/* Right panel */
.ap-right {
  display: flex; flex-direction: column; align-items: center;
  justify-content: center; padding: 48px; position: relative;
}
.ap-form-box { width: 100%; max-width: 380px; }
.ap-form-title {
  font-family: 'Syne', sans-serif; font-size: 26px; font-weight: 700;
  margin-bottom: 6px; color: #1A1814;
}
[data-theme="dark"] .ap-form-title { color: #F0EDE8; }
.ap-form-sub { font-size: 14px; color: #9E9B96; margin-bottom: 28px; line-height: 1.5; }

/* Tabs */
.ap-tabs {
  display: flex; gap: 0; margin-bottom: 24px;
  border-bottom: 2px solid rgba(0,0,0,0.08);
}
[data-theme="dark"] .ap-tabs { border-color: rgba(255,255,255,0.08); }
.ap-tab {
  flex: 1; padding: 10px; border: none; background: none;
  font-size: 14px; font-weight: 500; cursor: pointer; color: #9E9B96;
  font-family: 'DM Sans', sans-serif; transition: all 0.2s;
  border-bottom: 2px solid transparent; margin-bottom: -2px;
}
.ap-tab.active { color: #C8500A; border-bottom-color: #C8500A; }

/* Form fields */
.ap-field { margin-bottom: 14px; }
.ap-label {
  font-size: 12px; font-weight: 500; color: #6B6760;
  margin-bottom: 5px; display: block;
}
[data-theme="dark"] .ap-label { color: #9E9B94; }
.ap-input {
  width: 100%; padding: 11px 14px; border-radius: 10px;
  border: 1px solid rgba(0,0,0,0.12); background: #fff;
  font-size: 14px; color: #1A1814; outline: none;
  font-family: 'DM Sans', sans-serif; transition: all 0.2s;
}
[data-theme="dark"] .ap-input {
  background: #252320; border-color: rgba(255,255,255,0.1); color: #F0EDE8;
}
.ap-input:focus { border-color: #C8500A; box-shadow: 0 0 0 3px rgba(200,80,10,0.12); }
.ap-input::placeholder { color: #C8B8A8; }
[data-theme="dark"] .ap-input::placeholder { color: #4A4740; }

/* Buttons */
.ap-btn {
  width: 100%; padding: 13px; border-radius: 10px; border: none;
  background: #C8500A; color: #fff; font-size: 15px; font-weight: 500;
  cursor: pointer; font-family: 'DM Sans', sans-serif; transition: all 0.2s;
  margin-top: 6px; margin-bottom: 18px;
}
.ap-btn:hover { background: #E8651A; transform: translateY(-1px); box-shadow: 0 6px 20px rgba(200,80,10,0.3); }
.ap-btn:disabled { opacity: 0.6; cursor: not-allowed; transform: none; box-shadow: none; }

/* Divider */
.ap-divider {
  display: flex; align-items: center; gap: 12px;
  margin-bottom: 16px; font-size: 12px; color: #9E9B96;
}
.ap-divider::before, .ap-divider::after {
  content: ''; flex: 1; height: 1px; background: rgba(0,0,0,0.08);
}
[data-theme="dark"] .ap-divider::before,
[data-theme="dark"] .ap-divider::after { background: rgba(255,255,255,0.08); }

/* Google btn */
.ap-social-btn {
  width: 100%; padding: 11px; border-radius: 10px;
  border: 1px solid rgba(0,0,0,0.12); background: #fff;
  font-size: 14px; cursor: pointer; font-family: 'DM Sans', sans-serif;
  display: flex; align-items: center; justify-content: center; gap: 10px;
  color: #1A1814; transition: all 0.2s; margin-bottom: 18px;
}
[data-theme="dark"] .ap-social-btn {
  background: #252320; border-color: rgba(255,255,255,0.1); color: #F0EDE8;
}
.ap-social-btn:hover { background: #F5F3EE; }
[data-theme="dark"] .ap-social-btn:hover { background: #2A2720; }

/* Footer text */
.ap-footer-text { font-size: 12px; color: #9E9B96; text-align: center; }
.ap-footer-link { color: #C8500A; text-decoration: none; cursor: pointer; font-weight: 500; }

/* Alerts */
.ap-error {
  background: #FBEAEA; border: 1px solid #E05C5C; border-radius: 8px;
  padding: 10px 14px; font-size: 13px; color: #B83232; margin-bottom: 14px;
  line-height: 1.5;
}
[data-theme="dark"] .ap-error { background: #280A0A; color: #E05C5C; border-color: #E05C5C; }
.ap-success {
  background: #EAF5EE; border: 1px solid #2D7A4F; border-radius: 8px;
  padding: 10px 14px; font-size: 13px; color: #2D7A4F; margin-bottom: 14px;
  line-height: 1.5;
}
[data-theme="dark"] .ap-success { background: #0A2018; color: #4CAF7D; border-color: #4CAF7D; }

/* Verify code step */
.ap-verify-icon { font-size: 40px; text-align: center; margin-bottom: 12px; }
.ap-back-link {
  background: none; border: none; color: #C8500A; font-size: 13px;
  cursor: pointer; font-family: 'DM Sans', sans-serif; margin-top: 12px;
  display: block; text-align: center; width: 100%;
}
.ap-back-link:hover { text-decoration: underline; }

/* Theme toggle */
.ap-theme-btn {
  width: 40px; height: 24px; border-radius: 12px;
  border: 1px solid rgba(0,0,0,0.12);
  cursor: pointer; position: relative; display: flex; align-items: center; padding: 2px;
  transition: background 0.2s;
}
.ap-theme-thumb {
  width: 18px; height: 18px; border-radius: 50%;
  background: #fff; box-shadow: 0 1px 4px rgba(0,0,0,0.15);
  transition: transform 0.2s;
}

@media (max-width: 768px) {
  .ap { grid-template-columns: 1fr; }
  .ap-left { display: none; }
  .ap-right { padding: 32px 24px; justify-content: flex-start; padding-top: 80px; }
}
`;

// ── Steps: login | signup | verify ─────────────────────────────────────────
export default function AuthPage({ onLogin, onBack, theme, onToggleTheme }) {
  const [tab, setTab] = useState("login");        // "login" | "signup"
  const [step, setStep] = useState("form");       // "form" | "verify"

  // Form fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [code, setCode] = useState("");

  // UI state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // ── Helpers ────────────────────────────────────────────────────────────────
  const clearMessages = () => { setError(""); setSuccess(""); };

  const switchTab = (t) => {
    setTab(t);
    setStep("form");
    setName(""); setEmail(""); setPassword(""); setConfirmPassword(""); setCode("");
    clearMessages();
  };

  // ── Login ──────────────────────────────────────────────────────────────────
  const handleLogin = async () => {
    clearMessages();
    if (!email || !password) { setError("Please enter your email and password."); return; }

    setLoading(true);
    try {
      // ── Real Cognito login ──
      // Uncomment this block when Amplify is configured:
      //
      // const { signIn } = await import("aws-amplify/auth");
      // const result = await signIn({ username: email, password });
      // if (result.isSignedIn) {
      //   onLogin({ email, name: email.split("@")[0] });
      // } else {
      //   setError("Login incomplete. Please try again.");
      // }

      // ── Simulated login (remove when real Cognito is connected) ──
      await new Promise(r => setTimeout(r, 1000));
      if (password.length < 8) {
        setError("Password must be at least 8 characters.");
        return;
      }
      onLogin({ email, name: email.split("@")[0] });

    } catch (err) {
      if (err.name === "NotAuthorizedException") {
        setError("Incorrect email or password.");
      } else if (err.name === "UserNotFoundException") {
        setError("No account found with this email. Please sign up.");
      } else if (err.name === "UserNotConfirmedException") {
        setError("Please verify your email first. Check your inbox for the code.");
        setTab("signup");
        setStep("verify");
      } else {
        setError(err.message || "Login failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // ── Sign up ────────────────────────────────────────────────────────────────
  const handleSignup = async () => {
    clearMessages();
    if (!name) { setError("Please enter your full name."); return; }
    if (!email) { setError("Please enter your email address."); return; }
    if (!password) { setError("Please enter a password."); return; }
    if (password.length < 8) { setError("Password must be at least 8 characters."); return; }
    if (password !== confirmPassword) { setError("Passwords do not match."); return; }

    setLoading(true);
    try {
      // ── Real Cognito signup ──
      // Uncomment this block when Amplify is configured:
      //
      // const { signUp } = await import("aws-amplify/auth");
      // await signUp({
      //   username: email,
      //   password,
      //   options: { userAttributes: { email, name } }
      // });
      // setStep("verify");
      // setSuccess("Account created! Check your email for a 6-digit verification code.");

      // ── Simulated signup (remove when real Cognito is connected) ──
      await new Promise(r => setTimeout(r, 1200));
      setStep("verify");
      setSuccess("Account created! Enter the 6-digit code sent to your email.");

    } catch (err) {
      if (err.name === "UsernameExistsException") {
        setError("An account with this email already exists. Please sign in.");
      } else if (err.name === "InvalidPasswordException") {
        setError("Password must be at least 8 characters with uppercase, lowercase, and a number.");
      } else {
        setError(err.message || "Signup failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // ── Verify email code ──────────────────────────────────────────────────────
  const handleVerify = async () => {
    clearMessages();
    if (!code || code.length < 6) { setError("Please enter the 6-digit code from your email."); return; }

    setLoading(true);
    try {
      // ── Real Cognito confirmation ──
      // Uncomment this block when Amplify is configured:
      //
      // const { confirmSignUp, signIn } = await import("aws-amplify/auth");
      // await confirmSignUp({ username: email, confirmationCode: code });
      // // Auto-login after verification
      // await signIn({ username: email, password });
      // onLogin({ email, name: email.split("@")[0] });

      // ── Simulated verify (remove when real Cognito is connected) ──
      await new Promise(r => setTimeout(r, 1000));
      setSuccess("Email verified! Logging you in…");
      await new Promise(r => setTimeout(r, 800));
      onLogin({ email, name: name || email.split("@")[0] });

    } catch (err) {
      if (err.name === "CodeMismatchException") {
        setError("Incorrect code. Please check your email and try again.");
      } else if (err.name === "ExpiredCodeException") {
        setError("Code expired. Click 'Resend code' to get a new one.");
      } else {
        setError(err.message || "Verification failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // ── Resend code ────────────────────────────────────────────────────────────
  const handleResend = async () => {
    clearMessages();
    setLoading(true);
    try {
      // ── Real Cognito resend ──
      // const { resendSignUpCode } = await import("aws-amplify/auth");
      // await resendSignUpCode({ username: email });

      await new Promise(r => setTimeout(r, 800));
      setSuccess("A new code has been sent to your email.");
    } catch (err) {
      setError("Could not resend code. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <>
      <style>{css}</style>
      <div className="ap" data-theme={theme}>

        {/* ── Left panel ── */}
        <div className="ap-left">
          <div className="ap-left-bg" />
          <button onClick={onBack} className="ap-left-logo">
            <div className="ap-left-logo-dot" />
            Filio
          </button>
          <div className="ap-left-body">
            <h2 className="ap-left-h">
              The cloud drive that <span>thinks</span> for you.
            </h2>
            <p className="ap-left-p">
              Join thousands of Indians who switched from Google Drive and saved money without losing a single feature.
            </p>
            <div className="ap-testimonial">
              <div className="ap-testimonial-text">
                "Switched from Google One 3 months ago. Saving ₹450/month and the AI insights actually help me stay organised."
              </div>
              <div className="ap-testimonial-author">
                <div className="ap-testimonial-avatar">R</div>
                <div>
                  <div className="ap-testimonial-name">Rahul Sharma</div>
                  <div className="ap-testimonial-role">Freelance Designer, Bangalore</div>
                </div>
              </div>
            </div>
          </div>
          <div className="ap-left-footer">© 2026 Filio · Made in India 🇮🇳</div>
        </div>

        {/* ── Right panel ── */}
        <div className="ap-right">

          {/* Theme toggle */}
          <div style={{ position: "absolute", top: 24, right: 24 }}>
            <button
              className="ap-theme-btn"
              onClick={onToggleTheme}
              style={{ background: theme === "dark" ? "#2A2720" : "#E2DFD8", borderColor: theme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.12)" }}
              aria-label="Toggle theme"
            >
              <div className="ap-theme-thumb" style={{ transform: theme === "dark" ? "translateX(16px)" : "translateX(0)", background: theme === "dark" ? "#F0EDE8" : "#fff" }} />
            </button>
          </div>

          <div className="ap-form-box">

            {/* ── Step: Email verification ── */}
            {step === "verify" ? (
              <>
                <div className="ap-verify-icon">📬</div>
                <div className="ap-form-title">Check your email</div>
                <div className="ap-form-sub">
                  We sent a 6-digit code to <strong>{email}</strong>. Enter it below to verify your account.
                </div>

                {error && <div className="ap-error">⚠ {error}</div>}
                {success && <div className="ap-success">✓ {success}</div>}

                <div className="ap-field">
                  <label className="ap-label">Verification code</label>
                  <input
                    className="ap-input"
                    placeholder="Enter 6-digit code"
                    value={code}
                    maxLength={6}
                    onChange={e => setCode(e.target.value.replace(/\D/g, ""))}
                    onKeyDown={e => e.key === "Enter" && handleVerify()}
                    style={{ letterSpacing: "0.3em", fontSize: 18, textAlign: "center" }}
                  />
                </div>

                <button className="ap-btn" onClick={handleVerify} disabled={loading}>
                  {loading ? "Verifying…" : "Verify email →"}
                </button>

                <button className="ap-back-link" onClick={handleResend} disabled={loading}>
                  Didn't get the code? Resend
                </button>
                <button className="ap-back-link" onClick={() => { setStep("form"); clearMessages(); }} style={{ color: "#9E9B96", marginTop: 6 }}>
                  ← Back to sign up
                </button>
              </>
            ) : (
              <>
                {/* ── Step: Login / Signup form ── */}
                <div className="ap-form-title">
                  {tab === "login" ? "Welcome back" : "Create your account"}
                </div>
                <div className="ap-form-sub">
                  {tab === "login" ? "Sign in to your Filio drive" : "Start with 5 GB free, forever. No card needed."}
                </div>

                {/* Tabs */}
                <div className="ap-tabs">
                  <button className={`ap-tab ${tab === "login" ? "active" : ""}`} onClick={() => switchTab("login")}>Sign in</button>
                  <button className={`ap-tab ${tab === "signup" ? "active" : ""}`} onClick={() => switchTab("signup")}>Create account</button>
                </div>

                {error && <div className="ap-error">⚠ {error}</div>}
                {success && <div className="ap-success">✓ {success}</div>}

                {/* Name — signup only */}
                {tab === "signup" && (
                  <div className="ap-field">
                    <label className="ap-label">Full name</label>
                    <input
                      className="ap-input"
                      placeholder="Sheetanshu Kumar"
                      value={name}
                      onChange={e => setName(e.target.value)}
                    />
                  </div>
                )}

                {/* Email */}
                <div className="ap-field">
                  <label className="ap-label">Email address</label>
                  <input
                    className="ap-input"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                </div>

                {/* Password */}
                <div className="ap-field">
                  <label className="ap-label">Password</label>
                  <input
                    className="ap-input"
                    type="password"
                    placeholder="Min. 8 characters"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && tab === "login" && handleLogin()}
                  />
                </div>

                {/* Confirm password — signup only */}
                {tab === "signup" && (
                  <div className="ap-field">
                    <label className="ap-label">Confirm password</label>
                    <input
                      className="ap-input"
                      type="password"
                      placeholder="Repeat your password"
                      value={confirmPassword}
                      onChange={e => setConfirmPassword(e.target.value)}
                      onKeyDown={e => e.key === "Enter" && handleSignup()}
                    />
                  </div>
                )}

                {/* Submit */}
                <button
                  className="ap-btn"
                  onClick={tab === "login" ? handleLogin : handleSignup}
                  disabled={loading}
                >
                  {loading
                    ? "Please wait…"
                    : tab === "login"
                    ? "Sign in →"
                    : "Create account →"
                  }
                </button>

                {/* Divider */}
                <div className="ap-divider">or</div>

                {/* Google */}
                <button className="ap-social-btn">
                  <svg width="18" height="18" viewBox="0 0 18 18">
                    <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"/>
                    <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"/>
                    <path fill="#FBBC05" d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"/>
                    <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"/>
                  </svg>
                  Continue with Google
                </button>

                {/* Footer */}
                <div className="ap-footer-text">
                  {tab === "login" ? (
                    <>Don't have an account? <span className="ap-footer-link" onClick={() => switchTab("signup")}>Sign up free</span></>
                  ) : (
                    <>Already have an account? <span className="ap-footer-link" onClick={() => switchTab("login")}>Sign in</span></>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}