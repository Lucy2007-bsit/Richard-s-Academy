/* ============================================================
   Richard's Academy — script.js
   ============================================================ */

/* ── XP / Level config ── */
const YEAR_XP = {
  year1: { xp: 2500,  max: 5000,  label: 'LEVEL 1' },
  year2: { xp: 6700,  max: 10000, label: 'LEVEL 2' },
  year3: { xp: 8200,  max: 10000, label: 'LEVEL 3' },
  year4: { xp: 10000, max: 10000, label: 'MAX LEVEL' },
};

function setXP(yearId) {
  const cfg  = YEAR_XP[yearId];
  const pct  = Math.round((cfg.xp / cfg.max) * 100);
  const fill = document.getElementById('xpFill');
  const lvl  = document.querySelector('.xp-level');
  const cnt  = document.querySelector('.xp-count');
  if (fill) fill.style.width = pct + '%';
  if (lvl)  lvl.textContent  = cfg.label;
  if (cnt)  cnt.textContent  = yearId === 'year4'
    ? 'MAX LEVEL'
    : cfg.xp.toLocaleString() + ' / ' + cfg.max.toLocaleString() + ' XP';
}

/* ============================================================
   SOUND EFFECTS
   Drop audio files into the audio/ folder.
   ============================================================ */
const SOUNDS = {
  year1:        'audio/lucy-year1.mp3',
  year2:        'audio/lucy-year2.mp3',
  year3:        'audio/lucy-year3.mp3',
  year4:        'audio/lucy-year4.mp3',
  semOpen:      'audio/sfx-sem-open.mp3',
  subjectClick: 'audio/sfx-select.mp3',
  maxLevel:     'audio/lucy-maxlevel.mp3',
  menuOpen:     'audio/sfx-menu.mp3',
};

let activeVoice = null;

function playSound(key, volume = 0.85) {
  const src = SOUNDS[key];
  if (!src) return;
  if (activeVoice) { activeVoice.pause(); activeVoice.currentTime = 0; }
  const clip = new Audio(src);
  clip.volume = volume;
  clip.play().catch(() => {});
  if (['year1','year2','year3','year4','maxLevel'].includes(key)) activeVoice = clip;
}

/* ============================================================
   SUBJECT FILES
   ─────────────────────────────────────────────────────────────
   HOW TO ADD FILES:
   1. Put your PDFs/PPTXs inside the  files/  folder.
   2. For each subject below, add entries inside  files: [ ]
   3. Each entry needs:
        label    → tab name shown in the viewer  (e.g. 'Module 1')
        path     → path to the file              (e.g. 'files/NSTP112-mod1.pdf')
        fileType → 'pdf'  for PDF files
                   'pptx' for PowerPoint files
                   'drive' for a Google Drive /preview link

   EXAMPLE — subject with 3 files:
     files: [
       { label: 'Module 1', path: 'files/NSTP112-mod1.pdf',   fileType: 'pdf'  },
       { label: 'Module 2', path: 'files/NSTP112-mod2.pdf',   fileType: 'pdf'  },
       { label: 'Slides',   path: 'files/NSTP112-slides.pptx',fileType: 'pptx' },
     ],

   Leave  files: []  empty if you have nothing to upload yet.
   ============================================================ */
