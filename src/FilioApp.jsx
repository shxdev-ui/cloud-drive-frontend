import { useState, useEffect, useRef, useCallback } from "react";

// ── Filio Design System ──────────────────────────────────────────────────────
const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');`;

const css = `
  ${FONTS}
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #F5F3EE;
    --bg2: #ECEAE4;
    --bg3: #E2DFD8;
    --surface: #FFFFFF;
    --surface2: #F8F6F2;
    --border: rgba(0,0,0,0.08);
    --border2: rgba(0,0,0,0.14);
    --text: #1A1814;
    --text2: #6B6760;
    --text3: #9E9B96;
    --accent: #C8500A;
    --accent2: #E8651A;
    --accent-bg: #FDF0E8;
    --accent-text: #8B3505;
    --green: #2D7A4F;
    --green-bg: #EAF5EE;
    --blue: #1A5FA8;
    --blue-bg: #EAF1FB;
    --red: #B83232;
    --red-bg: #FBEAEA;
    --shadow: 0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04);
    --shadow-lg: 0 8px 32px rgba(0,0,0,0.10);
    --radius: 14px;
    --radius-sm: 8px;
    --transition: 0.2s cubic-bezier(0.4,0,0.2,1);
    font-family: 'DM Sans', sans-serif;
  }

  [data-theme="dark"] {
    --bg: #141210;
    --bg2: #1C1A17;
    --bg3: #242118;
    --surface: #1E1C19;
    --surface2: #252320;
    --border: rgba(255,255,255,0.07);
    --border2: rgba(255,255,255,0.12);
    --text: #F0EDE8;
    --text2: #9E9B94;
    --text3: #6B6860;
    --accent: #E8651A;
    --accent2: #FF7A2E;
    --accent-bg: #2A1A0A;
    --accent-text: #FF9955;
    --green: #4CAF7D;
    --green-bg: #0A2018;
    --blue: #5B9BD5;
    --blue-bg: #0A1828;
    --red: #E05C5C;
    --red-bg: #280A0A;
    --shadow: 0 1px 3px rgba(0,0,0,0.3), 0 4px 16px rgba(0,0,0,0.2);
    --shadow-lg: 0 8px 32px rgba(0,0,0,0.4);
  }

  body { background: var(--bg); color: var(--text); transition: background var(--transition), color var(--transition); }

  /* Scrollbar */
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: var(--border2); border-radius: 3px; }

  .app { min-height: 100vh; display: flex; flex-direction: column; }

  /* ── Navbar ── */
  .navbar {
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 28px; height: 60px;
    background: var(--surface);
    border-bottom: 1px solid var(--border);
    position: sticky; top: 0; z-index: 100;
    backdrop-filter: blur(12px);
  }
  .logo {
    font-family: 'Syne', sans-serif; font-weight: 800; font-size: 22px;
    color: var(--accent); letter-spacing: -0.5px;
    display: flex; align-items: center; gap: 8px;
  }
  .logo-dot { width: 8px; height: 8px; background: var(--accent); border-radius: 50%; margin-bottom: 1px; }
  .nav-right { display: flex; align-items: center; gap: 12px; }
  .theme-btn {
    width: 40px; height: 24px; border-radius: 12px;
    background: var(--bg3); border: 1px solid var(--border2);
    cursor: pointer; position: relative; transition: background var(--transition);
    display: flex; align-items: center; padding: 2px;
  }
  .theme-btn::after {
    content: ''; width: 18px; height: 18px; border-radius: 50%;
    background: var(--surface); box-shadow: var(--shadow);
    transition: transform var(--transition);
    transform: translateX(0);
  }
  [data-theme="dark"] .theme-btn::after { transform: translateX(16px); }
  .theme-label { font-size: 12px; color: var(--text3); }
  .user-chip {
    display: flex; align-items: center; gap: 8px;
    padding: 5px 12px 5px 5px; border-radius: 20px;
    background: var(--surface2); border: 1px solid var(--border);
  }
  .avatar {
    width: 28px; height: 28px; border-radius: 50%;
    background: var(--accent-bg); color: var(--accent);
    font-size: 12px; font-weight: 600;
    display: flex; align-items: center; justify-content: center;
    font-family: 'Syne', sans-serif;
  }
  .user-name { font-size: 13px; color: var(--text2); }
  .signout-btn {
    padding: 5px 12px; border-radius: 8px; border: 1px solid var(--border2);
    background: transparent; color: var(--text2); font-size: 12px;
    cursor: pointer; transition: all var(--transition);
    font-family: 'DM Sans', sans-serif;
  }
  .signout-btn:hover { background: var(--bg2); color: var(--text); }

  /* ── Layout ── */
  .main { display: flex; flex: 1; overflow: hidden; height: calc(100vh - 60px); }
  .sidebar {
    width: 240px; flex-shrink: 0;
    background: var(--surface);
    border-right: 1px solid var(--border);
    display: flex; flex-direction: column;
    padding: 20px 12px;
    overflow-y: auto;
  }
  .sidebar-section { margin-bottom: 24px; }
  .sidebar-label {
    font-size: 10px; font-weight: 600; letter-spacing: 0.08em;
    color: var(--text3); text-transform: uppercase;
    padding: 0 8px; margin-bottom: 6px;
  }
  .nav-item {
    display: flex; align-items: center; gap: 10px;
    padding: 9px 10px; border-radius: var(--radius-sm);
    cursor: pointer; transition: all var(--transition);
    font-size: 14px; color: var(--text2);
    border: none; background: none; width: 100%; text-align: left;
    font-family: 'DM Sans', sans-serif;
  }
  .nav-item:hover { background: var(--bg2); color: var(--text); }
  .nav-item.active { background: var(--accent-bg); color: var(--accent); font-weight: 500; }
  .nav-item .icon { font-size: 16px; width: 20px; text-align: center; }
  .nav-item .count {
    margin-left: auto; font-size: 11px;
    background: var(--bg3); color: var(--text3);
    padding: 1px 7px; border-radius: 10px;
  }
  .nav-item.active .count { background: var(--accent-bg); color: var(--accent); }

  /* Storage bar */
  .storage-card {
    margin-top: auto; padding: 14px;
    background: var(--bg2); border-radius: var(--radius-sm);
    border: 1px solid var(--border);
  }
  .storage-label { font-size: 12px; color: var(--text2); margin-bottom: 8px; display: flex; justify-content: space-between; }
  .storage-bar { height: 4px; background: var(--bg3); border-radius: 2px; overflow: hidden; margin-bottom: 8px; }
  .storage-fill { height: 100%; background: var(--accent); border-radius: 2px; transition: width 1s cubic-bezier(0.4,0,0.2,1); }
  .upgrade-btn {
    width: 100%; padding: 8px; border-radius: var(--radius-sm);
    background: var(--accent); color: #fff; border: none;
    font-size: 12px; font-weight: 500; cursor: pointer;
    transition: background var(--transition);
    font-family: 'DM Sans', sans-serif;
  }
  .upgrade-btn:hover { background: var(--accent2); }

  /* ── Content ── */
  .content { flex: 1; overflow-y: auto; padding: 28px; }

  /* Header row */
  .content-header {
    display: flex; align-items: center; justify-content: space-between;
    margin-bottom: 24px;
  }
  .page-title { font-family: 'Syne', sans-serif; font-size: 22px; font-weight: 700; }
  .header-actions { display: flex; gap: 10px; align-items: center; }

  /* Toolbar */
  .toolbar {
    display: flex; align-items: center; gap: 10px;
    padding: 10px 14px;
    background: var(--surface); border: 1px solid var(--border);
    border-radius: var(--radius); margin-bottom: 20px;
    box-shadow: var(--shadow);
  }
  .search-input {
    flex: 1; border: none; background: transparent;
    font-size: 14px; color: var(--text); outline: none;
    font-family: 'DM Sans', sans-serif;
  }
  .search-input::placeholder { color: var(--text3); }
  .toolbar-divider { width: 1px; height: 20px; background: var(--border2); }
  .view-btn {
    width: 32px; height: 32px; border-radius: 6px;
    border: 1px solid transparent; background: transparent;
    cursor: pointer; display: flex; align-items: center; justify-content: center;
    font-size: 15px; color: var(--text3); transition: all var(--transition);
  }
  .view-btn.active { background: var(--bg2); color: var(--text); border-color: var(--border2); }
  .filter-btn {
    padding: 6px 12px; border-radius: 8px;
    border: 1px solid var(--border2); background: var(--surface2);
    color: var(--text2); font-size: 12px; cursor: pointer;
    font-family: 'DM Sans', sans-serif; transition: all var(--transition);
  }
  .filter-btn:hover, .filter-btn.active { background: var(--accent-bg); color: var(--accent); border-color: var(--accent); }

  /* Upload zone */
  .upload-zone {
    border: 2px dashed var(--border2);
    border-radius: var(--radius);
    padding: 32px; text-align: center;
    margin-bottom: 20px;
    transition: all var(--transition);
    cursor: pointer; position: relative;
    background: var(--surface);
  }
  .upload-zone:hover, .upload-zone.dragging {
    border-color: var(--accent);
    background: var(--accent-bg);
  }
  .upload-zone .upload-icon { font-size: 32px; margin-bottom: 10px; }
  .upload-zone p { font-size: 14px; color: var(--text2); }
  .upload-zone span { color: var(--accent); font-weight: 500; }
  .upload-progress {
    position: absolute; bottom: 0; left: 0; right: 0; height: 3px;
    background: var(--bg3); border-radius: 0 0 var(--radius) var(--radius); overflow: hidden;
  }
  .upload-progress-fill { height: 100%; background: var(--accent); transition: width 0.3s; }

  /* File grid */
  .file-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 14px; }
  .file-list { display: flex; flex-direction: column; gap: 2px; }

  .file-card {
    background: var(--surface); border: 1px solid var(--border);
    border-radius: var(--radius); padding: 16px;
    cursor: pointer; transition: all var(--transition);
    position: relative; overflow: hidden;
    box-shadow: var(--shadow);
  }
  .file-card:hover { border-color: var(--border2); box-shadow: var(--shadow-lg); transform: translateY(-2px); }
  .file-card.selected { border-color: var(--accent); background: var(--accent-bg); }

  .file-thumb {
    width: 100%; aspect-ratio: 1; border-radius: 8px;
    background: var(--bg2); display: flex; align-items: center; justify-content: center;
    font-size: 36px; margin-bottom: 12px; position: relative; overflow: hidden;
  }
  .file-thumb img { width: 100%; height: 100%; object-fit: cover; border-radius: 8px; }
  .file-name { font-size: 13px; font-weight: 500; color: var(--text); truncate: ellipsis; overflow: hidden; white-space: nowrap; }
  .file-meta { font-size: 11px; color: var(--text3); margin-top: 3px; display: flex; justify-content: space-between; }
  .file-actions {
    position: absolute; top: 8px; right: 8px;
    display: flex; gap: 4px; opacity: 0; transition: opacity var(--transition);
  }
  .file-card:hover .file-actions { opacity: 1; }
  .file-action-btn {
    width: 28px; height: 28px; border-radius: 6px;
    border: none; cursor: pointer; font-size: 13px;
    display: flex; align-items: center; justify-content: center;
    background: var(--surface); box-shadow: var(--shadow);
    transition: all var(--transition);
  }
  .file-action-btn:hover { transform: scale(1.1); }

  /* List row */
  .file-row {
    display: flex; align-items: center; gap: 14px;
    padding: 10px 14px; border-radius: var(--radius-sm);
    cursor: pointer; transition: all var(--transition);
    border: 1px solid transparent;
  }
  .file-row:hover { background: var(--surface); border-color: var(--border); }
  .file-row.selected { background: var(--accent-bg); border-color: var(--accent); }
  .file-row .row-icon { font-size: 22px; width: 32px; text-align: center; }
  .file-row .row-name { flex: 1; font-size: 14px; font-weight: 500; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; }
  .file-row .row-meta { font-size: 12px; color: var(--text3); min-width: 80px; text-align: right; }
  .file-row .row-actions { display: flex; gap: 6px; opacity: 0; transition: opacity var(--transition); }
  .file-row:hover .row-actions { opacity: 1; }

  /* ── CRAZY FEATURE: AI Insight Panel ── */
  .insight-panel {
    position: fixed; right: 0; top: 60px; bottom: 0;
    width: 320px; background: var(--surface);
    border-left: 1px solid var(--border);
    display: flex; flex-direction: column;
    transform: translateX(100%);
    transition: transform 0.35s cubic-bezier(0.4,0,0.2,1);
    z-index: 50; box-shadow: var(--shadow-lg);
  }
  .insight-panel.open { transform: translateX(0); }
  .insight-header {
    padding: 18px 20px 14px;
    border-bottom: 1px solid var(--border);
    display: flex; align-items: center; justify-content: space-between;
  }
  .insight-title {
    font-family: 'Syne', sans-serif; font-size: 15px; font-weight: 700;
    display: flex; align-items: center; gap: 8px;
  }
  .ai-badge {
    font-size: 10px; padding: 2px 7px; border-radius: 10px;
    background: var(--accent-bg); color: var(--accent);
    font-weight: 600; letter-spacing: 0.05em;
  }
  .close-btn {
    width: 28px; height: 28px; border-radius: 6px; border: none;
    background: var(--bg2); cursor: pointer; font-size: 16px;
    display: flex; align-items: center; justify-content: center;
    color: var(--text2); transition: all var(--transition);
  }
  .close-btn:hover { background: var(--bg3); color: var(--text); }
  .insight-body { flex: 1; overflow-y: auto; padding: 16px 20px; }
  .insight-section { margin-bottom: 20px; }
  .insight-section-title { font-size: 11px; font-weight: 600; color: var(--text3); text-transform: uppercase; letter-spacing: 0.07em; margin-bottom: 10px; }
  .insight-file-preview {
    background: var(--bg2); border-radius: var(--radius-sm);
    padding: 14px; display: flex; gap: 12px; align-items: center;
    margin-bottom: 14px;
  }
  .insight-file-icon { font-size: 28px; }
  .insight-file-name { font-size: 13px; font-weight: 500; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; }
  .insight-file-size { font-size: 11px; color: var(--text3); margin-top: 2px; }

  /* AI tags */
  .tag-cloud { display: flex; flex-wrap: wrap; gap: 6px; }
  .ai-tag {
    padding: 4px 10px; border-radius: 20px; font-size: 12px;
    cursor: pointer; transition: all var(--transition); border: 1px solid;
  }
  .ai-tag.orange { background: var(--accent-bg); color: var(--accent); border-color: var(--accent); }
  .ai-tag.green { background: var(--green-bg); color: var(--green); border-color: var(--green); }
  .ai-tag.blue { background: var(--blue-bg); color: var(--blue); border-color: var(--blue); }
  .ai-tag:hover { opacity: 0.7; }

  /* AI summary */
  .ai-summary {
    background: var(--accent-bg); border: 1px solid var(--accent);
    border-radius: var(--radius-sm); padding: 12px;
    font-size: 13px; color: var(--accent-text); line-height: 1.6;
    position: relative;
  }
  .ai-summary::before {
    content: '✦'; position: absolute; top: -8px; left: 12px;
    background: var(--surface); padding: 0 4px;
    font-size: 12px; color: var(--accent);
  }

  /* Timeline */
  .timeline-item {
    display: flex; gap: 10px; padding: 8px 0;
    border-bottom: 1px solid var(--border); font-size: 13px;
  }
  .timeline-item:last-child { border-bottom: none; }
  .timeline-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--accent); margin-top: 6px; flex-shrink: 0; }
  .timeline-text { color: var(--text2); }
  .timeline-time { font-size: 11px; color: var(--text3); margin-top: 2px; }

  /* Smart duplicate warning */
  .duplicate-warn {
    background: var(--red-bg); border: 1px solid var(--red);
    border-radius: var(--radius-sm); padding: 12px;
    font-size: 13px; color: var(--red); line-height: 1.5;
    display: flex; gap: 8px; align-items: flex-start;
  }

  /* ── Stats row ── */
  .stats-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; margin-bottom: 24px; }
  .stat-card {
    background: var(--surface); border: 1px solid var(--border);
    border-radius: var(--radius); padding: 16px;
    box-shadow: var(--shadow);
  }
  .stat-value { font-family: 'Syne', sans-serif; font-size: 24px; font-weight: 700; color: var(--text); }
  .stat-label { font-size: 12px; color: var(--text3); margin-top: 4px; }
  .stat-change { font-size: 11px; color: var(--green); margin-top: 6px; }

  /* Empty state */
  .empty-state { text-align: center; padding: 60px 20px; }
  .empty-icon { font-size: 56px; margin-bottom: 16px; opacity: 0.4; }
  .empty-title { font-family: 'Syne', sans-serif; font-size: 18px; font-weight: 600; color: var(--text); margin-bottom: 8px; }
  .empty-desc { font-size: 14px; color: var(--text3); }

  /* Btn */
  .btn {
    padding: 9px 18px; border-radius: var(--radius-sm);
    font-size: 13px; font-weight: 500; cursor: pointer;
    transition: all var(--transition); border: none;
    font-family: 'DM Sans', sans-serif; display: inline-flex; align-items: center; gap: 6px;
  }
  .btn-primary { background: var(--accent); color: #fff; }
  .btn-primary:hover { background: var(--accent2); transform: translateY(-1px); box-shadow: 0 4px 12px rgba(200,80,10,0.3); }
  .btn-ghost { background: transparent; color: var(--text2); border: 1px solid var(--border2); }
  .btn-ghost:hover { background: var(--bg2); color: var(--text); }

  /* Notification toast */
  .toast {
    position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%) translateY(100px);
    background: var(--text); color: var(--bg);
    padding: 12px 20px; border-radius: 40px;
    font-size: 13px; font-weight: 500;
    transition: transform 0.3s cubic-bezier(0.4,0,0.2,1);
    z-index: 200; white-space: nowrap;
    display: flex; align-items: center; gap: 8px;
  }
  .toast.show { transform: translateX(-50%) translateY(0); }

  /* AI Insight trigger */
  .ai-trigger {
    position: fixed; right: 24px; bottom: 24px;
    width: 52px; height: 52px; border-radius: 50%;
    background: var(--accent); color: #fff;
    border: none; cursor: pointer;
    font-size: 22px;
    box-shadow: 0 4px 20px rgba(200,80,10,0.4);
    display: flex; align-items: center; justify-content: center;
    transition: all var(--transition); z-index: 40;
  }
  .ai-trigger:hover { transform: scale(1.1); box-shadow: 0 6px 28px rgba(200,80,10,0.5); }
  .ai-trigger.panel-open { transform: translateX(-340px); }

  /* Breadcrumb */
  .breadcrumb { display: flex; align-items: center; gap: 6px; font-size: 13px; color: var(--text3); margin-bottom: 20px; }
  .breadcrumb span { color: var(--text2); cursor: pointer; }
  .breadcrumb span:hover { color: var(--accent); }
  .breadcrumb .sep { color: var(--text3); }

  /* Pulse animation for AI badge */
  @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.5; } }
  .ai-thinking { animation: pulse 1.2s infinite; }

  /* Shimmer for loading */
  @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
  .shimmer {
    background: linear-gradient(90deg, var(--bg2) 25%, var(--bg3) 50%, var(--bg2) 75%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
    border-radius: 6px;
  }

  /* Floating label on upload */
  .drop-hint { pointer-events: none; }

  /* insight panel adjustment when open */
  .content.panel-open { margin-right: 320px; transition: margin 0.35s cubic-bezier(0.4,0,0.2,1); }
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
const MOCK_FILES = [
  { fileKey: "1", fileName: "Q1 Report.pdf", fileSize: 2400000, folder: "root", uploadedAt: "2026-05-10T09:00:00Z", status: "ready" },
  { fileKey: "2", fileName: "Hero Image.png", fileSize: 840000, folder: "root", uploadedAt: "2026-05-12T11:30:00Z", status: "ready" },
  { fileKey: "3", fileName: "Budget 2026.xlsx", fileSize: 156000, folder: "root", uploadedAt: "2026-05-14T14:00:00Z", status: "ready" },
  { fileKey: "4", fileName: "Product Demo.mp4", fileSize: 48000000, folder: "root", uploadedAt: "2026-05-15T08:45:00Z", status: "ready" },
  { fileKey: "5", fileName: "Meeting Notes.docx", fileSize: 32000, folder: "root", uploadedAt: "2026-05-16T16:20:00Z", status: "ready" },
  { fileKey: "6", fileName: "Logo Final.png", fileSize: 124000, folder: "root", uploadedAt: "2026-05-17T10:00:00Z", status: "ready" },
  { fileKey: "7", fileName: "Source Code.zip", fileSize: 8200000, folder: "root", uploadedAt: "2026-05-17T12:00:00Z", status: "ready" },
  { fileKey: "8", fileName: "Podcast Ep3.mp3", fileSize: 22000000, folder: "root", uploadedAt: "2026-05-17T13:00:00Z", status: "ready" },
];

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
