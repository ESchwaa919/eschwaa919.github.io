/* ============================================================
   Earth 2.0 Slide Engine - JavaScript
   AI Curious Ltd | Earth 2.0 AI Capability Programme
   ============================================================ */

(function () {
  'use strict';

  let currentSlide = 0;
  let slideElements = [];
  let totalSlides = 0;
  let notesVisible = false;
  let helpVisible = false;
  let scriptVisible = false;
  let touchStartX = 0;

  // Audio state
  let audioEnabled = false;
  let audioPlaying = false;
  let audioManifest = null;
  let audioElement = null;
  let audioPreloadElement = null;
  let autoAdvanceTimer = null;
  let instructorMode = false;

  // Course catalogue for inter-course navigation
  const COURSE_CATALOGUE = [
    { num: 1, title: 'AI Without Fear', file: 'course-01.html' },
    { num: 2, title: 'Your First 60 Minutes With AI', file: 'course-02.html' },
    { num: 3, title: 'AI Hygiene for Real People', file: 'course-03.html' },
    { num: 4, title: 'Reality Check: AI Errors & Hallucinations', file: 'course-04.html' },
    { num: 5, title: 'Prompting That Actually Works', file: 'course-05.html' },
    { num: 6, title: 'From Prompts to Playbooks', file: 'course-06.html' },
    { num: 7, title: 'Human-in-the-Loop Systems', file: 'course-07.html' },
    { num: 8, title: 'Workflow Discovery Sprint', file: 'course-08.html' },
    { num: 9, title: 'AI Risk Management', file: 'course-09.html' },
    { num: 10, title: 'Earth 2.0 Licensing Bootcamp', file: 'course-10.html' }
  ];

  // Section image mapping: keyed by "courseNum:label" for transition slides
  // Break/lunch slides use shared images; module slides use per-course section images
  const BREAK_KEYWORDS = ['break', '☕', 'lunch'];
  const BREAK_IMAGES = {
    'lunch': 'images/break-lunch.png',
    '45': 'images/break-lunch.png',
    'default': 'images/break-short.png',
    'long': 'images/break-long.png',
    '15': 'images/break-long.png',
  };

  // Section images per course: maps course number to ordered list of section image files
  // Ordered by appearance in the course (matches module/phase numbering)
  const SECTION_IMAGES = {
    '01': ['section-01-01.png','section-01-02.png','section-01-03.png','section-01-04.png','section-01-05.png'],
    '02': ['section-02-01.png','section-02-02.png','section-02-03.png'],
    '03': ['section-03-01.png','section-03-02.png','section-03-03.png'],
    '04': ['section-04-01.png','section-04-02.png','section-04-03.png','section-04-04.png'],
    '05': ['section-05-01.png','section-05-02.png','section-05-03.png','section-05-04.png','section-05-05.png'],
    '06': ['section-06-01.png','section-06-02.png','section-06-03.png','section-06-04.png','section-06-05.png'],
    '07': ['section-07-01.png','section-07-02.png','section-07-03.png','section-07-04.png'],
    '08': ['section-08-01.png','section-08-02.png','section-08-03.png','section-08-04.png','section-08-05.png','section-08-06.png','section-08-07.png'],
    '09': ['section-09-01.png','section-09-02.png','section-09-03.png','section-09-04.png'],
    '10': ['section-10-01.png','section-10-02.png','section-10-03.png','section-10-04.png','section-10-05.png','section-10-06.png','section-10-07.png'],
  };

  // --- DOM Generation ---

  function buildPresentation() {
    if (typeof SLIDES === 'undefined' || !Array.isArray(SLIDES)) {
      console.error('SLIDES data not found. Define a SLIDES array before loading slide-engine.js');
      return;
    }

    const pres = document.createElement('div');
    pres.className = 'presentation';

    SLIDES.forEach((data, i) => {
      const slide = createSlide(data, i);
      pres.appendChild(slide);
    });

    document.body.prepend(pres);
    slideElements = Array.from(pres.querySelectorAll('.slide'));
    totalSlides = slideElements.length;

    buildControls();
    buildNotesPanel();
    buildScriptPanel();
    buildHelpOverlay();
    buildBrandFooter();
    buildCourseNav();

    // Detect instructor mode
    instructorMode = new URLSearchParams(location.search).get('mode') === 'instructor';

    const hash = parseInt(location.hash.replace('#', ''), 10);
    currentSlide = (hash >= 1 && hash <= totalSlides) ? hash - 1 : 0;
    goToSlide(currentSlide);

    // Init audio (async, non-blocking)
    initAudio();
  }

  // Detect course number for image paths
  function getCourseNum() {
    if (typeof COURSE_INFO !== 'undefined' && COURSE_INFO.number) {
      return String(COURSE_INFO.number).padStart(2, '0');
    }
    const match = location.pathname.match(/course-(\d+)/);
    return match ? match[1] : null;
  }

  const courseNum = getCourseNum();

  // Track section image index per course (increments for each non-break transition)
  let sectionImageIndex = 0;

  function getTransitionImage(cNum, data, slideIndex) {
    const label = (data.label || '').toLowerCase();
    const title = (data.title || '').toLowerCase();
    const combined = label + ' ' + title;

    // Check if this is a break/lunch slide
    const isBreak = BREAK_KEYWORDS.some(k => combined.includes(k));
    if (isBreak) {
      if (combined.includes('lunch') || combined.includes('45')) return BREAK_IMAGES['lunch'];
      if (combined.includes('15')) return BREAK_IMAGES['long'];
      return BREAK_IMAGES['default'];
    }

    // Module/phase/section slide — use next section image in order
    const images = SECTION_IMAGES[cNum];
    if (images && sectionImageIndex < images.length) {
      return 'images/' + images[sectionImageIndex++];
    }

    return null;
  }

  function createSlide(data, index) {
    const section = document.createElement('section');
    section.className = 'slide';
    section.dataset.type = data.type || 'content';
    section.dataset.index = index;

    // Apply images based on slide type
    if (courseNum) {
      if (data.type === 'title') {
        section.dataset.hero = '1';
        section.style.backgroundImage = `url('images/hero-${courseNum}.png')`;
      } else if (data.type === 'transition') {
        const img = getTransitionImage(courseNum, data, index);
        if (img) {
          section.dataset.hero = '1';
          section.style.backgroundImage = `url('${img}')`;
        }
      } else {
        section.dataset.bgImg = '1';
        section.style.backgroundImage = `url('images/bg-${courseNum}.png')`;
      }
    }

    const inner = document.createElement('div');
    inner.className = 'slide-inner';

    switch (data.type) {
      case 'title':
        inner.innerHTML = buildTitle(data);
        break;
      case 'transition':
        inner.innerHTML = buildTransition(data);
        break;
      case 'quote':
        inner.innerHTML = buildQuote(data);
        break;
      case 'activity':
        inner.innerHTML = buildActivity(data);
        break;
      case 'checkpoint':
        inner.innerHTML = buildCheckpoint(data);
        break;
      case 'discussion':
        inner.innerHTML = buildDiscussion(data);
        break;
      default:
        inner.innerHTML = buildContent(data);
    }

    section.appendChild(inner);

    // Store notes
    if (data.notes) {
      section.dataset.notes = data.notes;
    }

    return section;
  }

  function buildTitle(d) {
    let html = '';
    if (d.title) html += `<h1 class="slide-title">${d.title}</h1>`;
    if (d.subtitle) html += `<p class="slide-subtitle">${d.subtitle}</p>`;
    if (d.content && d.content.length) {
      html += `<p class="slide-meta">${d.content.join(' &middot; ')}</p>`;
    }
    return html;
  }

  function buildContent(d) {
    let html = '';
    if (d.title) html += `<h2 class="slide-title">${d.title}</h2>`;
    html += '<div class="slide-body">';
    if (d.content && d.content.length) {
      html += '<ul>';
      d.content.forEach(item => { html += `<li>${item}</li>`; });
      html += '</ul>';
    }
    if (d.table) {
      html += buildTable(d.table);
    }
    html += '</div>';
    return html;
  }

  function buildDiscussion(d) {
    let html = '';
    if (d.title) html += `<h2 class="slide-title">${d.title}</h2>`;
    if (d.content && d.content.length) {
      html += '<div class="slide-body">';
      html += d.content.map(c => `<p>${c}</p>`).join('');
      html += '</div>';
    }
    return html;
  }

  function buildActivity(d) {
    let html = '<span class="slide-badge">Activity</span>';
    if (d.title) html += `<h2 class="slide-title">${d.title}</h2>`;
    html += '<div class="slide-body">';
    if (d.content && d.content.length) {
      html += '<ul>';
      d.content.forEach(item => { html += `<li>${item}</li>`; });
      html += '</ul>';
    }
    html += '</div>';
    return html;
  }

  function buildQuote(d) {
    let html = '';
    if (d.title) html += `<h2 class="slide-title">${d.title}</h2>`;
    if (d.attribution) html += `<p class="slide-attribution">${d.attribution}</p>`;
    return html;
  }

  function buildCheckpoint(d) {
    let html = '<span class="slide-badge">Knowledge Check</span>';
    if (d.title) html += `<h2 class="slide-title">${d.title}</h2>`;
    html += '<div class="slide-body">';
    if (d.content && d.content.length) {
      html += '<ul>';
      d.content.forEach(item => { html += `<li>${item}</li>`; });
      html += '</ul>';
    }
    html += '</div>';
    return html;
  }

  function buildTransition(d) {
    let html = '';
    if (d.label) html += `<p class="slide-label">${d.label}</p>`;
    if (d.title) html += `<h2 class="slide-title">${d.title}</h2>`;
    return html;
  }

  function buildTable(tableData) {
    if (!tableData || !tableData.headers || !tableData.rows) return '';
    let html = '<table><thead><tr>';
    tableData.headers.forEach(h => { html += `<th>${h}</th>`; });
    html += '</tr></thead><tbody>';
    tableData.rows.forEach(row => {
      html += '<tr>';
      row.forEach(cell => { html += `<td>${cell}</td>`; });
      html += '</tr>';
    });
    html += '</tbody></table>';
    return html;
  }

  // --- Controls ---

  function buildControls() {
    // Progress bar
    const progressContainer = document.createElement('div');
    progressContainer.className = 'progress-container';
    progressContainer.innerHTML = '<div class="progress-bar" id="progressBar"></div>';
    document.body.appendChild(progressContainer);

    // Slide counter
    const counter = document.createElement('div');
    counter.className = 'slide-counter';
    counter.id = 'slideCounter';
    document.body.appendChild(counter);

    // Nav arrows
    const prevArrow = document.createElement('div');
    prevArrow.className = 'nav-arrow nav-prev';
    prevArrow.innerHTML = '<svg viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"/></svg>';
    prevArrow.addEventListener('click', () => prevSlide(true));

    const nextArrow = document.createElement('div');
    nextArrow.className = 'nav-arrow nav-next';
    nextArrow.innerHTML = '<svg viewBox="0 0 24 24"><polyline points="9 6 15 12 9 18"/></svg>';
    nextArrow.addEventListener('click', () => nextSlide(true));

    document.body.appendChild(prevArrow);
    document.body.appendChild(nextArrow);
  }

  function buildNotesPanel() {
    const panel = document.createElement('div');
    panel.className = 'notes-panel';
    panel.id = 'notesPanel';
    panel.innerHTML = `
      <div class="notes-panel-header">
        <span class="notes-panel-title">Speaker Notes</span>
        <button class="notes-panel-close" onclick="document.getElementById('notesPanel').classList.remove('visible')">Press N to close</button>
      </div>
      <div class="notes-panel-content" id="notesContent"></div>
    `;
    document.body.appendChild(panel);
  }

  function buildHelpOverlay() {
    const overlay = document.createElement('div');
    overlay.className = 'help-overlay';
    overlay.id = 'helpOverlay';
    overlay.innerHTML = `
      <div class="help-card">
        <h2>Keyboard Shortcuts</h2>
        <div class="shortcut-row"><span class="shortcut-label">Next slide</span><span><kbd>&rarr;</kbd> <kbd>Space</kbd></span></div>
        <div class="shortcut-row"><span class="shortcut-label">Previous slide</span><span><kbd>&larr;</kbd></span></div>
        <div class="shortcut-row"><span class="shortcut-label">First slide</span><span><kbd>Home</kbd></span></div>
        <div class="shortcut-row"><span class="shortcut-label">Last slide</span><span><kbd>End</kbd></span></div>
        <div class="shortcut-row"><span class="shortcut-label">Speaker notes</span><span><kbd>N</kbd></span></div>
        <div class="shortcut-row"><span class="shortcut-label">Play / pause audio</span><span><kbd>P</kbd></span></div>
        <div class="shortcut-row"><span class="shortcut-label">Narration script</span><span><kbd>S</kbd></span></div>
        <div class="shortcut-row"><span class="shortcut-label">Fullscreen</span><span><kbd>F</kbd></span></div>
        <div class="shortcut-row"><span class="shortcut-label">This help</span><span><kbd>?</kbd></span></div>
        <div class="shortcut-row"><span class="shortcut-label">Course index</span><span><kbd>I</kbd></span></div>
        <div class="shortcut-row"><span class="shortcut-label">Close overlay</span><span><kbd>Esc</kbd></span></div>
      </div>
    `;
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) toggleHelp();
    });
    document.body.appendChild(overlay);
  }

  function buildBrandFooter() {
    const footer = document.createElement('div');
    footer.className = 'brand-footer';
    footer.innerHTML = `
      <svg class="brand-logo" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect x="8" y="18" width="84" height="74" rx="10" fill="none" stroke="#1BA8A0" stroke-width="5"/>
        <path d="M32 18V48Q32 56 40 56H60" fill="none" stroke="#1BA8A0" stroke-width="5"/>
        <circle cx="32" cy="10" r="9" fill="none" stroke="#1BA8A0" stroke-width="5"/>
        <circle cx="32" cy="10" r="3.5" fill="#1BA8A0"/>
        <circle cx="64" cy="50" r="7" fill="none" stroke="#1BA8A0" stroke-width="5"/>
        <circle cx="64" cy="50" r="2.5" fill="#1BA8A0"/>
        <path d="M64 57V78" fill="none" stroke="#1BA8A0" stroke-width="5"/>
      </svg>
      <span class="brand-text">Earth 2.0</span>
    `;
    document.body.appendChild(footer);
  }

  function buildCourseNav() {
    // Detect current course number from filename or COURSE_INFO
    let courseNum = 0;
    if (typeof COURSE_INFO !== 'undefined' && COURSE_INFO.number) {
      courseNum = COURSE_INFO.number;
    } else {
      const match = location.pathname.match(/course-(\d+)/);
      if (match) courseNum = parseInt(match[1], 10);
    }
    if (!courseNum) return;

    const current = COURSE_CATALOGUE.find(c => c.num === courseNum);
    const prev = COURSE_CATALOGUE.find(c => c.num === courseNum - 1);
    const next = COURSE_CATALOGUE.find(c => c.num === courseNum + 1);

    const nav = document.createElement('nav');
    nav.className = 'course-nav';
    nav.innerHTML = `
      <div class="course-nav-inner">
        <div class="course-nav-left">
          ${prev ? `<a href="${prev.file}" class="course-nav-link course-nav-prev" title="Course ${prev.num}: ${prev.title}">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
            <span class="course-nav-link-label">Course ${prev.num}</span>
          </a>` : '<span></span>'}
        </div>
        <a href="index.html" class="course-nav-index" title="All Courses">
          <span class="course-nav-current">Course ${courseNum}${current ? ': ' + current.title : ''}</span>
          <span class="course-nav-all">All Courses</span>
        </a>
        <div class="course-nav-right">
          ${next ? `<a href="${next.file}" class="course-nav-link course-nav-next" title="Course ${next.num}: ${next.title}">
            <span class="course-nav-link-label">Course ${next.num}</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 6 15 12 9 18"/></svg>
          </a>` : '<span></span>'}
        </div>
      </div>
    `;
    document.body.appendChild(nav);
  }

  // --- Script Panel (Instructor Mode) ---

  function buildScriptPanel() {
    const panel = document.createElement('div');
    panel.className = 'script-panel';
    panel.id = 'scriptPanel';
    panel.innerHTML = `
      <div class="script-panel-header">
        <span class="script-panel-title">Narration Script</span>
        <button class="script-panel-close" onclick="document.getElementById('scriptPanel').classList.remove('visible')">Press S to close</button>
      </div>
      <div class="script-panel-content" id="scriptContent"></div>
    `;
    document.body.appendChild(panel);
  }

  function updateScript() {
    const content = document.getElementById('scriptContent');
    if (!content || !audioManifest) return;
    const entry = audioManifest.slides[currentSlide];
    content.textContent = entry ? entry.narration : 'No narration script for this slide.';
  }

  function toggleScript() {
    if (!audioManifest) return;
    scriptVisible = !scriptVisible;
    const panel = document.getElementById('scriptPanel');
    if (panel) panel.classList.toggle('visible', scriptVisible);
  }

  // --- Audio Module ---

  async function initAudio() {
    const cNum = getCourseNum();
    if (!cNum) return;

    const manifestUrl = `audio/course-${cNum}/manifest.json`;
    try {
      const resp = await fetch(manifestUrl);
      if (!resp.ok) return; // No audio for this course — silently disable
      audioManifest = await resp.json();
    } catch {
      return; // Network error or missing file — graceful degradation
    }

    audioEnabled = true;
    audioElement = new Audio();
    audioPreloadElement = new Audio();

    audioElement.addEventListener('ended', onAudioEnded);

    buildAudioControls();
    updateScript();

    // In instructor mode, auto-show script panel
    if (instructorMode) {
      scriptVisible = true;
      const panel = document.getElementById('scriptPanel');
      if (panel) panel.classList.add('visible');
    }
  }

  function buildAudioControls() {
    const btn = document.createElement('button');
    btn.className = 'audio-btn';
    btn.id = 'audioBtn';
    btn.title = 'Play narration (P)';
    btn.innerHTML = `
      <svg class="audio-icon audio-icon-play" viewBox="0 0 24 24"><polygon points="6 3 20 12 6 21"/></svg>
      <svg class="audio-icon audio-icon-pause" viewBox="0 0 24 24"><rect x="5" y="3" width="4" height="18"/><rect x="15" y="3" width="4" height="18"/></svg>
    `;
    btn.addEventListener('click', toggleAudio);
    document.body.appendChild(btn);
  }

  function toggleAudio() {
    if (!audioEnabled) return;
    if (audioPlaying) {
      pauseAudio();
    } else {
      playCurrentSlide();
    }
  }

  function playCurrentSlide() {
    if (!audioEnabled || !audioManifest) return;

    const entry = audioManifest.slides[currentSlide];
    if (!entry || !entry.file) return;

    const cNum = getCourseNum();
    const src = `audio/course-${cNum}/${entry.file}`;

    audioElement.src = src;
    audioElement.play().catch(() => {});
    audioPlaying = true;
    updateAudioButton();
    preloadNext();
  }

  function preloadNext() {
    if (!audioManifest) return;
    const nextIdx = currentSlide + 1;
    if (nextIdx >= audioManifest.slides.length) return;
    const entry = audioManifest.slides[nextIdx];
    if (!entry || !entry.file) return;
    const cNum = getCourseNum();
    audioPreloadElement.src = `audio/course-${cNum}/${entry.file}`;
    audioPreloadElement.load();
  }

  function onAudioEnded() {
    const entry = audioManifest.slides[currentSlide];

    // Last slide — stop
    if (currentSlide >= totalSlides - 1) {
      pauseAudio();
      return;
    }

    // Pause-after slides (activity, checkpoint, discussion, break) — stop auto-advance
    if (entry && entry.pauseAfter) {
      pauseAudio();
      return;
    }

    // Auto-advance after brief pause
    autoAdvanceTimer = setTimeout(() => {
      goToSlide(currentSlide + 1);
      playCurrentSlide();
    }, 800);
  }

  function pauseAudio() {
    if (autoAdvanceTimer) {
      clearTimeout(autoAdvanceTimer);
      autoAdvanceTimer = null;
    }
    if (audioElement) {
      audioElement.pause();
      audioElement.currentTime = 0;
    }
    audioPlaying = false;
    updateAudioButton();
  }

  function updateAudioButton() {
    const btn = document.getElementById('audioBtn');
    if (btn) btn.classList.toggle('playing', audioPlaying);
  }

  // Called when user manually navigates while audio is playing
  function onManualNav() {
    if (!audioPlaying) return;
    if (autoAdvanceTimer) {
      clearTimeout(autoAdvanceTimer);
      autoAdvanceTimer = null;
    }
    if (audioElement) {
      audioElement.pause();
      audioElement.currentTime = 0;
    }
    // Play new slide's audio
    playCurrentSlide();
  }

  // --- Navigation ---

  function goToSlide(n) {
    if (n < 0 || n >= totalSlides) return;

    slideElements.forEach((el, i) => {
      el.classList.remove('active', 'prev');
      if (i < n) el.classList.add('prev');
    });

    slideElements[n].classList.add('active');
    currentSlide = n;
    location.hash = n + 1;
    updateProgress();
    updateNotes();
    updateScript();
  }

  function nextSlide(manual) {
    if (currentSlide < totalSlides - 1) {
      goToSlide(currentSlide + 1);
      if (manual && audioPlaying) onManualNav();
    }
  }

  function prevSlide(manual) {
    if (currentSlide > 0) {
      goToSlide(currentSlide - 1);
      if (manual && audioPlaying) onManualNav();
    }
  }

  function updateProgress() {
    const pct = totalSlides > 1 ? ((currentSlide) / (totalSlides - 1)) * 100 : 0;
    const bar = document.getElementById('progressBar');
    if (bar) bar.style.width = pct + '%';

    const counter = document.getElementById('slideCounter');
    if (counter) {
      counter.innerHTML = `<span class="current">${currentSlide + 1}</span> / ${totalSlides}`;
    }
  }

  function updateNotes() {
    const content = document.getElementById('notesContent');
    if (!content) return;
    const notes = slideElements[currentSlide]?.dataset.notes || 'No speaker notes for this slide.';
    content.textContent = notes;
  }

  // --- Toggles ---

  function toggleNotes() {
    notesVisible = !notesVisible;
    const panel = document.getElementById('notesPanel');
    if (panel) panel.classList.toggle('visible', notesVisible);
  }

  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  }

  function toggleHelp() {
    helpVisible = !helpVisible;
    const overlay = document.getElementById('helpOverlay');
    if (overlay) overlay.classList.toggle('visible', helpVisible);
  }

  // --- Event Listeners ---

  function setupEvents() {
    // Keyboard
    document.addEventListener('keydown', (e) => {
      if (helpVisible && e.key !== 'Escape' && e.key !== '?') return;

      switch (e.key) {
        case 'ArrowRight':
        case ' ':
          e.preventDefault();
          nextSlide(true);
          break;
        case 'ArrowLeft':
          e.preventDefault();
          prevSlide(true);
          break;
        case 'ArrowUp':
          e.preventDefault();
          prevSlide(true);
          break;
        case 'ArrowDown':
          e.preventDefault();
          nextSlide(true);
          break;
        case 'Home':
          e.preventDefault();
          goToSlide(0);
          break;
        case 'End':
          e.preventDefault();
          goToSlide(totalSlides - 1);
          break;
        case 'n':
        case 'N':
          toggleNotes();
          break;
        case 'p':
        case 'P':
          toggleAudio();
          break;
        case 's':
        case 'S':
          toggleScript();
          break;
        case 'f':
        case 'F':
          toggleFullscreen();
          break;
        case 'i':
        case 'I':
          window.location.href = 'index.html';
          break;
        case '?':
          toggleHelp();
          break;
        case 'Escape':
          if (helpVisible) toggleHelp();
          else if (notesVisible) toggleNotes();
          else if (scriptVisible) toggleScript();
          break;
      }
    });

    // Touch (swipe)
    document.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    document.addEventListener('touchend', (e) => {
      const diff = touchStartX - e.changedTouches[0].screenX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) nextSlide(true);
        else prevSlide(true);
      }
    }, { passive: true });

    // Hash change
    window.addEventListener('hashchange', () => {
      const hash = parseInt(location.hash.replace('#', ''), 10);
      if (hash >= 1 && hash <= totalSlides && hash - 1 !== currentSlide) {
        goToSlide(hash - 1);
      }
    });
  }

  // --- Init ---

  function init() {
    buildPresentation();
    setupEvents();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
