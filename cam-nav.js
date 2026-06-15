/**
 * cam-nav.js — Cambridge Grade 4 Tutor
 * Injects a sticky top navigation bar into every lesson page.
 * Just include <script src="cam-nav.js"></script> before </body>.
 */
(function () {

  /* ── PAGE REGISTRY ─────────────────────────────────────────────────────── */
  const PAGES = {
    /* English — Stage 5 Unit 1 */
    'unit1_home.html':                   { subject:'English', color:'#7c3aed', bg:'#ede9fe', crumb:['English','Unit 1','Overview'] },
    'unit1_lesson_1_1.html':             { subject:'English', color:'#7c3aed', bg:'#ede9fe', crumb:['English','Unit 1','Lesson 1.1 – Aesop\'s Fable'] },
    'unit1_lesson_1_2.html':             { subject:'English', color:'#7c3aed', bg:'#ede9fe', crumb:['English','Unit 1','Lesson 1.2 – Understanding'] },
    'unit1_lesson_1_3.html':             { subject:'English', color:'#7c3aed', bg:'#ede9fe', crumb:['English','Unit 1','Lesson 1.3 – Story Features'] },
    'unit1_lesson_1_4.html':             { subject:'English', color:'#7c3aed', bg:'#ede9fe', crumb:['English','Unit 1','Lesson 1.4'] },
    'unit1_lesson_1_5.html':             { subject:'English', color:'#7c3aed', bg:'#ede9fe', crumb:['English','Unit 1','Lesson 1.5'] },
    'unit1_lesson_1_6.html':             { subject:'English', color:'#7c3aed', bg:'#ede9fe', crumb:['English','Unit 1','Lesson 1.6'] },
    'unit1_lesson_1_7.html':             { subject:'English', color:'#7c3aed', bg:'#ede9fe', crumb:['English','Unit 1','Lesson 1.7'] },
    'unit1_lesson_1_8.html':             { subject:'English', color:'#7c3aed', bg:'#ede9fe', crumb:['English','Unit 1','Lesson 1.8'] },
    'unit1_lesson_1_9.html':             { subject:'English', color:'#7c3aed', bg:'#ede9fe', crumb:['English','Unit 1','Lesson 1.9'] },
    'unit1_lesson_1_10.html':            { subject:'English', color:'#7c3aed', bg:'#ede9fe', crumb:['English','Unit 1','Lesson 1.10'] },
    'unit1_lesson_1_11.html':            { subject:'English', color:'#7c3aed', bg:'#ede9fe', crumb:['English','Unit 1','Lesson 1.11'] },
    'unit1_practice_comprehension.html': { subject:'English', color:'#7c3aed', bg:'#ede9fe', crumb:['English','Unit 1','Practice – Comprehension'] },
    'unit1_practice_writing.html':       { subject:'English', color:'#7c3aed', bg:'#ede9fe', crumb:['English','Unit 1','Practice – Writing'] },
    /* English — Stage 4 */
    'Chapter1_Fables_Adventure.html':    { subject:'English', color:'#7c3aed', bg:'#ede9fe', crumb:['English','Stage 4','Chapter 1 – Fables & Adventures'] },
    /* Science */
    'Science_Chapter1_Interactive.html': { subject:'Science', color:'#059669', bg:'#d1fae5', crumb:['Science','Chapter 1 – Life Cycles of Flowering Plants'] },
    'Science_Chapter2_Sound.html':       { subject:'Science', color:'#059669', bg:'#d1fae5', crumb:['Science','Chapter 2 – Sound'] },
    'Science_Chapter3_Matter.html':      { subject:'Science', color:'#059669', bg:'#d1fae5', crumb:['Science','Chapter 3 – States & Properties of Matter'] },
    'Science_Quiz.html':                 { subject:'Science', color:'#059669', bg:'#d1fae5', crumb:['Science','Quiz Challenge'] },
    'Science_PracticePaper.html':        { subject:'Science', color:'#059669', bg:'#d1fae5', crumb:['Science','Practice Paper – Exam Simulator'] },
    /* Maths */
    'Maths_Chapter1_NumberSystem.html':       { subject:'Maths', color:'#d97706', bg:'#fef3c7', crumb:['Maths','Unit 1 – The Number System'] },
    'Maths_Chapter2_Shapes_Symmetry.html':    { subject:'Maths', color:'#d97706', bg:'#fef3c7', crumb:['Maths','Unit 2 – 2D Shapes & Symmetry'] },
    'Maths_Chapter3_NumbersSequences.html':   { subject:'Maths', color:'#d97706', bg:'#fef3c7', crumb:['Maths','Unit 3 – Numbers & Sequences'] },
  };

  /* ── DETECT CURRENT PAGE ────────────────────────────────────────────────── */
  const filename = window.location.pathname.split('/').pop() || '';
  const page = PAGES[filename];
  if (!page) return; // index.html or unknown — skip

  /* ── HOME URL ───────────────────────────────────────────────────────────── */
  const homeURL = (function () {
    const p = window.location.pathname;
    if (p.includes('/cam-tutor/')) return '/cam-tutor/';
    const parts = p.split('/');
    parts[parts.length - 1] = 'index.html';
    return parts.join('/');
  })();

  /* ── BUILD BREADCRUMB HTML ──────────────────────────────────────────────── */
  const crumbHTML = page.crumb.map((c, i) => {
    const isLast = i === page.crumb.length - 1;
    return isLast
      ? `<span style="color:#f1f5f9;font-weight:700">${c}</span>`
      : `<span style="color:#94a3b8">${c}</span><span style="color:#475569;margin:0 5px">›</span>`;
  }).join('');

  /* ── INJECT NAV BAR ─────────────────────────────────────────────────────── */
  const css = `
    #_cam_nav {
      position: fixed; top: 0; left: 0; right: 0; height: 52px;
      background: #0f172a;
      display: flex; align-items: center;
      padding: 0 16px; gap: 10px;
      z-index: 2147483647;
      font-family: 'Nunito', system-ui, -apple-system, sans-serif;
      font-size: 13px;
      box-shadow: 0 2px 16px rgba(0,0,0,0.4);
    }
    #_cam_nav a._cn_home {
      display: inline-flex; align-items: center; gap: 5px;
      background: #1e293b; color: #e2e8f0;
      text-decoration: none;
      padding: 6px 14px; border-radius: 24px;
      font-weight: 700; font-size: 13px;
      border: 1px solid #334155;
      transition: background .15s, border-color .15s;
      white-space: nowrap;
    }
    #_cam_nav a._cn_home:hover { background: #334155; border-color: #475569; }
    #_cam_nav ._cn_sep { width: 1px; height: 22px; background: #334155; flex-shrink: 0; }
    #_cam_nav ._cn_badge {
      display: inline-flex; align-items: center;
      padding: 4px 12px; border-radius: 24px;
      font-size: 12px; font-weight: 800;
      background: ${page.bg}22; color: ${page.color};
      border: 1px solid ${page.color}44;
      white-space: nowrap; flex-shrink: 0;
    }
    #_cam_nav ._cn_crumb {
      flex: 1; overflow: hidden;
      white-space: nowrap; text-overflow: ellipsis;
      font-size: 13px; line-height: 1;
    }
  `;

  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  const nav = document.createElement('nav');
  nav.id = '_cam_nav';
  nav.innerHTML = `
    <a href="${homeURL}" class="_cn_home">🏠 Home</a>
    <div class="_cn_sep"></div>
    <span class="_cn_badge">${page.subject}</span>
    <div class="_cn_crumb">${crumbHTML}</div>
  `;

  function inject() {
    document.body.insertBefore(nav, document.body.firstChild);
    // Offset body so content isn't hidden under the bar
    const existing = parseInt(document.body.style.paddingTop) || 0;
    document.body.style.paddingTop = (existing + 52) + 'px';
    // Also fix any position:fixed headers in the page
    const fixedHeaders = document.querySelectorAll(
      '.header, header, .hero, .nav-bar, .top-bar, [style*="position:fixed"][style*="top:0"], [style*="position: fixed"][style*="top: 0"]'
    );
    fixedHeaders.forEach(el => {
      const t = parseInt(window.getComputedStyle(el).top) || 0;
      if (t <= 4) el.style.top = (t + 52) + 'px';
    });
  }

  if (document.body) {
    inject();
  } else {
    document.addEventListener('DOMContentLoaded', inject);
  }

})();
