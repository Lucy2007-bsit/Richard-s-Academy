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
   VOICE / SOUND EFFECTS
   Drop your audio files into the audio/ folder.
   File names must match exactly what's listed below.
   ============================================================ */

const SOUNDS = {
  /* Year card clicks — Lucy voicelines */
  year1:       'audio/lucy-year1.mp3',   /* Lucy: "First Year"        */
  year2:       'audio/lucy-year2.mp3',   /* Lucy: "Second Year"       */
  year3:       'audio/lucy-year3.mp3',   /* Lucy: "Third Year"        */
  year4:       'audio/lucy-year4.mp3',   /* Lucy: "Fourth Year!"      */

  /* Semester click */
  semOpen:     'audio/sfx-sem-open.mp3', /* short UI blip when opening a semester */

  /* Subject card click */
  subjectClick:'audio/sfx-select.mp3',  /* quick select beep         */

  /* Max level splash */
  maxLevel:    'audio/lucy-maxlevel.mp3',/* Lucy: "Congrats, Kupal!"  */

  /* Nav menu open */
  menuOpen:    'audio/sfx-menu.mp3',    /* menu whoosh               */
};

/* Active voice clip — stop previous before playing new one */
let activeVoice = null;

function playSound(key, volume = 0.85) {
  const src = SOUNDS[key];
  if (!src) return;

  /* Stop any currently playing voice so lines don't overlap */
  if (activeVoice) {
    activeVoice.pause();
    activeVoice.currentTime = 0;
  }

  const clip = new Audio(src);
  clip.volume = volume;
  clip.play().catch(() => {
    /* Autoplay blocked or file missing — fail silently */
  });

  /* Track voice clips (year lines) so we can stop them */
  if (['year1','year2','year3','year4','maxLevel'].includes(key)) {
    activeVoice = clip;
  }
}

/* ── Year accordion ── */
function toggleYear(id) {
  const block  = document.getElementById(id);
  const isOpen = block.classList.contains('open');
  block.classList.toggle('open', !isOpen);
  const inner = block.querySelector('.year-inner');
  if (inner) inner.setAttribute('aria-expanded', String(!isOpen));

  if (!isOpen) {
    setXP(id);
    playSound(id);                          /* play Lucy voiceline for this year */
    if (id === 'year4') {
      setTimeout(showSplash, 300);
      setTimeout(() => playSound('maxLevel'), 600); /* play max level line after splash */
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

/* ── Semester toggle ── */
function toggleSem(semId, subjectsId) {
  const sem = document.getElementById(semId);
  const sub = document.getElementById(subjectsId);
  if (!sem || !sub) return;
  const isActive = sem.classList.contains('active');
  sem.classList.toggle('active', !isActive);
  sub.classList.toggle('open', !isActive);
  sem.setAttribute('aria-expanded', String(!isActive));
  if (!isActive) playSound('semOpen', 0.6);  /* soft blip on semester open */
}

/* ── Subject click ── */
function openSubject(code) {
  playSound('subjectClick', 0.7);            /* select beep on subject tap */
  document.querySelectorAll('.subject-card').forEach(c => {
    if (c.querySelector('.subj-code')?.textContent === code) {
      
    }
  });
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
  playSound('menuOpen', 0.5);              /* whoosh on menu open */
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
  if (e.key === 'Escape') { closeMenu(); closeSplash(); closeViewerModal(); closeNoFileModal(); }
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
  if (playBtn)  {
    playBtn.textContent = playing ? '⏸' : '▶';
    playBtn.classList.toggle('active', playing);
    playBtn.setAttribute('aria-label', playing ? 'Pause' : 'Play');
  }
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
    musicAudio.addEventListener('ended', () => {
      musicPlaying = false;
      setMusicUI(false);
    });
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
