import { useState, useEffect, useRef, useCallback } from "react";

// ── Filio Design System ──────────────────────────────────────────────────────
const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');`;

const responsiveCSS = `
 
  /* ── Responsive ── */
 
  /* Tablet */
  @media (max-width: 1024px) {
    .stats-row { grid-template-columns: repeat(2, 1fr); }
    .file-grid { grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); }
    .sidebar { width: 200px; }
    .insight-panel { width: 280px; }
    .content.panel-open { margin-right: 280px; }
    .ai-trigger.panel-open { transform: translateX(-300px); }
  }
 
  /* Mobile */
  @media (max-width: 768px) {
    /* Navbar */
    .navbar { padding: 0 16px; }
    .logo { font-size: 18px; }
    .user-name { display: none; }
    .theme-label { display: none; }
    .signout-btn { padding: 5px 10px; font-size: 11px; }
 
    /* Layout — hide sidebar on mobile, show bottom nav */
    .sidebar { display: none; }
    .main { flex-direction: column; height: auto; }
    .content { padding: 16px; height: auto; overflow: visible; }
    .content.panel-open { margin-right: 0; }
 
    /* Stats — 2 column on mobile */
    .stats-row { grid-template-columns: repeat(2, 1fr); gap: 10px; margin-bottom: 16px; }
    .stat-card { padding: 12px; }
    .stat-value { font-size: 18px; }
    .stat-label { font-size: 11px; }
    .stat-change { font-size: 10px; }
 
    /* Toolbar — scrollable on mobile */
    .toolbar { overflow-x: auto; gap: 6px; padding: 8px 10px; flex-wrap: nowrap; }
    .search-input { min-width: 120px; }
    .filter-btn { white-space: nowrap; font-size: 11px; padding: 5px 9px; }
 
    /* Upload zone — compact */
    .upload-zone { padding: 20px 16px; }
    .upload-zone .upload-icon { font-size: 24px; margin-bottom: 6px; }
    .upload-zone p { font-size: 13px; }
 
    /* File grid — 2 columns on mobile */
    .file-grid { grid-template-columns: repeat(2, 1fr); gap: 10px; }
    .file-card { padding: 12px; }
    .file-thumb { margin-bottom: 8px; }
    .file-thumb span { font-size: 28px !important; }
    .file-name { font-size: 12px; }
    .file-meta { font-size: 10px; }
    .file-actions { opacity: 1; } /* Always show on mobile */
 
    /* File list — simplified */
    .file-row { padding: 10px 8px; gap: 8px; }
    .file-row .row-meta:last-of-type { display: none; } /* Hide date on mobile */
    .file-row .row-actions { opacity: 1; }
 
    /* AI panel — full screen on mobile */
    .insight-panel {
      width: 100%;
      top: 60px;
      border-left: none;
      border-top: 1px solid var(--border);
    }
 
    /* FAB position */
    .ai-trigger { right: 16px; bottom: 80px; }
    .ai-trigger.panel-open { transform: none; bottom: calc(100vh - 120px); }
 
    /* Bottom nav bar */
    .bottom-nav {
      display: flex !important;
    }
 
    /* Breadcrumb — shorter */
    .breadcrumb { font-size: 12px; margin-bottom: 12px; }
 
    /* Page title */
    .page-title { font-size: 18px; }
  }
 
  /* Small mobile */
  @media (max-width: 380px) {
    .file-grid { grid-template-columns: 1fr; }
    .stats-row { grid-template-columns: 1fr 1fr; }
  }
 
  /* Bottom navigation (mobile only) */
  .bottom-nav {
    display: none;
    position: fixed; bottom: 0; left: 0; right: 0;
    height: 64px; background: var(--surface);
    border-top: 1px solid var(--border);
    z-index: 90;
    padding: 0 8px;
    align-items: center; justify-content: space-around;
  }
  .bottom-nav-item {
    display: flex; flex-direction: column; align-items: center; gap: 3px;
    padding: 8px 16px; border-radius: 10px; cursor: pointer;
    border: none; background: none; color: var(--text3);
    font-family: 'DM Sans', sans-serif; transition: all 0.2s; flex: 1;
  }
  .bottom-nav-item.active { color: var(--accent); background: var(--accent-bg); }
  .bottom-nav-item .bn-icon { font-size: 20px; }
  .bottom-nav-item .bn-label { font-size: 10px; font-weight: 500; }
 
  /* Add bottom padding on mobile for bottom nav */
  @media (max-width: 768px) {
    .app { padding-bottom: 64px; }
    .content { padding-bottom: 24px; }
  }
`;