const SUBJECT_FILES = {

  /* ── 1st Year · 1st Semester ── */
  'NSTP111': {
    title: 'NSTP111 — Civic Welfare and Training Services 1',
    desc:  'Community service, civic welfare, and literacy training.',
    files: [],
  },
  'FOPR111': {
    title: 'FOPR111 — Fundamentals of Programming w/ Lab',
    desc:  'Programming logic, algorithms, and hands-on coding lab.',
    files: [],
  },
  'ITCL112': {
    title: 'ITCL112 — Introduction to Computing w/ Lab',
    desc:  'Computer fundamentals, hardware, software, and basic IT concepts.',
    files: [],
  },
  'PHED121': {
    title: 'PHED121 — PATHFit 1: Movement Competency Training',
    desc:  'Physical fitness and movement competency fundamentals.',
    files: [],
  },
  'STAS111': {
    title: 'STAS111 — Science, Technology and Society',
    desc:  'Relationship between science, technology, and modern society.',
    files: [],
  },
  'TCWD121': {
    title: 'TCWD121 — The Contemporary World with Peace Studies',
    desc:  'Globalization, contemporary world issues, and peace studies.',
    files: [],
  },
  'UNDS111': {
    title: 'UNDS111 — Understanding the Self',
    desc:  'Self-discovery, identity, and personal development.',
    files: [],
  },
  'VRTS111': {
    title: 'VRTS111 — Veritas et Misericordia 1',
    desc:  'Values formation, truth, and spiritual development.',
    files: [],
  },
  'ENGL111': {
    title: 'ENGL111 — College English (Elective)',
    desc:  'English communication skills for academic contexts.',
    files: [],
  },

  /* ── 1st Year · 2nd Semester ── */
  'NSTP112': {
    title: 'NSTP112 — National Service Training Program',
    desc:  'Civic welfare, literacy training, and community service.',
    files: [
      /* ADD YOUR FILES HERE — delete this comment line when done
      { label: 'Module 1', path: 'files/NSTP112-module1.pdf', fileType: 'pdf' },
      { label: 'Slides',   path: 'files/NSTP112-slides.pptx', fileType: 'pptx' },
      */
    ],
  },

  'CRWT111': {
    title: 'CRWT111 — Creative Writing',
    desc:  'Narrative, poetry, and fiction writing fundamentals.',
    files: [],
  },

  'INPR111': {
    title: 'INPR111 — Introduction to Programming',
    desc:  'Variables, loops, functions, and logic.',
    files: [],
  },

  'MATM111': {
    title: 'MATM111 — Mathematics in the Modern World',
    desc:  'Real-world patterns, data, and problem-solving.',
    files: [],
  },

  'PHED122': {
    title: 'PHED122 — Physical Education 2',
    desc:  'Physical fitness, sports, and wellness.',
    files: [],
  },

  'PURC111': {
    title: 'PURC111 — Purposive Communication',
    desc:  'Communication for academic and professional contexts.',
    files: [],
  },

  'VRTS112': {
    title: 'VRTS112 — Visual Arts',
    desc:  'Design principles, digital media, and art theory.',
    files: [],
  },

  'WBDV111': {
    title: 'WBDV111 — Web Development',
    desc:  'HTML, CSS, JavaScript — building for the web.',
    files: [
    { label: 'Prelims 1',        path: 'files/1st Year/2nd Sem/WBDV/Prelims/Module-1-Getting-Started-with-HTML.pdf',   fileType: 'pdf'  },
    { label: 'Prelims 2',        path: 'files/1st Year/2nd Sem/WBDV/Prelims/Module-2-Formatting-Text-and-Organizing-Data.pdf',   fileType: 'pdf'  },
    { label: 'Prelims 3',        path: 'files/1st Year/2nd Sem/WBDV/Prelims/Module-3-Exploring-Visual-and-Interactive-Elements.pdf',   fileType: 'pdf'  },
    { label: 'Prelims 4',        path: 'files/1st Year/2nd Sem/WBDV/Prelims/Module-4-Enhancing-Web-Presentation.pdf', fileType: 'pdf' },
    { label: 'Prelims Reviewer', path: 'files/1st Year/2nd Sem/WBDV/Prelims/PRELIM LAB EXAM REVIEWER.pdf',   fileType: 'pdf'  },
    { label: 'Prelims Reviewer 2', path: 'files/1st Year/2nd Sem/WBDV/Prelims/RECITATION REVIEWER_SDWAHTML.pdf',   fileType: 'pdf'  },
    { label: 'Midterms 1',        path: 'files/1st Year/2nd Sem/WBDV/Midterms/Lesson-1-Introduction-to-CSS.pdf',   fileType: 'pdf'  },
    { label: 'Midterms 2',        path: 'files/1st Year/2nd Sem/WBDV/Midterms/Parts-Of-A-Website (1).pdf',   fileType: 'pdf'  },
    { label: 'Finals 1',        path: 'files/1st Year/2nd Sem/WBDV/Finals/Introduction-to-JavaScript.pdf',   fileType: 'pdf'  },
    { label: 'Finals 2',        path: 'files/1st Year/2nd Sem/WBDV/Finals/Introduction-to-Javascript part 2.pdf',   fileType: 'pdf'  },
    { label: 'Finals 3',        path: 'files/1st Year/2nd Sem/WBDV/Finals/JS-Conditions-Loops-and-Strings.pdf',   fileType: 'pdf'  },
    { label: 'Finals 4',        path: 'files/1st Year/2nd Sem/WBDV/Finals/Introduction-to-JavaScript-and-Operator.pdf', fileType: 'pdf' },
    { label: 'Finals Reviewer', path: 'files/1st Year/2nd Sem/WBDV/Finals/JSReviewer.pdf',   fileType: 'pdf'  },
    ],
  },

  'PCDL111': {
    title: 'PCDL111 — PC Debugging & Logic',
    desc:  'Troubleshooting, hardware logic, and system diagnostics.',
    files: [],
  },

};

