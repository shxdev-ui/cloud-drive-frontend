const css = `
.pp * { box-sizing: border-box; margin: 0; padding: 0; }
.pp {
  font-family: 'DM Sans', sans-serif;
  background: #F5F3EE; color: #1A1814; min-height: 100vh;
}
[data-theme="dark"] .pp { background: #141210; color: #F0EDE8; }

.pp-nav {
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 48px; height: 64px;
  background: rgba(245,243,238,0.9); backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(0,0,0,0.07);
  position: sticky; top: 0; z-index: 100;
}
[data-theme="dark"] .pp-nav { background: rgba(20,18,16,0.9); border-color: rgba(255,255,255,0.07); }
.pp-logo {
  font-family: 'Syne', sans-serif; font-weight: 800; font-size: 24px;
  color: #C8500A; cursor: pointer; display: flex; align-items: center; gap: 8px;
  background: none; border: none; font-family: 'Syne', sans-serif;
}
.pp-logo-dot { width: 8px; height: 8px; background: #C8500A; border-radius: 50%; }

.pp-hero { text-align: center; padding: 80px 48px 48px; }
.pp-hero h1 {
  font-family: 'Syne', sans-serif; font-size: 48px; font-weight: 800;
  letter-spacing: -1.5px; margin-bottom: 16px; color: #1A1814;
}
[data-theme="dark"] .pp-hero h1 { color: #F0EDE8; }
.pp-hero p { font-size: 17px; color: #6B6760; max-width: 480px; margin: 0 auto 32px; line-height: 1.6; }
[data-theme="dark"] .pp-hero p { color: #9E9B94; }

/* Toggle */
.pp-toggle {
  display: inline-flex; align-items: center; gap: 0;
  background: #E2DFD8; border-radius: 10px; padding: 4px;
  margin-bottom: 56px;
}
[data-theme="dark"] .pp-toggle { background: #242118; }
.pp-toggle-btn {
  padding: 8px 20px; border-radius: 7px; border: none;
  background: transparent; font-size: 13px; font-weight: 500;
  cursor: pointer; transition: all 0.2s; color: #6B6760;
  font-family: 'DM Sans', sans-serif;
}
.pp-toggle-btn.active { background: #fff; color: #1A1814; box-shadow: 0 1px 4px rgba(0,0,0,0.1); }
[data-theme="dark"] .pp-toggle-btn.active { background: #2A2720; color: #F0EDE8; }
.pp-save-badge {
  font-size: 11px; background: #EAF5EE; color: #2D7A4F;
  padding: 2px 8px; border-radius: 20px; font-weight: 500; margin-left: 8px;
}

/* Plans */
.pp-plans { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; max-width: 960px; margin: 0 auto 80px; padding: 0 48px; }
.pp-plan {
  background: #fff; border: 1px solid rgba(0,0,0,0.08);
  border-radius: 20px; padding: 32px; position: relative;
  transition: all 0.2s; box-shadow: 0 2px 8px rgba(0,0,0,0.04);
}
[data-theme="dark"] .pp-plan { background: #1E1C19; border-color: rgba(255,255,255,0.07); }
.pp-plan:hover { transform: translateY(-4px); box-shadow: 0 16px 48px rgba(0,0,0,0.1); }
.pp-plan.popular {
  border-color: #C8500A; border-width: 2px;
  box-shadow: 0 8px 32px rgba(200,80,10,0.15);
}
.pp-popular-badge {
  position: absolute; top: -12px; left: 50%; transform: translateX(-50%);
  background: #C8500A; color: #fff; font-size: 11px; font-weight: 600;
  padding: 4px 14px; border-radius: 20px; white-space: nowrap;
  letter-spacing: 0.05em; text-transform: uppercase;
}
.pp-plan-name {
  font-family: 'Syne', sans-serif; font-size: 18px; font-weight: 700;
  margin-bottom: 6px; color: #1A1814;
}
[data-theme="dark"] .pp-plan-name { color: #F0EDE8; }
.pp-plan-desc { font-size: 13px; color: #9E9B96; margin-bottom: 24px; }
.pp-plan-price {
  font-family: 'Syne', sans-serif; font-size: 44px; font-weight: 800;
  color: #1A1814; margin-bottom: 4px; letter-spacing: -1px;
}
[data-theme="dark"] .pp-plan-price { color: #F0EDE8; }
.pp-plan-price span { font-size: 18px; font-weight: 400; color: #9E9B96; }
.pp-plan-period { font-size: 12px; color: #9E9B96; margin-bottom: 28px; }
.pp-plan-storage {
  font-size: 24px; font-weight: 600; color: #C8500A;
  font-family: 'Syne', sans-serif; margin-bottom: 4px;
}
.pp-plan-storage-label { font-size: 12px; color: #9E9B96; margin-bottom: 24px; }
.pp-divider { height: 1px; background: rgba(0,0,0,0.07); margin-bottom: 20px; }
[data-theme="dark"] .pp-divider { background: rgba(255,255,255,0.07); }
.pp-features-list { list-style: none; padding: 0; margin-bottom: 28px; }
.pp-features-list li {
  display: flex; align-items: flex-start; gap: 10px;
  font-size: 13px; color: #4A4740; margin-bottom: 10px; line-height: 1.5;
}
[data-theme="dark"] .pp-features-list li { color: #9E9B94; }
.pp-check { color: #2D7A4F; font-size: 14px; flex-shrink: 0; margin-top: 1px; }
.pp-cross { color: #C8B8A8; font-size: 14px; flex-shrink: 0; margin-top: 1px; }
.pp-cta {
  width: 100%; padding: 13px; border-radius: 10px; border: none;
  font-size: 14px; font-weight: 500; cursor: pointer;
  font-family: 'DM Sans', sans-serif; transition: all 0.2s;
}
.pp-cta.ghost { background: #F5F3EE; color: #1A1814; border: 1px solid rgba(0,0,0,0.12); }
[data-theme="dark"] .pp-cta.ghost { background: #252320; color: #F0EDE8; border-color: rgba(255,255,255,0.1); }
.pp-cta.ghost:hover { background: #E2DFD8; }
.pp-cta.primary { background: #C8500A; color: #fff; }
.pp-cta.primary:hover { background: #E8651A; transform: translateY(-1px); box-shadow: 0 6px 20px rgba(200,80,10,0.3); }

/* FAQ */
.pp-faq { max-width: 640px; margin: 0 auto; padding: 0 48px 80px; }
.pp-faq h2 {
  font-family: 'Syne', sans-serif; font-size: 32px; font-weight: 700;
  margin-bottom: 32px; text-align: center; color: #1A1814;
}
[data-theme="dark"] .pp-faq h2 { color: #F0EDE8; }
.pp-faq-item {
  border-bottom: 1px solid rgba(0,0,0,0.08); padding: 18px 0; cursor: pointer;
}
[data-theme="dark"] .pp-faq-item { border-color: rgba(255,255,255,0.08); }
.pp-faq-q {
  display: flex; justify-content: space-between; align-items: center;
  font-size: 15px; font-weight: 500; color: #1A1814;
}
[data-theme="dark"] .pp-faq-q { color: #F0EDE8; }
.pp-faq-a { font-size: 14px; color: #6B6760; line-height: 1.6; margin-top: 12px; }
[data-theme="dark"] .pp-faq-a { color: #9E9B94; }

@media (max-width: 768px) {
  .pp-plans { grid-template-columns: 1fr; padding: 0 24px; }
  .pp-hero { padding: 60px 24px 32px; }
  .pp-hero h1 { font-size: 32px; }
  .pp-faq { padding: 0 24px 60px; }
  .pp-nav { padding: 0 24px; }
}
`;

