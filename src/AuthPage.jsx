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
}
.ap-left-logo-dot { width: 10px; height: 10px; background: #C8500A; border-radius: 50%; }
.ap-left-body { z-index: 1; }
.ap-left-h { font-family: 'Syne', sans-serif; font-size: 40px; font-weight: 700; line-height: 1.15; margin-bottom: 16px; letter-spacing: -1px; }
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
  justify-content: center; padding: 48px;
}
.ap-form-box { width: 100%; max-width: 380px; }
.ap-form-title {
  font-family: 'Syne', sans-serif; font-size: 28px; font-weight: 700;
  margin-bottom: 6px; color: #1A1814;
}
[data-theme="dark"] .ap-form-title { color: #F0EDE8; }
.ap-form-sub { font-size: 14px; color: #9E9B96; margin-bottom: 32px; }
.ap-tabs { display: flex; gap: 0; margin-bottom: 28px; border-bottom: 2px solid rgba(0,0,0,0.08); }
[data-theme="dark"] .ap-tabs { border-color: rgba(255,255,255,0.08); }
.ap-tab {
  flex: 1; padding: 10px; border: none; background: none;
  font-size: 14px; font-weight: 500; cursor: pointer; color: #9E9B96;
  font-family: 'DM Sans', sans-serif; transition: all 0.2s;
  border-bottom: 2px solid transparent; margin-bottom: -2px;
}
.ap-tab.active { color: #C8500A; border-bottom-color: #C8500A; }
.ap-field { margin-bottom: 16px; }
.ap-label { font-size: 12px; font-weight: 500; color: #6B6760; margin-bottom: 6px; display: block; }
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
.ap-input::placeholder { color: #C8C5BE; }
.ap-btn {
  width: 100%; padding: 13px; border-radius: 10px; border: none;
  background: #C8500A; color: #fff; font-size: 15px; font-weight: 500;
  cursor: pointer; font-family: 'DM Sans', sans-serif; transition: all 0.2s;
  margin-top: 8px; margin-bottom: 20px;
}
.ap-btn:hover { background: #E8651A; transform: translateY(-1px); box-shadow: 0 6px 20px rgba(200,80,10,0.3); }
.ap-btn:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }
.ap-divider {
  display: flex; align-items: center; gap: 12px;
  margin-bottom: 20px; font-size: 12px; color: #9E9B96;
}
.ap-divider::before, .ap-divider::after {
  content: ''; flex: 1; height: 1px; background: rgba(0,0,0,0.08);
}
[data-theme="dark"] .ap-divider::before, [data-theme="dark"] .ap-divider::after { background: rgba(255,255,255,0.08); }
.ap-social-btn {
  width: 100%; padding: 11px; border-radius: 10px;
  border: 1px solid rgba(0,0,0,0.12); background: #fff;
  font-size: 14px; cursor: pointer; font-family: 'DM Sans', sans-serif;
  display: flex; align-items: center; justify-content: center; gap: 10px;
  color: #1A1814; transition: all 0.2s; margin-bottom: 10px;
}
[data-theme="dark"] .ap-social-btn { background: #252320; border-color: rgba(255,255,255,0.1); color: #F0EDE8; }
.ap-social-btn:hover { background: #F5F3EE; border-color: rgba(0,0,0,0.2); }
[data-theme="dark"] .ap-social-btn:hover { background: #2A2720; }
.ap-footer-text { font-size: 12px; color: #9E9B96; text-align: center; }
.ap-footer-text a { color: #C8500A; text-decoration: none; cursor: pointer; }
.ap-error {
  background: #FBEAEA; border: 1px solid #E05C5C; border-radius: 8px;
  padding: 10px 14px; font-size: 13px; color: #B83232; margin-bottom: 16px;
}
[data-theme="dark"] .ap-error { background: #280A0A; color: #E05C5C; }
.ap-success {
  background: #EAF5EE; border: 1px solid #2D7A4F; border-radius: 8px;
  padding: 10px 14px; font-size: 13px; color: #2D7A4F; margin-bottom: 16px;
}

@media (max-width: 768px) {
  .ap { grid-template-columns: 1fr; }
  .ap-left { display: none; }
  .ap-right { padding: 32px 24px; }
}
`;

export default function AuthPage({ onLogin, onBack, theme, onToggleTheme }) {
  const [tab, setTab] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async () => {
    setError(""); setSuccess("");
    if (!email || !password) { setError("Please fill in all fields."); return; }
    if (tab === "signup" && !name) { setError("Please enter your name."); return; }
    if (password.length < 8) { setError("Password must be at least 8 characters."); return; }
    setLoading(true);
    // Simulate API call — replace with real Cognito call
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    if (tab === "signup") {
      setSuccess("Account created! Check your email to verify.");
      setTimeout(() => { setTab("login"); setSuccess(""); }, 2000);
    } else {
      onLogin({ email, name: email.split("@")[0] });
    }
  };

  return (
    <>
      <style>{css}</style>
      <div className="ap" data-theme={theme}>
        {/* Left panel */}
        <div className="ap-left">
          <div className="ap-left-bg" />
          <button onClick={onBack} className="ap-left-logo" style={{ background: "none", border: "none", cursor: "pointer" }}>
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

        {/* Right panel */}
        <div className="ap-right">
          <div style={{ position: "absolute", top: 24, right: 24 }}>
            <button onClick={onToggleTheme} style={{
              width: 40, height: 24, borderRadius: 12,
              background: theme === "dark" ? "#2A2720" : "#E2DFD8",
              border: `1px solid ${theme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.12)"}`,
              cursor: "pointer", position: "relative", display: "flex", alignItems: "center", padding: 2,
            }}>
              <div style={{
                width: 18, height: 18, borderRadius: "50%", background: "#fff",
                boxShadow: "0 1px 4px rgba(0,0,0,0.15)",
                transform: theme === "dark" ? "translateX(16px)" : "translateX(0)",
                transition: "transform 0.2s",
              }} />
            </button>
          </div>

          <div className="ap-form-box">
            <div className="ap-form-title">{tab === "login" ? "Welcome back" : "Create account"}</div>
            <div className="ap-form-sub">{tab === "login" ? "Sign in to your Filio drive" : "Start with 5GB free, forever"}</div>

            <div className="ap-tabs">
              <button className={`ap-tab ${tab === "login" ? "active" : ""}`} onClick={() => { setTab("login"); setError(""); }}>Sign in</button>
              <button className={`ap-tab ${tab === "signup" ? "active" : ""}`} onClick={() => { setTab("signup"); setError(""); }}>Create account</button>
            </div>

            {error && <div className="ap-error">⚠ {error}</div>}
            {success && <div className="ap-success">✓ {success}</div>}

            {tab === "signup" && (
              <div className="ap-field">
                <label className="ap-label">Full name</label>
                <input className="ap-input" placeholder="Sheetanshu Kumar" value={name} onChange={e => setName(e.target.value)} />
              </div>
            )}
            <div className="ap-field">
              <label className="ap-label">Email address</label>
              <input className="ap-input" type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div className="ap-field">
              <label className="ap-label">Password</label>
              <input className="ap-input" type="password" placeholder="Min. 8 characters" value={password} onChange={e => setPassword(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleSubmit()} />
            </div>

            <button className="ap-btn" onClick={handleSubmit} disabled={loading}>
              {loading ? "Please wait…" : tab === "login" ? "Sign in →" : "Create my account →"}
            </button>

            <div className="ap-divider">or continue with</div>
            <button className="ap-social-btn">
              <svg width="18" height="18" viewBox="0 0 18 18"><path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"/><path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"/><path fill="#FBBC05" d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"/><path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"/></svg>
              Continue with Google
            </button>

            <div className="ap-footer-text">
              {tab === "login"
                ? <>Don't have an account? <a onClick={() => setTab("signup")}>Sign up free</a></>
                : <>Already have an account? <a onClick={() => setTab("login")}>Sign in</a></>
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