/* ── Active tab tracking ── */
let activeFileIndex     = 0;
let currentSubjectFiles = [];

/* ── Subject card click ── */
function openSubject(code) {
  playSound('subjectClick', 0.7);
  const subject = SUBJECT_FILES[code];

  if (!subject || subject.files.length === 0) {
    showNoFileModal(code, subject);
    return;
  }

  activeFileIndex     = 0;
  currentSubjectFiles = subject.files;
  openViewerModal(subject.title, subject.files, 0);
}

/* ── Build embed URL ── */
function buildEmbedUrl(file) {
  if (file.fileType === 'pptx') {
    /* Build absolute public URL for Office Online viewer */
    const origin = window.location.origin;
    const dir    = window.location.pathname.replace(/\/[^/]*$/, '');
    const fullUrl = origin + dir + '/' + file.path;
    return 'https://view.officeapps.live.com/op/embed.aspx?src=' + encodeURIComponent(fullUrl);
  }
  /* pdf — serve directly from files/ folder */
  return file.path;
}

/* ── Open viewer modal ── */
function openViewerModal(subjectTitle, files, startIndex) {
  const modal   = document.getElementById('viewerModal');
  const titleEl = document.getElementById('viewerModalTitle');
  const tabsEl  = document.getElementById('viewerTabs');
  if (!modal) return;

  titleEl.textContent = subjectTitle;
  modal.classList.add('show');
  document.body.style.overflow = 'hidden';

  /* Build tabs */
  tabsEl.innerHTML = '';
  files.forEach((file, i) => {
    const btn = document.createElement('button');
    btn.className = 'viewer-tab' + (i === startIndex ? ' active' : '');
    btn.textContent = file.label || ('File ' + (i + 1));
    btn.onclick = () => switchViewerTab(i);
    tabsEl.appendChild(btn);
  });
  tabsEl.style.display = files.length > 1 ? 'flex' : 'none';

  loadViewerFile(files[startIndex]);
}

/* ── Switch tab ── */
function switchViewerTab(index) {
  activeFileIndex = index;
  document.querySelectorAll('.viewer-tab').forEach((t, i) => {
    t.classList.toggle('active', i === index);
  });
  loadViewerFile(currentSubjectFiles[index]);
}

/* ── Load file into viewer body ── */
function loadViewerFile(file) {
  const body    = document.getElementById('viewerBody');
  const openBtn = document.getElementById('viewerOpenBtn');
  if (!body) return;

  /* "Open in new tab/download" button */
  if (openBtn) openBtn.href = file.path;

  /* Always build a fresh loader — never reuse the old DOM node */
  body.innerHTML = `
    <div class="viewer-loader" id="viewerLoader" style="display:flex">
      <div class="viewer-spinner"></div>
      <span>LOADING MODULE...</span>
    </div>`;
  const loader = document.getElementById('viewerLoader');

  const embedUrl = buildEmbedUrl(file);

  setTimeout(() => {
    if (!document.getElementById('viewerBody')) return; /* modal closed */

    const el = document.createElement('iframe');
    el.src           = embedUrl;
    el.frameBorder   = '0';
    el.allowFullscreen = true;
    el.style.cssText = 'width:100%;height:100%;display:block;border:none;opacity:0;transition:opacity 0.4s;position:absolute;top:0;left:0;';

    /* Hide loader and reveal iframe once loaded */
    const revealFrame = () => {
      const l = document.getElementById('viewerLoader');
      if (l) l.style.display = 'none';
      el.style.opacity = '1';
    };
    el.addEventListener('load', revealFrame);
    /* Safety fallback — show after max wait time */
    setTimeout(revealFrame, 8000);

    /* Make body a positioning context for absolute iframe */
    body.style.position = 'relative';
    body.appendChild(el);
  }, 200);
}