const PLANS = [
  {
    name: "Free",
    desc: "For personal light use",
    monthly: 0,
    annual: 0,
    storage: "5 GB",
    cta: "Get started free",
    ctaStyle: "ghost",
    popular: false,
    features: [
      { text: "5 GB storage", yes: true },
      { text: "Upload up to 100 MB per file", yes: true },
      { text: "Basic file manager", yes: true },
      { text: "AI file insights", yes: false },
      { text: "File versioning", yes: false },
      { text: "Shareable links", yes: false },
    ],
  },
  {
    name: "Pro",
    desc: "For individuals & students",
    monthly: 199,
    annual: 1990,
    storage: "100 GB",
    cta: "Get Pro",
    ctaStyle: "primary",
    popular: true,
    features: [
      { text: "100 GB storage", yes: true },
      { text: "Upload up to 2 GB per file", yes: true },
      { text: "AI file insights & auto-tagging", yes: true },
      { text: "File versioning", yes: true },
      { text: "Shareable links", yes: true },
      { text: "Priority support", yes: true },
    ],
  },
  {
    name: "Power",
    desc: "For teams & power users",
    monthly: 599,
    annual: 5990,
    storage: "1 TB",
    cta: "Get Power",
    ctaStyle: "ghost",
    popular: false,
    features: [
      { text: "1 TB storage", yes: true },
      { text: "Upload up to 10 GB per file", yes: true },
      { text: "Everything in Pro", yes: true },
      { text: "Custom domain", yes: true },
      { text: "5 team members", yes: true },
      { text: "Dedicated support", yes: true },
    ],
  },
];