// ── Helpers ──────────────────────────────────────────────────────────────────
const FILE_ICONS = {
  pdf: "📄", doc: "📝", docx: "📝", xls: "📊", xlsx: "📊",
  ppt: "📋", pptx: "📋", jpg: "🖼️", jpeg: "🖼️", png: "🖼️",
  gif: "🎞️", mp4: "🎬", mov: "🎬", mp3: "🎵", wav: "🎵",
  zip: "📦", rar: "📦", txt: "📃", js: "⚙️", py: "🐍",
  default: "📄"
};

function getIcon(name) {
  const ext = name?.split(".").pop()?.toLowerCase();
  return FILE_ICONS[ext] || FILE_ICONS.default;
}

function formatSize(bytes) {
  if (!bytes) return "0 B";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 ** 2) return `${(bytes / 1024).toFixed(1)} KB`;
  if (bytes < 1024 ** 3) return `${(bytes / 1024 ** 2).toFixed(1)} MB`;
  return `${(bytes / 1024 ** 3).toFixed(2)} GB`;
}

function formatDate(iso) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

// ── Mock data (replace with real API calls) ───────────────────────────────────
async function loadFiles() {
  try {
    // Replace mock data with real API call
    const res = await fetch(`${import.meta.env.VITE_API_URL}/files`, {
      headers: { Authorization: `Bearer ${yourCognitoToken}` }
    });
    const data = await res.json();
    setFiles(data);
  } catch (err) {
    console.error('Could not load files', err);
  }
}

// ── AI Insight Generator (simulated — wire to your Claude API) ────────────────
function generateInsight(file) {
  const insights = {
    pdf: { tags: ["document", "report", "work"], summary: "This PDF contains structured data. Based on filename patterns, it appears to be a financial or analytical report. Consider archiving after 90 days.", activity: ["Uploaded from Windows 11", "No previous versions found"] },
    png: { tags: ["image", "design", "media"], summary: "High-resolution image file. Your storage shows 3 similar image files — would you like Filio to deduplicate and save space?", activity: ["Uploaded from Chrome", "Similar to: Logo Final.png"] },
    xlsx: { tags: ["spreadsheet", "finance", "data"], summary: "Spreadsheet file detected. This file type is often updated frequently. Versioning is enabled — all previous edits are saved.", activity: ["Uploaded from Excel Online", "2 previous versions exist"] },
    mp4: { tags: ["video", "media", "large"], summary: "Large video file (48MB). Filio will automatically move this to cold storage in 87 days to reduce your bill by ~70%.", activity: ["Auto-compression suggested", "Glacier transition in 87 days"] },
    docx: { tags: ["document", "notes", "work"], summary: "Word document detected. This file is small and frequently accessed — keeping it in standard storage is optimal.", activity: ["Uploaded from Word 365", "Shared with: nobody yet"] },
    zip: { tags: ["archive", "code", "backup"], summary: "Archive file. Filio detected this may be a code backup. Consider enabling version history for your project backups.", activity: ["Compression ratio: good", "Contents: ~240 files"] },
    mp3: { tags: ["audio", "media", "podcast"], summary: "Audio file. This file is 22MB — larger than average for MP3. Filio can suggest compression settings to halve the size without quality loss.", activity: ["Duration: ~45 min estimated", "Bitrate: ~64kbps estimated"] },
  };
  const ext = file?.fileName?.split(".").pop()?.toLowerCase();
  return insights[ext] || { tags: ["file", "storage"], summary: "File stored securely in your Filio vault. No duplicate matches found.", activity: ["Uploaded successfully", "Encrypted at rest"] };
}