/* ── Close viewer ── */
function closeViewerModal() {
  const modal = document.getElementById('viewerModal');
  const body  = document.getElementById('viewerBody');
  if (!modal) return;
  modal.classList.remove('show');
  document.body.style.overflow = '';
  /* Clear body content after animation so next open starts fresh */
  setTimeout(() => {
    if (body) body.innerHTML = '';
  }, 380);
}

function handleViewerClick(e) {
  if (e.target === document.getElementById('viewerModal')) closeViewerModal();
}

/* ── No file modal ── */
function showNoFileModal(code, subject) {
  const modal   = document.getElementById('noFileModal');
  const codeEl  = document.getElementById('noFileCode');
  const descEl  = document.getElementById('noFileDesc');
  const titleEl = document.getElementById('noFileTitle');
  if (!modal) return;
  if (codeEl)  codeEl.textContent  = code;
  if (titleEl && subject) titleEl.textContent = subject.title || code;
  if (descEl  && subject) descEl.textContent  = subject.desc  || '';
  modal.classList.add('show');
  document.body.style.overflow = 'hidden';
}

function closeNoFileModal() {
  const modal = document.getElementById('noFileModal');
  if (!modal) return;
  modal.classList.remove('show');
  document.body.style.overflow = '';
}

function handleNoFileClick(e) {
  if (e.target === document.getElementById('noFileModal')) closeNoFileModal();
}

/* ── Year accordion — only one open at a time ── */
function toggleYear(id) {
  const block  = document.getElementById(id);
  const isOpen = block.classList.contains('open');

  /* Close ALL other open year blocks first */
  document.querySelectorAll('.year-block.open').forEach(openBlock => {
    if (openBlock.id === id) return; /* skip the one being clicked */
    openBlock.classList.remove('open');
    const inner = openBlock.querySelector('.year-inner');
    if (inner) inner.setAttribute('aria-expanded', 'false');

    /* Also close any open semesters inside that year */
    openBlock.querySelectorAll('.sem-block.active').forEach(sem => {
      sem.classList.remove('active');
      sem.setAttribute('aria-expanded', 'false');
      const ctrl = sem.getAttribute('aria-controls');
      if (ctrl) {
        const wrap = document.getElementById(ctrl);
        if (wrap) wrap.classList.remove('open');
      }
    });
  });

  /* Toggle the clicked year */
  block.classList.toggle('open', !isOpen);
  const inner = block.querySelector('.year-inner');
  if (inner) inner.setAttribute('aria-expanded', String(!isOpen));

  if (!isOpen) {
    setXP(id);
    playSound(id);
    if (id === 'year4') {
      setTimeout(showSplash, 300);
      setTimeout(() => playSound('maxLevel'), 600);
    }
  }
}

/* ── Splash ── */
function showSplash() {
  const t = document.getElementById('splashToast');
  if (t) t.classList.add('show');
}
function closeSplash() {
  const t = document.getElementById('splashToast');
  if (t) t.classList.remove('show');
}
function handleSplashClick(e) {
  if (e.target === document.getElementById('splashToast')) closeSplash();
}

/* ── Semester toggle — only one open at a time per year ── */
function toggleSem(semId, subjectsId) {
  const sem = document.getElementById(semId);
  const sub = document.getElementById(subjectsId);
  if (!sem || !sub) return;

  const isActive = sem.classList.contains('active');

  /* Close ALL other open semesters across the whole page first */
  document.querySelectorAll('.sem-block.active').forEach(openSem => {
    if (openSem.id === semId) return; /* skip the one being clicked */
    openSem.classList.remove('active');
    openSem.setAttribute('aria-expanded', 'false');
    /* Close its subjects wrap */
    const ctrl = openSem.getAttribute('aria-controls');
    if (ctrl) {
      const wrap = document.getElementById(ctrl);
      if (wrap) wrap.classList.remove('open');
    }
  });

  /* Now toggle the clicked one */
  sem.classList.toggle('active', !isActive);
  sub.classList.toggle('open', !isActive);
  sem.setAttribute('aria-expanded', String(!isActive));
  if (!isActive) playSound('semOpen', 0.6);
}

