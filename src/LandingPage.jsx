import { useState, useEffect } from "react";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');`;

const css = `
${FONTS}
.lp * { box-sizing: border-box; margin: 0; padding: 0; }
.lp {
  font-family: 'DM Sans', sans-serif;
  background: #F5F3EE;
  color: #1A1814;
  min-height: 100vh;
}
[data-theme="dark"] .lp {
  background: #141210;
  color: #F0EDE8;
}

/* NAV */
.lp-nav {
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 48px; height: 64px;
  background: rgba(245,243,238,0.85);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(0,0,0,0.07);
  position: sticky; top: 0; z-index: 100;
}
[data-theme="dark"] .lp-nav {
  background: rgba(20,18,16,0.85);
  border-color: rgba(255,255,255,0.07);
}
.lp-logo {
  font-family: 'Syne', sans-serif; font-weight: 800; font-size: 24px;
  color: #C8500A; display: flex; align-items: center; gap: 8px;
  text-decoration: none;
}
.lp-logo-dot { width: 8px; height: 8px; background: #C8500A; border-radius: 50%; }
.lp-nav-links { display: flex; align-items: center; gap: 32px; }
.lp-nav-link {
  font-size: 14px; color: #6B6760; text-decoration: none;
  cursor: pointer; transition: color 0.2s; background: none; border: none;
  font-family: 'DM Sans', sans-serif;
}
[data-theme="dark"] .lp-nav-link { color: #9E9B94; }
.lp-nav-link:hover { color: #1A1814; }
[data-theme="dark"] .lp-nav-link:hover { color: #F0EDE8; }
.lp-nav-right { display: flex; align-items: center; gap: 12px; }
.lp-theme-btn {
  width: 40px; height: 24px; border-radius: 12px;
  background: #E2DFD8; border: 1px solid rgba(0,0,0,0.12);
  cursor: pointer; position: relative; display: flex; align-items: center; padding: 2px;
  transition: background 0.2s;
}
[data-theme="dark"] .lp-theme-btn { background: #2A2720; border-color: rgba(255,255,255,0.1); }
.lp-theme-btn::after {
  content: ''; width: 18px; height: 18px; border-radius: 50%;
  background: #fff; box-shadow: 0 1px 4px rgba(0,0,0,0.15);
  transition: transform 0.2s;
}
[data-theme="dark"] .lp-theme-btn::after { transform: translateX(16px); background: #F0EDE8; }
.lp-btn-ghost {
  padding: 8px 18px; border-radius: 8px; border: 1px solid rgba(0,0,0,0.12);
  background: transparent; color: #1A1814; font-size: 13px; cursor: pointer;
  font-family: 'DM Sans', sans-serif; transition: all 0.2s;
}
[data-theme="dark"] .lp-btn-ghost { border-color: rgba(255,255,255,0.12); color: #F0EDE8; }
.lp-btn-ghost:hover { background: rgba(0,0,0,0.05); }
.lp-btn-primary {
  padding: 8px 18px; border-radius: 8px; border: none;
  background: #C8500A; color: #fff; font-size: 13px; font-weight: 500;
  cursor: pointer; font-family: 'DM Sans', sans-serif; transition: all 0.2s;
}
.lp-btn-primary:hover { background: #E8651A; transform: translateY(-1px); }

/* HERO */
.lp-hero {
  max-width: 1100px; margin: 0 auto;
  padding: 100px 48px 80px;
  display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center;
}
.lp-badge {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 5px 12px; border-radius: 20px;
  background: #FDF0E8; border: 1px solid #C8500A;
  font-size: 12px; color: #C8500A; font-weight: 500;
  margin-bottom: 24px;
}
[data-theme="dark"] .lp-badge { background: #2A1A0A; }
.lp-badge-dot { width: 6px; height: 6px; border-radius: 50%; background: #C8500A; }
.lp-h1 {
  font-family: 'Syne', sans-serif; font-size: 56px; font-weight: 800;
  line-height: 1.05; letter-spacing: -1.5px; margin-bottom: 20px;
  color: #1A1814;
}
[data-theme="dark"] .lp-h1 { color: #F0EDE8; }
.lp-h1 span { color: #C8500A; }
.lp-desc {
  font-size: 17px; color: #6B6760; line-height: 1.7; margin-bottom: 36px;
  max-width: 480px;
}
[data-theme="dark"] .lp-desc { color: #9E9B94; }
.lp-hero-btns { display: flex; gap: 12px; align-items: center; flex-wrap: wrap; }
.lp-btn-lg {
  padding: 14px 28px; border-radius: 10px; border: none;
  background: #C8500A; color: #fff; font-size: 15px; font-weight: 500;
  cursor: pointer; font-family: 'DM Sans', sans-serif; transition: all 0.2s;
  display: flex; align-items: center; gap: 8px;
}
.lp-btn-lg:hover { background: #E8651A; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(200,80,10,0.3); }
.lp-btn-lg-ghost {
  padding: 14px 28px; border-radius: 10px;
  border: 1px solid rgba(0,0,0,0.14); background: transparent;
  color: #1A1814; font-size: 15px; cursor: pointer;
  font-family: 'DM Sans', sans-serif; transition: all 0.2s;
}
[data-theme="dark"] .lp-btn-lg-ghost { border-color: rgba(255,255,255,0.14); color: #F0EDE8; }
.lp-btn-lg-ghost:hover { background: rgba(0,0,0,0.05); }
.lp-hero-note { font-size: 12px; color: #9E9B96; margin-top: 12px; }

/* Hero visual */
.lp-hero-visual {
  background: #fff; border-radius: 20px;
  border: 1px solid rgba(0,0,0,0.08);
  box-shadow: 0 24px 64px rgba(0,0,0,0.1);
  overflow: hidden;
}
[data-theme="dark"] .lp-hero-visual { background: #1E1C19; border-color: rgba(255,255,255,0.07); }
.lp-mock-bar {
  background: #F5F3EE; border-bottom: 1px solid rgba(0,0,0,0.07);
  padding: 12px 16px; display: flex; align-items: center; gap: 8px;
}
[data-theme="dark"] .lp-mock-bar { background: #141210; border-color: rgba(255,255,255,0.07); }
.lp-mock-dot { width: 10px; height: 10px; border-radius: 50%; }
.lp-mock-body { padding: 20px; }
.lp-mock-file {
  display: flex; align-items: center; gap: 12px;
  padding: 10px 12px; border-radius: 8px; margin-bottom: 8px;
  background: #F5F3EE; border: 1px solid rgba(0,0,0,0.06);
  animation: fadeSlide 0.4s ease both;
}
[data-theme="dark"] .lp-mock-file { background: #252320; border-color: rgba(255,255,255,0.06); }
.lp-mock-file:nth-child(1) { animation-delay: 0.1s; }
.lp-mock-file:nth-child(2) { animation-delay: 0.2s; }
.lp-mock-file:nth-child(3) { animation-delay: 0.3s; }
.lp-mock-file:nth-child(4) { animation-delay: 0.4s; }
.lp-mock-icon { font-size: 22px; }
.lp-mock-info { flex: 1; }
.lp-mock-name { font-size: 13px; font-weight: 500; color: #1A1814; }
[data-theme="dark"] .lp-mock-name { color: #F0EDE8; }
.lp-mock-size { font-size: 11px; color: #9E9B96; }
.lp-mock-ai {
  margin-top: 12px; padding: 12px; border-radius: 8px;
  background: #FDF0E8; border: 1px solid #C8500A;
  font-size: 12px; color: #8B3505;
  animation: fadeSlide 0.4s 0.5s ease both;
}
[data-theme="dark"] .lp-mock-ai { background: #2A1A0A; color: #FF9955; }
.lp-mock-ai strong { font-weight: 600; }

@keyframes fadeSlide {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

/* SOCIAL PROOF */
.lp-proof {
  border-top: 1px solid rgba(0,0,0,0.07);
  border-bottom: 1px solid rgba(0,0,0,0.07);
  padding: 20px 48px; display: flex; align-items: center;
  justify-content: center; gap: 48px; flex-wrap: wrap;
  background: #fff;
}
[data-theme="dark"] .lp-proof {
  background: #1E1C19;
  border-color: rgba(255,255,255,0.07);
}
.lp-proof-item { text-align: center; }
.lp-proof-num {
  font-family: 'Syne', sans-serif; font-size: 28px; font-weight: 700;
  color: #C8500A;
}
.lp-proof-label { font-size: 12px; color: #9E9B96; margin-top: 2px; }

/* FEATURES */
.lp-features { max-width: 1100px; margin: 0 auto; padding: 80px 48px; }
.lp-section-label {
  font-size: 11px; font-weight: 600; letter-spacing: 0.1em;
  text-transform: uppercase; color: #C8500A; margin-bottom: 12px;
}
.lp-section-title {
  font-family: 'Syne', sans-serif; font-size: 40px; font-weight: 700;
  letter-spacing: -1px; margin-bottom: 48px; max-width: 500px;
  color: #1A1814;
}
[data-theme="dark"] .lp-section-title { color: #F0EDE8; }
.lp-features-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
.lp-feature-card {
  background: #fff; border: 1px solid rgba(0,0,0,0.08);
  border-radius: 16px; padding: 28px;
  transition: all 0.2s; box-shadow: 0 2px 8px rgba(0,0,0,0.04);
}
[data-theme="dark"] .lp-feature-card {
  background: #1E1C19; border-color: rgba(255,255,255,0.07);
}
.lp-feature-card:hover { transform: translateY(-4px); box-shadow: 0 12px 32px rgba(0,0,0,0.1); }
.lp-feature-icon {
  width: 44px; height: 44px; border-radius: 10px;
  background: #FDF0E8; display: flex; align-items: center;
  justify-content: center; font-size: 20px; margin-bottom: 16px;
}
.lp-feature-title {
  font-family: 'Syne', sans-serif; font-size: 17px; font-weight: 600;
  margin-bottom: 8px; color: #1A1814;
}
[data-theme="dark"] .lp-feature-title { color: #F0EDE8; }
.lp-feature-desc { font-size: 14px; color: #6B6760; line-height: 1.6; }
[data-theme="dark"] .lp-feature-desc { color: #9E9B94; }

/* PRICING TEASER */
.lp-pricing-teaser {
  background: #1A1814; color: #F0EDE8;
  padding: 80px 48px; text-align: center;
}
[data-theme="dark"] .lp-pricing-teaser { background: #0A0908; }
.lp-pricing-teaser h2 {
  font-family: 'Syne', sans-serif; font-size: 40px; font-weight: 700;
  margin-bottom: 12px; letter-spacing: -1px;
}
.lp-pricing-teaser p { font-size: 17px; color: #9E9B94; margin-bottom: 32px; }
.lp-compare { display: flex; justify-content: center; gap: 40px; margin-bottom: 40px; flex-wrap: wrap; }
.lp-compare-item { text-align: center; }
.lp-compare-name { font-size: 13px; color: #6B6760; margin-bottom: 6px; }
.lp-compare-price {
  font-family: 'Syne', sans-serif; font-size: 32px; font-weight: 700;
}
.lp-compare-price.accent { color: #C8500A; }
.lp-compare-price.muted { color: #4A4740; text-decoration: line-through; }
.lp-compare-storage { font-size: 12px; color: #6B6760; margin-top: 4px; }

/* FOOTER */
.lp-footer {
  padding: 32px 48px; display: flex; align-items: center; justify-content: space-between;
  border-top: 1px solid rgba(0,0,0,0.07); flex-wrap: gap;
}
[data-theme="dark"] .lp-footer { border-color: rgba(255,255,255,0.07); }
.lp-footer-logo {
  font-family: 'Syne', sans-serif; font-weight: 800; font-size: 18px; color: #C8500A;
}
.lp-footer-links { display: flex; gap: 24px; }
.lp-footer-link { font-size: 13px; color: #9E9B96; cursor: pointer; text-decoration: none; }
.lp-footer-link:hover { color: #C8500A; }

@media (max-width: 768px) {
  .lp-hero { grid-template-columns: 1fr; padding: 60px 24px 40px; }
  .lp-hero-visual { display: none; }
  .lp-h1 { font-size: 36px; }
  .lp-features-grid { grid-template-columns: 1fr; }
  .lp-nav { padding: 0 24px; }
  .lp-nav-links { display: none; }
  .lp-features { padding: 60px 24px; }
  .lp-pricing-teaser { padding: 60px 24px; }
  .lp-proof { padding: 20px 24px; gap: 24px; }
}
`;