const FAQS = [
  { q: "Is there a free trial?", a: "Yes — the Free plan is free forever. No credit card needed. Upgrade any time when you need more space." },
  { q: "Can I cancel anytime?", a: "Absolutely. Cancel from your account settings any time. You keep access until the end of your billing period." },
  { q: "How is Filio cheaper than Google Drive?", a: "We run on AWS S3 in Mumbai with no expensive office buildings or large teams. Our infrastructure cost is a fraction of Google's, and we pass the savings to you." },
  { q: "Is my data safe?", a: "All files are encrypted at rest (AES-256) and in transit (TLS 1.3). We never sell or share your data." },
  { q: "What payment methods do you accept?", a: "UPI, cards (Visa/Mastercard/RuPay), net banking, and wallets via Razorpay — all major Indian payment methods." },
];

import { useState } from "react";

export default function PricingPage({ onSelectPlan, onBack, theme, onToggleTheme }) {
  const [annual, setAnnual] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <>
      <style>{css}</style>
      <div className="pp" data-theme={theme}>
        <nav className="pp-nav">
          <button className="pp-logo" onClick={onBack}>
            <div className="pp-logo-dot" />
            Filio
          </button>
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <button onClick={onToggleTheme} style={{
              width: 40, height: 24, borderRadius: 12,
              background: theme === "dark" ? "#2A2720" : "#E2DFD8",
              border: `1px solid ${theme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.12)"}`,
              cursor: "pointer", position: "relative", display: "flex", alignItems: "center", padding: 2,
            }}>
              <div style={{
                width: 18, height: 18, borderRadius: "50%",
                background: theme === "dark" ? "#F0EDE8" : "#fff",
                boxShadow: "0 1px 4px rgba(0,0,0,0.15)",
                transform: theme === "dark" ? "translateX(16px)" : "translateX(0)",
                transition: "transform 0.2s",
              }} />
            </button>
          </div>
        </nav>

        <div className="pp-hero">
          <h1>Simple, honest pricing</h1>
          <p>No hidden fees. No surprise charges. Just storage at a fair price, built for India.</p>
          <div className="pp-toggle">
            <button className={`pp-toggle-btn ${!annual ? "active" : ""}`} onClick={() => setAnnual(false)}>Monthly</button>
            <button className={`pp-toggle-btn ${annual ? "active" : ""}`} onClick={() => setAnnual(true)}>
              Annual <span className="pp-save-badge">Save 2 months</span>
            </button>
          </div>
        </div>

        <div className="pp-plans">
          {PLANS.map((plan, i) => (
            <div key={i} className={`pp-plan ${plan.popular ? "popular" : ""}`}>
              {plan.popular && <div className="pp-popular-badge">⭐ Most popular</div>}
              <div className="pp-plan-name">{plan.name}</div>
              <div className="pp-plan-desc">{plan.desc}</div>
              <div className="pp-plan-price">
                {plan.monthly === 0 ? "Free" : `₹${annual ? Math.round(plan.annual / 12) : plan.monthly}`}
                {plan.monthly > 0 && <span>/mo</span>}
              </div>
              {plan.monthly > 0 && (
                <div className="pp-plan-period">
                  {annual ? `Billed ₹${plan.annual}/year` : "Billed monthly"}
                </div>
              )}
              <div className="pp-plan-storage">{plan.storage}</div>
              <div className="pp-plan-storage-label">storage included</div>
              <div className="pp-divider" />
              <ul className="pp-features-list">
                {plan.features.map((f, j) => (
                  <li key={j}>
                    <span className={f.yes ? "pp-check" : "pp-cross"}>{f.yes ? "✓" : "✕"}</span>
                    {f.text}
                  </li>
                ))}
              </ul>
              <button
                className={`pp-cta ${plan.ctaStyle}`}
                onClick={() => onSelectPlan(plan.name.toLowerCase())}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div className="pp-faq">
          <h2>Common questions</h2>
          {FAQS.map((faq, i) => (
            <div key={i} className="pp-faq-item" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
              <div className="pp-faq-q">
                {faq.q}
                <span style={{ fontSize: 18, color: "#9E9B96", transition: "transform 0.2s", transform: openFaq === i ? "rotate(45deg)" : "rotate(0)" }}>+</span>
              </div>
              {openFaq === i && <div className="pp-faq-a">{faq.a}</div>}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