/* ── Search ── */
function filterSubjects(val) {
  const q = val.trim().toLowerCase();
  document.querySelectorAll('.subject-card').forEach(c => {
    const code = c.querySelector('.subj-code')?.textContent.toLowerCase() || '';
    c.style.display = (!q || code.includes(q)) ? 'flex' : 'none';
  });
  if (q) {
    const year1 = document.getElementById('year1');
    const sem   = document.getElementById('sem-y1-s2');
    const sub   = document.getElementById('subjects-y1-s2');
    if (year1 && !year1.classList.contains('open')) toggleYear('year1');
    if (sem && !sem.classList.contains('active') && sub) {
      sem.classList.add('active');
      sub.classList.add('open');
    }
  }
}
function clearSearch() {
  const input = document.getElementById('searchInput');
  if (input) { input.value = ''; filterSubjects(''); }
}

/* ── Nav menu ── */
function openMenu() {
  const overlay = document.getElementById('navOverlay');
  const btn     = document.getElementById('hamburgerBtn');
  overlay.classList.add('open');
  overlay.setAttribute('aria-hidden', 'false');
  btn.classList.add('open');
  btn.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
  playSound('menuOpen', 0.5);
}
function closeMenu() {
  const overlay = document.getElementById('navOverlay');
  const btn     = document.getElementById('hamburgerBtn');
  overlay.classList.remove('open');
  overlay.setAttribute('aria-hidden', 'true');
  btn.classList.remove('open');
  btn.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}
document.getElementById('navOverlay').addEventListener('click', function(e) {
  if (e.target === this) closeMenu();
});
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    closeMenu();
    closeSplash();
    closeViewerModal();
    closeNoFileModal();
  }
});

/* ── Music player ── */
let musicPlaying = false;
let musicAudio   = null;

function formatTime(secs) {
  if (!secs || isNaN(secs)) return '0:00';
  const m = Math.floor(secs / 60);
  const s = Math.floor(secs % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

function setMusicUI(playing) {
  const bar      = document.getElementById('musicBar');
  const playBtn  = document.getElementById('musicPlayBtn');
  const statusEl = document.getElementById('mbarStatus');
  const wave     = document.getElementById('mbarWave');
  if (bar)      bar.classList.toggle('playing', playing);
  if (playBtn)  { playBtn.textContent = playing ? '⏸' : '▶'; playBtn.classList.toggle('active', playing); playBtn.setAttribute('aria-label', playing ? 'Pause' : 'Play'); }
  if (statusEl) statusEl.textContent = playing ? 'PLAYING' : 'PAUSED';
  if (wave)     wave.classList.toggle('playing', playing);
}

function toggleMusic() {
  musicPlaying = !musicPlaying;
  setMusicUI(musicPlaying);
  if (!musicAudio) {
    musicAudio = new Audio('audio/CYBERPUNK 2077 SOUNDTRACK - I REALLY WANT TO STAY AT YOUR HOUSE.mp3');
    musicAudio.loop   = true;
    musicAudio.volume = 0.5;
    musicAudio.addEventListener('timeupdate', updateProgress);
    musicAudio.addEventListener('loadedmetadata', () => {
      const seekEl = document.getElementById('mbarSeek');
      if (seekEl) seekEl.max = musicAudio.duration;
      updateProgress();
    });
    musicAudio.addEventListener('ended', () => { musicPlaying = false; setMusicUI(false); });
  }
  musicPlaying ? musicAudio.play().catch(() => {}) : musicAudio.pause();
}

function updateProgress() {
  if (!musicAudio) return;
  const cur  = musicAudio.currentTime;
  const dur  = musicAudio.duration || 0;
  const pct  = dur ? (cur / dur) * 100 : 0;
  const fill   = document.getElementById('mbarProgress');
  const seek   = document.getElementById('mbarSeek');
  const timeEl = document.getElementById('mbarTime');
  if (fill)   fill.style.width = pct + '%';
  if (seek && !seek.matches(':active')) seek.value = cur;
  if (timeEl) timeEl.textContent = `${formatTime(cur)} / ${formatTime(dur)}`;
}

function seekMusic(val) {
  if (musicAudio && musicAudio.duration) {
    musicAudio.currentTime = parseFloat(val);
    updateProgress();
  }
}

/* ── Init ── */
window.addEventListener('load', () => {
  setTimeout(() => { setXP('year2'); }, 400);
});

/* ============================================================
   PAGE MODALS — Sign Up/Log In, About, FAQ, Contact
   ============================================================ */

function openPage(pageId) {
  closeMenu();
  const modal = document.getElementById('page-' + pageId);
  if (!modal) return;
  modal.classList.add('show');
  document.body.style.overflow = 'hidden';
}

function closePage(pageId) {
  const modal = document.getElementById('page-' + pageId);
  if (!modal) return;
  modal.classList.remove('show');
  document.body.style.overflow = '';
}

function handlePageClick(e, pageId) {
  if (e.target === document.getElementById('page-' + pageId)) closePage(pageId);
}

/* ── Auth tab switcher ── */
function switchAuthTab(tab) {
  const loginForm  = document.getElementById('form-login');
  const signupForm = document.getElementById('form-signup');
  const loginTab   = document.getElementById('tab-login');
  const signupTab  = document.getElementById('tab-signup');
  if (!loginForm || !signupForm) return;

  if (tab === 'login') {
    loginForm.classList.remove('hidden');
    signupForm.classList.add('hidden');
    loginTab.classList.add('active');
    signupTab.classList.remove('active');
  } else {
    signupForm.classList.remove('hidden');
    loginForm.classList.add('hidden');
    signupTab.classList.add('active');
    loginTab.classList.remove('active');
  }
}

/* ── FAQ accordion ── */
function toggleFaq(btn) {
  const item   = btn.closest('.faq-item');
  const answer = item.querySelector('.faq-answer');
  const chev   = btn.querySelector('.faq-chevron');
  const isOpen = item.classList.contains('open');

  /* Close all others first */
  document.querySelectorAll('.faq-item.open').forEach(openItem => {
    openItem.classList.remove('open');
    openItem.querySelector('.faq-answer').style.maxHeight = '0';
    const c = openItem.querySelector('.faq-chevron');
    if (c) c.style.transform = 'rotate(0deg)';
  });

  if (!isOpen) {
    item.classList.add('open');
    answer.style.maxHeight = answer.scrollHeight + 'px';
    if (chev) chev.style.transform = 'rotate(180deg)';
  }
}

/* Close page modals on Escape (add to existing keydown listener) */
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    ['auth','about','faq','contact'].forEach(p => closePage(p));
  }
});