// ── Main App ──────────────────────────────────────────────────────────────────
export default function FilioApp() {
  const [theme, setTheme] = useState("light");
  const [view, setView] = useState("grid");
  const [files, setFiles] = useState(MOCK_FILES);
  const [selected, setSelected] = useState(null);
  const [insightOpen, setInsightOpen] = useState(false);
  const [insightFile, setInsightFile] = useState(null);
  const [aiThinking, setAiThinking] = useState(false);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadPct, setUploadPct] = useState(0);
  const [toast, setToast] = useState({ show: false, msg: "" });
  const [activeNav, setActiveNav] = useState("my-files");
  const fileInputRef = useRef();

  // Theme
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Toast helper
  const showToast = (msg) => {
    setToast({ show: true, msg });
    setTimeout(() => setToast({ show: false, msg }), 3000);
  };

  // Open AI insight panel
  const openInsight = (file, e) => {
    e?.stopPropagation();
    setInsightFile(file);
    setAiThinking(true);
    setInsightOpen(true);
    setTimeout(() => setAiThinking(false), 1400);
  };

  // Filter files
  const filtered = files.filter(f => {
    const matchSearch = f.fileName.toLowerCase().includes(search.toLowerCase());
    if (filter === "all") return matchSearch;
    const ext = f.fileName.split(".").pop().toLowerCase();
    const cats = { images: ["jpg","jpeg","png","gif","webp"], docs: ["pdf","doc","docx","txt"], media: ["mp4","mp3","mov","wav"], archives: ["zip","rar"] };
    return matchSearch && (cats[filter] || []).includes(ext);
  });

  // Fake upload
  const handleFiles = (fileList) => {
    const file = fileList[0];
    if (!file) return;
    setUploading(true);
    setUploadPct(0);
    let pct = 0;
    const iv = setInterval(() => {
      pct += Math.random() * 18 + 5;
      if (pct >= 100) {
        clearInterval(iv);
        setUploading(false);
        setUploadPct(0);
        const newFile = {
          fileKey: Date.now().toString(),
          fileName: file.name,
          fileSize: file.size,
          folder: "root",
          uploadedAt: new Date().toISOString(),
          status: "ready"
        };
        setFiles(prev => [newFile, ...prev]);
        showToast(`✓ ${file.name} uploaded`);
      } else {
        setUploadPct(Math.min(pct, 99));
      }
    }, 200);
  };

  const insight = insightFile ? generateInsight(insightFile) : null;
  const storageUsed = files.reduce((a, f) => a + f.fileSize, 0);
  const storageLimit = 5 * 1024 ** 3;
  const storagePct = Math.min((storageUsed / storageLimit) * 100, 100);

  const navItems = [
    { id: "my-files", icon: "📁", label: "My Files", count: files.length },
    { id: "recent", icon: "🕐", label: "Recent", count: 5 },
    { id: "shared", icon: "🔗", label: "Shared", count: 2 },
    { id: "starred", icon: "⭐", label: "Starred", count: 1 },
    { id: "trash", icon: "🗑️", label: "Trash", count: 0 },
  ];

  return (
    <>
      <style>{css}</style>

      <div className="app">
        {/* ── Navbar ── */}
        <nav className="navbar">
          <div className="logo">
            <div className="logo-dot" />
            Filio
          </div>
          <div className="nav-right">
            <span className="theme-label">{theme === "dark" ? "Dark" : "Light"}</span>
            <button className="theme-btn" onClick={() => setTheme(t => t === "light" ? "dark" : "light")} aria-label="Toggle theme" />
            <div className="user-chip">
              <div className="avatar">SH</div>
              <span className="user-name">Sheetanshu</span>
            </div>
            <button className="signout-btn">Sign out</button>
          </div>
        </nav>

        <div className="main">
          {/* ── Sidebar ── */}
          <aside className="sidebar">
            <div className="sidebar-section">
              <div className="sidebar-label">Navigation</div>
              {navItems.map(item => (
                <button key={item.id} className={`nav-item ${activeNav === item.id ? "active" : ""}`} onClick={() => setActiveNav(item.id)}>
                  <span className="icon">{item.icon}</span>
                  {item.label}
                  {item.count > 0 && <span className="count">{item.count}</span>}
                </button>
              ))}
            </div>

            <div className="sidebar-section">
              <div className="sidebar-label">Folders</div>
              {["Design Assets", "Work Docs", "Personal"].map(f => (
                <button key={f} className="nav-item">
                  <span className="icon">📂</span>
                  {f}
                </button>
              ))}
              <button className="nav-item" style={{ color: "var(--accent)" }}>
                <span className="icon">＋</span>
                New folder
              </button>
            </div>

            <div className="storage-card">
              <div className="storage-label">
                <span>Storage</span>
                <span>{formatSize(storageUsed)} / 5 GB</span>
              </div>
              <div className="storage-bar">
                <div className="storage-fill" style={{ width: `${storagePct}%` }} />
              </div>
              <button className="upgrade-btn">⚡ Upgrade to Pro</button>
            </div>
          </aside>

          {/* ── Main Content ── */}
          <main className={`content ${insightOpen ? "panel-open" : ""}`}>
            {/* Breadcrumb */}
            <div className="breadcrumb">
              <span>Filio</span>
              <span className="sep">/</span>
              <span style={{ color: "var(--text)", fontWeight: 500 }}>My Files</span>
            </div>

            {/* Stats */}
            <div className="stats-row">
              {[
                { value: files.length, label: "Total files", change: "+2 today" },
                { value: formatSize(storageUsed), label: "Used storage", change: "of 5 GB free" },
                { value: "0", label: "Shared files", change: "invite someone" },
                { value: "∞", label: "Version history", change: "all files backed up" },
              ].map((s, i) => (
                <div key={i} className="stat-card">
                  <div className="stat-value">{s.value}</div>
                  <div className="stat-label">{s.label}</div>
                  <div className="stat-change">{s.change}</div>
                </div>
              ))}
            </div>

            {/* Toolbar */}
            <div className="toolbar">
              <span style={{ fontSize: 16 }}>🔍</span>
              <input className="search-input" placeholder="Search files…" value={search} onChange={e => setSearch(e.target.value)} />
              <div className="toolbar-divider" />
              {["all", "images", "docs", "media", "archives"].map(f => (
                <button key={f} className={`filter-btn ${filter === f ? "active" : ""}`} onClick={() => setFilter(f)}>
                  {f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
              ))}
              <div className="toolbar-divider" />
              <button className={`view-btn ${view === "grid" ? "active" : ""}`} onClick={() => setView("grid")} title="Grid view">⊞</button>
              <button className={`view-btn ${view === "list" ? "active" : ""}`} onClick={() => setView("list")} title="List view">☰</button>
            </div>

            {/* Upload zone */}
            <div
              className={`upload-zone ${dragging ? "dragging" : ""}`}
              onDragOver={e => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onDrop={e => { e.preventDefault(); setDragging(false); handleFiles(e.dataTransfer.files); }}
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="upload-icon">☁️</div>
              <p className="drop-hint">
                {dragging ? "Drop to upload" : <><span>Click to upload</span> or drag & drop files here</>}
              </p>
              <p style={{ fontSize: 12, color: "var(--text3)", marginTop: 6 }}>
                {uploading ? `Uploading… ${Math.round(uploadPct)}%` : "Any file type · Up to 5GB per file on Pro"}
              </p>
              {uploading && (
                <div className="upload-progress">
                  <div className="upload-progress-fill" style={{ width: `${uploadPct}%` }} />
                </div>
              )}
              <input ref={fileInputRef} type="file" style={{ display: "none" }} onChange={e => handleFiles(e.target.files)} />
            </div>

            {/* File list/grid */}
            {filtered.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">🔍</div>
                <div className="empty-title">No files found</div>
                <div className="empty-desc">Try a different search or filter</div>
              </div>
            ) : view === "grid" ? (
              <div className="file-grid">
                {filtered.map(file => (
                  <div
                    key={file.fileKey}
                    className={`file-card ${selected === file.fileKey ? "selected" : ""}`}
                    onClick={() => setSelected(file.fileKey)}
                  >
                    <div className="file-thumb">
                      <span style={{ fontSize: 40 }}>{getIcon(file.fileName)}</span>
                    </div>
                    <div className="file-name" title={file.fileName}>{file.fileName}</div>
                    <div className="file-meta">
                      <span>{formatSize(file.fileSize)}</span>
                      <span>{formatDate(file.uploadedAt)}</span>
                    </div>
                    <div className="file-actions">
                      <button className="file-action-btn" title="AI Insight" onClick={e => openInsight(file, e)} style={{ background: "var(--accent-bg)" }}>✦</button>
                      <button className="file-action-btn" title="Download" onClick={e => { e.stopPropagation(); showToast(`⬇ Downloading ${file.fileName}`); }}>⬇</button>
                      <button className="file-action-btn" title="Delete" onClick={e => { e.stopPropagation(); setFiles(prev => prev.filter(f => f.fileKey !== file.fileKey)); showToast("🗑 File deleted"); }}>🗑</button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="file-list">
                <div className="file-row" style={{ opacity: 0.5, cursor: "default", fontSize: 11, color: "var(--text3)" }}>
                  <div style={{ width: 32 }} />
                  <div style={{ flex: 1 }}>Name</div>
                  <div style={{ minWidth: 100 }}>Size</div>
                  <div style={{ minWidth: 120 }}>Uploaded</div>
                  <div style={{ width: 80 }} />
                </div>
                {filtered.map(file => (
                  <div
                    key={file.fileKey}
                    className={`file-row ${selected === file.fileKey ? "selected" : ""}`}
                    onClick={() => setSelected(file.fileKey)}
                  >
                    <div className="row-icon">{getIcon(file.fileName)}</div>
                    <div className="row-name">{file.fileName}</div>
                    <div className="row-meta">{formatSize(file.fileSize)}</div>
                    <div className="row-meta">{formatDate(file.uploadedAt)}</div>
                    <div className="row-actions">
                      <button className="file-action-btn" title="AI Insight" onClick={e => openInsight(file, e)} style={{ background: "var(--accent-bg)", fontSize: 12 }}>✦</button>
                      <button className="file-action-btn" title="Download" onClick={e => { e.stopPropagation(); showToast(`⬇ Downloading ${file.fileName}`); }}>⬇</button>
                      <button className="file-action-btn" title="Delete" onClick={e => { e.stopPropagation(); setFiles(prev => prev.filter(f => f.fileKey !== file.fileKey)); showToast("🗑 File deleted"); }}>🗑</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>

        {/* ── AI Insight Panel (The Crazy Feature) ── */}
        <div className={`insight-panel ${insightOpen ? "open" : ""}`}>
          <div className="insight-header">
            <div className="insight-title">
              ✦ File Intelligence
              <span className={`ai-badge ${aiThinking ? "ai-thinking" : ""}`}>
                {aiThinking ? "thinking…" : "FILIO AI"}
              </span>
            </div>
            <button className="close-btn" onClick={() => setInsightOpen(false)}>×</button>
          </div>

          {insightFile && !aiThinking && insight && (
            <div className="insight-body">
              {/* File preview */}
              <div className="insight-file-preview">
                <div className="insight-file-icon">{getIcon(insightFile.fileName)}</div>
                <div>
                  <div className="insight-file-name">{insightFile.fileName}</div>
                  <div className="insight-file-size">{formatSize(insightFile.fileSize)} · {formatDate(insightFile.uploadedAt)}</div>
                </div>
              </div>

              {/* AI Summary */}
              <div className="insight-section">
                <div className="insight-section-title">AI Summary</div>
                <div className="ai-summary">{insight.summary}</div>
              </div>

              {/* Smart tags */}
              <div className="insight-section">
                <div className="insight-section-title">Auto-tagged</div>
                <div className="tag-cloud">
                  {insight.tags.map((tag, i) => (
                    <span key={tag} className={`ai-tag ${["orange","green","blue"][i % 3]}`}>#{tag}</span>
                  ))}
                </div>
              </div>

              {/* Duplicate detector */}
              {insightFile.fileName.toLowerCase().includes("final") && (
                <div className="insight-section">
                  <div className="insight-section-title">⚠ Smart Alert</div>
                  <div className="duplicate-warn">
                    <span>🔴</span>
                    <span>Filio detected 2 files with similar names — possible duplicates. Tap to review and free up space.</span>
                  </div>
                </div>
              )}

              {/* Activity */}
              <div className="insight-section">
                <div className="insight-section-title">Activity</div>
                {insight.activity.map((act, i) => (
                  <div key={i} className="timeline-item">
                    <div className="timeline-dot" />
                    <div>
                      <div className="timeline-text">{act}</div>
                      <div className="timeline-time">{i === 0 ? "Just now" : "Earlier today"}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <button className="btn btn-primary" onClick={() => showToast(`⬇ Downloading ${insightFile.fileName}`)}>⬇ Download</button>
                <button className="btn btn-ghost" onClick={() => showToast("🔗 Share link copied!")}>🔗 Share</button>
                <button className="btn btn-ghost" onClick={() => showToast("⭐ Starred!")}>⭐ Star</button>
              </div>
            </div>
          )}

          {aiThinking && (
            <div className="insight-body" style={{ display: "flex", flexDirection: "column", gap: 12, padding: "20px" }}>
              <div className="shimmer" style={{ height: 70, width: "100%" }} />
              <div className="shimmer" style={{ height: 90, width: "100%" }} />
              <div style={{ display: "flex", gap: 8 }}>
                <div className="shimmer" style={{ height: 28, width: 70 }} />
                <div className="shimmer" style={{ height: 28, width: 60 }} />
                <div className="shimmer" style={{ height: 28, width: 80 }} />
              </div>
              <div className="shimmer" style={{ height: 100, width: "100%" }} />
            </div>
          )}

          {!insightFile && (
            <div className="insight-body" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", gap: 12, opacity: 0.4 }}>
              <div style={{ fontSize: 48 }}>✦</div>
              <div style={{ fontSize: 14, color: "var(--text2)", textAlign: "center" }}>
                Click the ✦ button on any file to see AI-powered insights
              </div>
            </div>
          )}
        </div>

        {/* FAB */}
        <button
          className={`ai-trigger ${insightOpen ? "panel-open" : ""}`}
          onClick={() => insightOpen ? setInsightOpen(false) : (selected ? openInsight(files.find(f => f.fileKey === selected)) : setInsightOpen(true))}
          title="Filio AI"
        >
          ✦
        </button>

        {/* Toast */}
        <div className={`toast ${toast.show ? "show" : ""}`}>{toast.msg}</div>
      </div>
    </>
  );
}