const FEATURES = [
  { icon: "✦", title: "AI File Intelligence", desc: "Every file gets an AI-powered summary, auto-tags, and smart alerts. Filio understands your files, not just stores them." },
  { icon: "🔒", title: "Private by default", desc: "Your files are encrypted at rest and in transit. Only you can access them — not us, not advertisers, nobody." },
  { icon: "⚡", title: "India-fast CDN", desc: "Servers in Mumbai mean blazing fast uploads and downloads for Indian users. No more buffering on large files." },
  { icon: "📦", title: "Auto cold storage", desc: "Files you haven't touched in 90 days automatically move to Glacier storage, cutting your bill by up to 70%." },
  { icon: "🔗", title: "Shareable links", desc: "Share any file with a time-limited link. No account needed for the recipient — just click and download." },
  { icon: "🕐", title: "Version history", desc: "Every file version is saved forever. Accidentally overwrote something? Restore it in one click." },
];

export default function LandingPage({ onGetStarted, onSeePricing, onLogin, theme, onToggleTheme }) {
  return (
    <>
      <style>{css}</style>
      <div className="lp" data-theme={theme}>
        {/* Nav */}
        <nav className="lp-nav">
          <div className="lp-logo">
            <div className="lp-logo-dot" />
            Filio
          </div>
          <div className="lp-nav-links">
            <button className="lp-nav-link" onClick={onSeePricing}>Pricing</button>
            <span className="lp-nav-link">Features</span>
            <span className="lp-nav-link">About</span>
          </div>
          <div className="lp-nav-right">
            <button className="lp-theme-btn" onClick={onToggleTheme} aria-label="Toggle theme" />
            <button className="lp-btn-ghost" onClick={onLogin}>Log in</button>
            <button className="lp-btn-primary" onClick={onGetStarted}>Get started free</button>
          </div>
        </nav>

        {/* Hero */}
        <section style={{ maxWidth: 1100, margin: "0 auto", padding: "100px 48px 80px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
          <div>
            <div className="lp-badge">
              <div className="lp-badge-dot" />
              India's smartest cloud storage
            </div>
            <h1 className="lp-h1">
              Your files.<br />
              <span>Smarter</span> storage.<br />
              Half the price.
            </h1>
            <p className="lp-desc">
              Filio is an AI-powered cloud drive built for Indian users. Store, organise, and access your files for a fraction of what Google Drive charges — with features they don't have.
            </p>
            <div className="lp-hero-btns">
              <button className="lp-btn-lg" onClick={onGetStarted}>
                Start free — 5GB forever →
              </button>
              <button className="lp-btn-lg-ghost" onClick={onSeePricing}>
                See pricing
              </button>
            </div>
            <p className="lp-hero-note">No credit card needed · Cancel anytime · Indian pricing</p>
          </div>

          {/* Mock UI */}
          <div className="lp-hero-visual">
            <div className="lp-mock-bar">
              <div className="lp-mock-dot" style={{ background: "#FF5F57" }} />
              <div className="lp-mock-dot" style={{ background: "#FFBD2E" }} />
              <div className="lp-mock-dot" style={{ background: "#28CA41" }} />
              <span style={{ marginLeft: 8, fontSize: 12, color: "#9E9B96", fontFamily: "monospace" }}>filio.app/drive</span>
            </div>
            <div className="lp-mock-body">
              {[
                { icon: "📄", name: "Q1 Report.pdf", size: "2.3 MB" },
                { icon: "🖼️", name: "Hero Image.png", size: "840 KB" },
                { icon: "📊", name: "Budget 2026.xlsx", size: "156 KB" },
                { icon: "🎬", name: "Product Demo.mp4", size: "48 MB" },
              ].map((f, i) => (
                <div key={i} className="lp-mock-file">
                  <div className="lp-mock-icon">{f.icon}</div>
                  <div className="lp-mock-info">
                    <div className="lp-mock-name">{f.name}</div>
                    <div className="lp-mock-size">{f.size}</div>
                  </div>
                  <div style={{ fontSize: 14, color: "#C8500A", cursor: "pointer" }}>✦</div>
                </div>
              ))}
              <div className="lp-mock-ai">
                <strong>✦ Filio AI:</strong> Product Demo.mp4 will auto-move to cold storage in 87 days — saving you ₹12/month.
              </div>
            </div>
          </div>
        </section>

        {/* Social proof */}
        <div className="lp-proof">
          {[
            { num: "5,000+", label: "Files stored daily" },
            { num: "80%", label: "Cheaper than Google Drive" },
            { num: "50ms", label: "Avg load time in India" },
            { num: "99.9%", label: "Uptime guaranteed" },
          ].map((p, i) => (
            <div key={i} className="lp-proof-item">
              <div className="lp-proof-num">{p.num}</div>
              <div className="lp-proof-label">{p.label}</div>
            </div>
          ))}
        </div>

        {/* Features */}
        <section className="lp-features">
          <div className="lp-section-label">Why Filio</div>
          <h2 className="lp-section-title">Storage that actually thinks for you</h2>
          <div className="lp-features-grid">
            {FEATURES.map((f, i) => (
              <div key={i} className="lp-feature-card">
                <div className="lp-feature-icon">{f.icon}</div>
                <div className="lp-feature-title">{f.title}</div>
                <div className="lp-feature-desc">{f.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing teaser */}
        <section className="lp-pricing-teaser">
          <h2>Why pay Google Drive prices?</h2>
          <p>100GB on Filio costs less than a chai.</p>
          <div className="lp-compare">
            {[
              { name: "Google Drive", price: "₹650", storage: "100 GB / month", accent: false },
              { name: "Filio Pro", price: "₹199", storage: "100 GB / month", accent: true },
            ].map((c, i) => (
              <div key={i} className="lp-compare-item">
                <div className="lp-compare-name">{c.name}</div>
                <div className={`lp-compare-price ${c.accent ? "accent" : "muted"}`}>{c.price}</div>
                <div className="lp-compare-storage">{c.storage}</div>
              </div>
            ))}
          </div>
          <button className="lp-btn-lg" onClick={onSeePricing} style={{ margin: "0 auto" }}>
            See all plans →
          </button>
        </section>

        {/* Footer */}
        <footer className="lp-footer">
          <div className="lp-footer-logo">Filio</div>
          <div className="lp-footer-links">
            <span className="lp-footer-link">Privacy Policy</span>
            <span className="lp-footer-link">Terms of Service</span>
            <span className="lp-footer-link">Contact</span>
          </div>
          <div style={{ fontSize: 12, color: "#9E9B96" }}>© 2026 Filio. Made in India 🇮🇳</div>
        </footer>
      </div>
    </>
  );
}