/* ============================================================
   LOGIN GATE REMOVED - Direct access enabled
   ============================================================ */

function logOut() {
  closeSettings();
  alert("You are now logged out.");
}

/* ============================================================
   ACCOUNT SETTINGS & LANGUAGE LOGIC
   ============================================================ */
const PROFILE_STORAGE_KEY = 'richards_academy_user_profile';
const APP_SETTINGS_KEY = 'richards_academy_app_settings';

let currentAvatarBase64 = null;

function openSettings() {
  document.getElementById('settingsModal').classList.add('show');
  document.addEventListener('keydown', handleSettingsEsc);
  loadProfileData(); 
  loadAppSettings(); 
}

function closeSettings() {
  document.getElementById('settingsModal').classList.remove('show');
  document.removeEventListener('keydown', handleSettingsEsc);
}

function handleSettingsEsc(e) {
  if (e.key === 'Escape') closeSettings();
}

// Safely switch panes using the event parameter
function switchSettingsTab(event, tabId) {
  document.querySelectorAll('.settings-sidebar .settings-tab').forEach(btn => {
    btn.classList.remove('active');
  });
  
  if (event && event.currentTarget) {
    event.currentTarget.classList.add('active');
  }
  
  document.querySelectorAll('.settings-pane').forEach(pane => {
    pane.classList.remove('active');
  });
  
  const targetPane = document.getElementById('set-tab-' + tabId);
  if (targetPane) targetPane.classList.add('active');
}

// --- DATA LOADING ---
function loadProfileData() {
  const savedData = localStorage.getItem(PROFILE_STORAGE_KEY);
  const profile = savedData ? JSON.parse(savedData) : {
    displayName: '', pronouns: '', bio: '', accentColor: '#5865F2', avatar: null
  };

  document.getElementById('input-display-name').value = profile.displayName;
  document.getElementById('input-pronouns').value = profile.pronouns;
  document.getElementById('input-bio').value = profile.bio;
  document.getElementById('input-accent-color').value = profile.accentColor;
  currentAvatarBase64 = profile.avatar;

  updateDOMDisplays(profile);
  hideSaveBar();
}

// --- UPDATE UI EVERYWHERE ---
function updateDOMDisplays(data) {
  const safeName = data.displayName || 'User';
  const safePronouns = data.pronouns || '';
  const safeBio = data.bio || 'No bio provided.';
  const firstLetter = safeName.charAt(0).toUpperCase();

  // Update Preview Modal
  document.getElementById('preview-name').textContent = safeName;
  document.getElementById('preview-pronouns').textContent = safePronouns;
  document.getElementById('preview-bio-text').textContent = safeBio;
  document.getElementById('preview-banner').style.backgroundColor = data.accentColor;
  
  const previewImg = document.getElementById('preview-avatar');
  const previewFall = document.getElementById('preview-avatar-fallback');
  const globalImg = document.getElementById('global-avatar');
  const globalFall = document.getElementById('global-avatar-fallback');
  const globalBtn = document.querySelector('.top-profile-btn');

  // Handle Image logic for both Preview and Global Top-Right Button
  if (data.avatar) {
    // SHOW image, HIDE fallback circle
    previewImg.src = data.avatar; 
    previewImg.classList.remove('hidden'); 
    previewFall.style.display = 'none'; 
    
    globalImg.src = data.avatar; 
    globalImg.classList.remove('hidden'); 
    globalFall.style.display = 'none'; 
    
    if(globalBtn) globalBtn.style.background = 'transparent'; 
  } else {
    // HIDE image, SHOW fallback circle
    previewImg.classList.add('hidden'); 
    previewFall.style.display = 'flex'; 
    previewFall.textContent = firstLetter;
    
    globalImg.classList.add('hidden'); 
    globalFall.style.display = 'block'; 
    globalFall.textContent = firstLetter;
    
    if(globalBtn) globalBtn.style.background = '#808080'; 
  }
}

// --- LANGUAGE SETTINGS LOGIC ---

// Simple dictionary for live translation
const translations = {
  'en-US': { 
    profileTab: 'Profiles', appearanceTab: 'Appearance', languageTab: 'Language', 
    profileTitle: 'Profiles', appearanceTitle: 'Appearance', languageTitle: 'Language' 
  },
  'es-ES': { 
    profileTab: 'Perfiles', appearanceTab: 'Apariencia', languageTab: 'Idioma', 
    profileTitle: 'Perfiles', appearanceTitle: 'Apariencia', languageTitle: 'Idioma' 
  },
  'tl-PH': { 
    profileTab: 'Mga Profile', appearanceTab: 'Hitsura', languageTab: 'Wika', 
    profileTitle: 'Mga Profile', appearanceTitle: 'Hitsura', languageTitle: 'Wika' 
  },
  'ja-JP': { 
    profileTab: 'プロフィール', appearanceTab: '外観', languageTab: '言語', 
    profileTitle: 'プロフィール', appearanceTitle: '外観', languageTitle: '言語' 
  }
};

function loadAppSettings() {
  const savedSettings = localStorage.getItem(APP_SETTINGS_KEY);
  const settings = savedSettings ? JSON.parse(savedSettings) : { language: 'en-US' };
  
  const langSelect = document.getElementById('language-select');
  if(langSelect) {
    langSelect.value = settings.language;
  }
  applyLanguage(settings.language); // Apply on load
}

// Triggered when user selects a new language in the dropdown
function applyLanguage(newLang) {
  // Ignore English (UK) and others not in demo dictionary, default to US
  let langCode = newLang;
  if (!translations[langCode]) {
      langCode = 'en-US';
  }
  
  localStorage.setItem(APP_SETTINGS_KEY, JSON.stringify({ language: newLang }));
  
  const t = translations[langCode];

  // Update Sidebar Tabs
  const profileBtn = document.querySelector('.settings-tab[onclick*="profile"]');
  const appearanceBtn = document.querySelector('.settings-tab[onclick*="appearance"]');
  const languageBtn = document.querySelector('.settings-tab[onclick*="language"]');
  
  if(profileBtn) profileBtn.textContent = t.profileTab;
  if(appearanceBtn) appearanceBtn.textContent = t.appearanceTab;
  if(languageBtn) languageBtn.textContent = t.languageTab;

  // Update Pane Titles
  const profileTitle = document.querySelector('#set-tab-profile .settings-pane-title');
  const appearanceTitle = document.querySelector('#set-tab-appearance .settings-pane-title');
  const languageTitle = document.querySelector('#set-tab-language .settings-pane-title');

  if(profileTitle) profileTitle.textContent = t.profileTitle;
  if(appearanceTitle) appearanceTitle.textContent = t.appearanceTitle;
  if(languageTitle) languageTitle.textContent = t.languageTitle;

  const feedback = document.getElementById('language-feedback');
  if(feedback) {
    feedback.style.opacity = '1';
    setTimeout(() => { feedback.style.opacity = '0'; }, 2000);
  }
}

// --- LISTENERS & SAVE BAR ---
document.addEventListener('DOMContentLoaded', () => {
  loadProfileData(); 
  loadAppSettings(); 
  
  const inputs = ['input-display-name', 'input-pronouns', 'input-bio', 'input-accent-color'];
  inputs.forEach(id => {
    const el = document.getElementById(id);
    if(el) {
      el.addEventListener('input', () => {
        showSaveBar();
        updateDOMDisplays({
          displayName: document.getElementById('input-display-name').value,
          pronouns: document.getElementById('input-pronouns').value,
          bio: document.getElementById('input-bio').value,
          accentColor: document.getElementById('input-accent-color').value,
          avatar: currentAvatarBase64
        });
      });
    }
  });

  const avatarUpload = document.getElementById('avatar-upload');
  if(avatarUpload) {
    avatarUpload.addEventListener('change', function(e) {
      const file = e.target.files[0];
      if (file) {
        if (file.size > 30000000) { alert("Image is too large! Please choose an image under 30MB."); return; }
        const reader = new FileReader();
        reader.onload = function(event) {
          currentAvatarBase64 = event.target.result;
          showSaveBar();
          updateDOMDisplays({
            displayName: document.getElementById('input-display-name').value,
            pronouns: document.getElementById('input-pronouns').value,
            bio: document.getElementById('input-bio').value,
            accentColor: document.getElementById('input-accent-color').value,
            avatar: currentAvatarBase64
          });
        };
        reader.readAsDataURL(file);
      }
    });
  }

  // Remove Avatar Button
  const removeAvatarBtn = document.getElementById('remove-avatar-btn');
  if(removeAvatarBtn) {
    removeAvatarBtn.addEventListener('click', () => {
      currentAvatarBase64 = null;
      document.getElementById('avatar-upload').value = ""; 
      showSaveBar();
      updateDOMDisplays({
        displayName: document.getElementById('input-display-name').value,
        pronouns: document.getElementById('input-pronouns').value,
        bio: document.getElementById('input-bio').value,
        accentColor: document.getElementById('input-accent-color').value,
        avatar: null
      });
    });
  }

  const saveBtn = document.getElementById('save-profile-btn');
  if(saveBtn) saveBtn.addEventListener('click', saveProfileData);
});

function showSaveBar() { document.querySelector('.settings-save-bar').classList.add('show'); }
function hideSaveBar() { document.querySelector('.settings-save-bar').classList.remove('show'); }

function saveProfileData() {
  const newProfile = {
    displayName: document.getElementById('input-display-name').value.trim(),
    pronouns: document.getElementById('input-pronouns').value.trim(),
    bio: document.getElementById('input-bio').value.trim(),
    accentColor: document.getElementById('input-accent-color').value,
    avatar: currentAvatarBase64
  };

  try {
    localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(newProfile));
    
    const statusMsg = document.getElementById('save-status');
    statusMsg.textContent = "Changes saved successfully!";
    statusMsg.style.color = "#23a559"; 
    
    setTimeout(() => {
      hideSaveBar();
      statusMsg.textContent = "Careful — you have unsaved changes!";
      statusMsg.style.color = "#f2f3f5";
    }, 2000);
    
  } catch (e) {
    console.error("Storage error:", e);
    alert("Error saving profile. File size might be too large.");
  }
}

// Auth and Modal Management
const logOutBtn = document.querySelector('.user-settings-sidebar [data-tab="logout"]') || document.getElementById('logOutBtn');
const settingsModal = document.getElementById('settingsModal'); // Adjust selector to your actual ID
const authModal = document.getElementById('authModal');         // Adjust selector to your actual ID

function handleLogOut() {
    // 1. Clear session indicators
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUser');

    // 2. Hide the User Settings workspace
    if (settingsModal) settingsModal.classList.add('hidden');

    // 3. Force-display the Authentication screen (Screenshot (2884).jpg)
    if (authModal) {
        authModal.classList.remove('hidden');
    } else {
        alert("Logged out. Please refresh to log in again.");
    }
}

// Event listener for the Log Out sidebar tab
if (logOutBtn) {
    logOutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        handleLogOut();
    });
}