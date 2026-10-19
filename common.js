/* =========================================================
   ЯНДЕКС.МЕТРИКА
   ========================================================= */
(function(m,e,t,r,i,k,a){
    m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
    m[i].l=1*new Date();
    for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
    k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
})(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=113673626', 'ym');

ym(113673626, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:"dataLayer", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});


/* =========================================================
   ГЕНЕРАЦИЯ САЙДБАРА
   ========================================================= */
const NAV_ITEMS = [
  { href: 'index.html',        icon: '🏠', label: 'Главная' },
  { href: 'themes.html',       icon: '🗂', label: 'Все темы' },
  { href: 'notes.html',        icon: '📝', label: 'База знаний' },
  { href: 'files.html',        icon: '📁', label: 'Файлы' },
  { href: 'links.html',        icon: '🔖', label: 'Подборка' },
  { href: 'now.html',          icon: '🕐', label: 'Сейчас' },
  { href: 'about.html',        icon: '👤', label: 'Обо мне' },
];

const SHOP_ITEM = { href: 'tea-qi.html', icon: '🍵', label: 'Чайный магазин' };

const SOCIALS = [
  { href: 'https://t.me/ekallife',           label: 'Telegram',
    svg: '<path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>' },
  { href: 'https://instagram.com/_ea_life_', label: 'Instagram',
    svg: '<rect width="20" height="20" x="2" y="2" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>' },
  { href: 'https://ru.pinterest.com/ea_life/', label: 'Pinterest',
    svg: '<circle cx="12" cy="12" r="10"/><path d="M8.5 15c.5-2 1.5-5 1.5-5"/><path d="M10 10c0-1.7 1.3-3 3-3s3 1.3 3 3-1.3 3-3 3c-.8 0-1.5-.3-2-.8"/>' },
];

function buildSidebar() {
  const nav = document.getElementById('mainNav');
  const soc = document.getElementById('socialsNav');
  if (!nav) return;

  const current = location.pathname.split('/').pop() || 'index.html';

  let html = '<div class="nav-title">Разделы</div>';
  html += NAV_ITEMS.map(item =>
    `<a href="${item.href}"${item.href === current ? ' class="active"' : ''}>${item.icon} ${item.label}</a>`
  ).join('');

  html += '<div class="nav-title" style="margin-top:20px;">Проекты</div>';
  html += `<a href="${SHOP_ITEM.href}"${SHOP_ITEM.href === current ? ' class="active"' : ''} style="background:var(--sage-soft); color:var(--sage-dark); font-weight:600;">${SHOP_ITEM.icon} ${SHOP_ITEM.label}</a>`;

  nav.innerHTML = html;

  if (soc) {
    soc.innerHTML = SOCIALS.map(s =>
      `<a href="${s.href}" target="_blank" title="${s.label}">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${s.svg}</svg>
        ${s.label}
      </a>`
    ).join('');
  }
}

/* =========================================================
   ССЫЛКА НА МАГАЗИН В ПОДВАЛАХ ВСЕХ СТРАНИЦ
   ========================================================= */
function addShopToFooters() {
  document.querySelectorAll('.footer-links').forEach(footer => {
    if (footer.querySelector('a[href="tea-qi.html"]')) return;
    const link = document.createElement('a');
    link.href = 'tea-qi.html';
    link.textContent = '🍵 Tea Qi';
    footer.appendChild(link);
  });
}

/* =========================================================
   КЛИКАБЕЛЬНЫЙ БРЕНД
   ========================================================= */
function makeBrandClickable() {
  ['brand', 'brand-sub'].forEach(cls => {
    const el = document.querySelector('.' + cls);
    if (!el || el.tagName === 'A') return;
    const a = document.createElement('a');
    a.href = 'index.html';
    a.className = el.className;
    a.innerHTML = el.innerHTML;
    a.setAttribute('title', 'На главную');
    el.parentNode.replaceChild(a, el);
  });
}

/* =========================================================
   ГЕНЕРАЦИЯ ОВЕРЛЕЕВ
   ========================================================= */
function buildOverlays() {
  if (!document.getElementById('searchOverlay')) {
    const el = document.createElement('div');
    el.className = 'overlay';
    el.id = 'searchOverlay';
    el.innerHTML = `
      <div class="search-modal" onclick="event.stopPropagation()">
        <input type="text" id="searchInput" placeholder="Что ищем? Например: маркетинг, чай, Chery..." autocomplete="off">
        <div class="search-results" id="searchResults"><div class="search-empty">Начните вводить запрос...</div></div>
        <div class="search-hint">
          <span><kbd>↑</kbd> <kbd>↓</kbd> навигация</span>
          <span><kbd>Enter</kbd> открыть</span>
          <span><kbd>Esc</kbd> закрыть</span>
        </div>
      </div>`;
    document.body.appendChild(el);
  }

  if (document.querySelector('.tg-feed') && !document.getElementById('tgOverlay')) {
    const el = document.createElement('div');
    el.className = 'overlay';
    el.id = 'tgOverlay';
    el.innerHTML = `
      <div class="tg-modal" onclick="event.stopPropagation()">
        <div class="tg-modal-head">
          <div class="avatar">EA</div>
          <div class="info"><div class="name">EA life</div><div class="handle">@ekallife</div></div>
          <button class="close" id="closeTg">×</button>
        </div>
        <div class="tg-modal-body" id="tgModalBody"></div>
        <div class="tg-modal-foot">
          <a href="https://t.me/ekallife" target="_blank" class="btn btn-primary">Открыть в Telegram</a>
          <button class="btn btn-ghost" id="closeTg2">Закрыть</button>
        </div>
      </div>`;
    document.body.appendChild(el);
  }
}

/* =========================================================
   КНОПКА «НАВЕРХ»
   ========================================================= */
function buildScrollTop() {
  if (document.getElementById('scrollTop')) return;
  const btn = document.createElement('button');
  btn.id = 'scrollTop';
  btn.className = 'scroll-top';
  btn.innerHTML = '↑';
  btn.setAttribute('aria-label', 'Наверх');
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  document.body.appendChild(btn);
  const toggle = () => {
    if (window.scrollY > 400) btn.classList.add('visible');
    else btn.classList.remove('visible');
  };
  window.addEventListener('scroll', toggle, { passive: true });
  toggle();
}

/* =========================================================
   КНОПКИ «ПОДЕЛИТЬСЯ» — только для ссылок в подборке
   ========================================================= */
function copyToClipboard(text) {
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(text);
  }
  return new Promise((resolve, reject) => {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.left = '-9999px';
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand('copy');
      document.body.removeChild(ta);
      resolve();
    } catch (e) {
      document.body.removeChild(ta);
      reject(e);
    }
  });
}

function showToast(message) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove('show'), 2200);
}

function addShareButtons() {
  document.querySelectorAll('.link-item').forEach(item => {
    if (item.querySelector('.share-btn-inline')) return;
    const href = item.getAttribute('href');
    if (!href || href === '#') return;
    const btn = document.createElement('span');
    btn.className = 'share-btn-inline';
    btn.innerHTML = '🔗';
    btn.setAttribute('role', 'button');
    btn.setAttribute('tabindex', '0');
    btn.setAttribute('title', 'Скопировать ссылку');
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      copyToClipboard(href)
        .then(() => showToast('✓ Ссылка скопирована'))
        .catch(() => showToast('Не удалось скопировать'));
    });
    btn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        btn.click();
      }
    });
    item.appendChild(btn);
  });
}

function ready(fn) {
  if (document.readyState !== 'loading') fn();
  else document.addEventListener('DOMContentLoaded', fn);
}

/* =========================================================
   ТЁМНАЯ ТЕМА
   ========================================================= */
(function initTheme() {
  try {
    const saved = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', saved);
  } catch (e) {
    document.documentElement.setAttribute('data-theme', 'light');
  }
})();

ready(() => {
  const btn = document.getElementById('themeToggle');
  if (!btn) return;
  const update = () => {
    const cur = document.documentElement.getAttribute('data-theme');
    btn.innerHTML = cur === 'dark' ? '☀️ Светлая тема' : '🌙 Тёмная тема';
  };
  update();
  btn.addEventListener('click', () => {
    const cur = document.documentElement.getAttribute('data-theme');
    const next = cur === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch (e) {}
    update();
  });
});

/* =========================================================
   ДАННЫЕ ПОИСКА
   ========================================================= */
const searchData = [
  { type: 'Заметка', icon: '📝', title: 'Как я пришла в авто-маркетинг', url: 'note.html', meta: 'карьера · 5 мин' },
  { type: 'Заметка', icon: '📝', title: 'Разбор коллаборации с Chery', url: 'note.html', meta: 'кейс · 8 мин' },
  { type: 'Заметка', icon: '📝', title: 'Мой стек инструментов маркетолога', url: 'note.html', meta: 'инструменты · 4 мин' },
  { type: 'Заметка', icon: '📝', title: 'Как маркетинг спас Формулу-1', url: 'note-f1.html', meta: 'хоббис · 12 мин' },
  { type: 'Заметка', icon: '📝', title: 'Опыт чайной церемонии: с чего я начинала', url: 'note-tea.html', meta: 'хоббис · 8 мин' },

  { type: 'Ссылка', icon: '🔖', title: 'Сумки в виш-лист!', url: 'https://pisca.ru/', meta: 'pisca.ru · лайфстайл' },
  { type: 'Ссылка', icon: '🔖', title: 'Для тех, кто читает', url: 'https://bookerlyheart.com/', meta: 'bookerlyheart.com · хоббис' },
  { type: 'Ссылка', icon: '🔖', title: 'Как автобренды работают с инфлюенсерами', url: 'https://www.sostav.ru/publication/formaty-raboty-s-inflyuenserami-87531.html', meta: 'Sostav.ru · маркетинг' },

  { type: 'Файл', icon: '📊', title: 'Шаблон: Контент-план', url: 'files.html', meta: 'Google Sheets · таблица' },

  { type: 'Магазин', icon: '🍵', title: 'Tea Qi · Китайский чай', url: 'tea-qi.html', meta: '静心寻境 · найди состояние' },
  { type: 'Магазин', icon: '🍵', title: 'Шу пуэр 2015', url: 'tea-qi.html', meta: '1 800 ₽ · 100 г' },
  { type: 'Магазин', icon: '🍵', title: 'Лунцзин', url: 'tea-qi.html', meta: '2 400 ₽ · 50 г' },
  { type: 'Магазин', icon: '🍵', title: 'Тегуаньинь', url: 'tea-qi.html', meta: '1 600 ₽ · 100 г' },

  { type: 'Тема', icon: '🚗', title: 'Карьера и маркетинг', url: 'theme-career.html', meta: '12 заметок · 34 ссылки' },
  { type: 'Тема', icon: '🏙️', title: 'Лайфстайл и жизнь в Москве', url: 'theme-lifestyle.html', meta: '8 заметок · 21 ссылка' },
  { type: 'Тема', icon: '🧩', title: 'Хоббис', url: 'theme-hobby.html', meta: '15 заметок · 42 ссылки' },
  { type: 'Тема', icon: '💭', title: 'Её закулисье', url: 'theme-thoughts.html', meta: '6 заметок · 9 ссылок' },

  { type: 'Страница', icon: '🏠', title: 'Главная', url: 'index.html', meta: 'обзор сайта' },
  { type: 'Страница', icon: '🗂', title: 'Все темы', url: 'themes.html', meta: 'сетка направлений' },
  { type: 'Страница', icon: '📝', title: 'База знаний', url: 'notes.html', meta: 'все заметки' },
  { type: 'Страница', icon: '📁', title: 'Файлы и материалы', url: 'files.html', meta: 'шаблоны, гайды, таблицы' },
  { type: 'Страница', icon: '🔖', title: 'Подборка', url: 'links.html', meta: 'все ссылки' },
  { type: 'Страница', icon: '🕐', title: 'Сейчас', url: 'now.html', meta: 'чем живу прямо сейчас' },
  { type: 'Страница', icon: '👤', title: 'Обо мне', url: 'about.html', meta: 'био · контакты' },
];

/* =========================================================
   TG-ПОСТЫ
   ========================================================= */
function getTgPosts() {
  const arr = window.TG_POSTS_FEED || [];
  const obj = {};
  arr.forEach(p => { obj[p.id] = p; });
  return obj;
}

function renderTgFeed() {
  const feed = document.getElementById('tgFeed');
  if (!feed) return;
  const posts = window.TG_POSTS_FEED || [];
  if (!posts.length) {
    feed.innerHTML = `
      <div style="padding:24px; text-align:center; color:var(--muted); font-size:0.9rem;">
        Пока нет постов.<br>
        <span style="font-size:0.82rem;">Опубликуйте в канале и обновите через updater.html</span>
      </div>`;
    return;
  }
  feed.innerHTML = posts.slice(0, 5).map(p => {
    const shortText = p.text.length > 180 ? p.text.slice(0, 180) + '…' : p.text;
    return `
      <button class="tg-item" data-tg-id="${p.id}">
        <div class="tg-avatar">EA</div>
        <div class="tg-content">
          <div class="name">eka_life <span>· @ekallife</span></div>
          <p>${escapeHtml(shortText)}</p>
          <div class="time">${p.date} · читать на сайте →</div>
        </div>
      </button>`;
  }).join('');
  feed.querySelectorAll('.tg-item').forEach(el => {
    el.addEventListener('click', () => openTgPost(el.dataset.tgId));
  });
}

function openTgPost(id) {
  const posts = getTgPosts();
  const post = posts[id];
  const overlay = document.getElementById('tgOverlay');
  const body = document.getElementById('tgModalBody');
  if (!post || !overlay || !body) return;

  const imagesHtml = post.images && post.images.length
    ? `<div class="post-images ${post.images.length === 1 ? 'single' : ''}">
        ${post.images.map(t => `<div class="post-image">${escapeHtml(t)}</div>`).join('')}
       </div>`
    : '';
  const reactionsHtml = post.reactions && post.reactions.length
    ? `<div class="post-reactions">
        ${post.reactions.map(r => `<span class="reaction">${r.emoji} ${r.count}</span>`).join('')}
       </div>`
    : '';

  body.innerHTML = `
    <div class="post-text">${escapeHtml(post.text)}</div>
    ${imagesHtml}
    ${reactionsHtml}
    <div class="post-meta">
      <span>🕐 ${post.date}</span>
    </div>`;
  overlay.classList.add('open');
}

function closeTg() {
  const overlay = document.getElementById('tgOverlay');
  if (overlay) overlay.classList.remove('open');
}

/* =========================================================
   ПОИСК
   ========================================================= */
let searchOverlay, searchInput, searchResults, openSearchBtn;
let selectedIndex = -1;

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}
function highlight(text, q) {
  const safe = escapeHtml(text);
  if (!q) return safe;
  const re = new RegExp('(' + q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'gi');
  return safe.replace(re, '<mark>$1</mark>');
}

function renderResults(results) {
  selectedIndex = -1;
  if (!results.length) {
    const q = searchInput.value.trim();
    searchResults.innerHTML = q
      ? '<div class="search-empty">Ничего не нашлось. Попробуйте другой запрос 🤔</div>'
      : '<div class="search-empty">Начните вводить запрос...</div>';
    return;
  }
  const grouped = {};
  results.forEach(r => { (grouped[r.type] = grouped[r.type] || []).push(r); });
  let html = '';
  let idx = 0;
  Object.keys(grouped).forEach(type => {
    html += `<div class="search-group-label">${type}</div>`;
    grouped[type].forEach(item => {
      const q = searchInput.value.trim();
      html += `<a class="search-result" data-index="${idx}" data-tg-id="${item.tgId || ''}" href="${item.url}">
        <div class="sr-title">${item.icon} ${highlight(item.title, q)}</div>
        <div class="sr-meta">${highlight(item.meta, q)}</div>
      </a>`;
      idx++;
    });
  });
  searchResults.innerHTML = html;
  searchResults.querySelectorAll('.search-result').forEach(el => {
    el.addEventListener('click', (e) => {
      const tgId = el.dataset.tgId;
      if (tgId) {
        e.preventDefault();
        closeSearch();
        openTgPost(tgId);
      } else {
        closeSearch();
      }
    });
  });
}

function openSearch() {
  searchOverlay.classList.add('open');
  searchInput.value = '';
  renderResults([]);
  setTimeout(() => searchInput.focus(), 50);
}
function closeSearch() {
  searchOverlay.classList.remove('open');
  selectedIndex = -1;
}

function updateSelection(results) {
  results.forEach((r, i) => r.classList.toggle('selected', i === selectedIndex));
  if (results[selectedIndex]) results[selectedIndex].scrollIntoView({ block: 'nearest' });
}

/* =========================================================
   ИНИЦИАЛИЗАЦИЯ
   ========================================================= */
ready(() => {
  makeBrandClickable();
  buildSidebar();
  buildOverlays();
  buildScrollTop();

  searchOverlay = document.getElementById('searchOverlay');
  searchInput = document.getElementById('searchInput');
  searchResults = document.getElementById('searchResults');
  openSearchBtn = document.getElementById('openSearch');

  if (openSearchBtn) openSearchBtn.addEventListener('click', openSearch);
  if (searchOverlay) searchOverlay.addEventListener('click', closeSearch);

  if (searchInput) {
    searchInput.addEventListener('input', () => {
      const q = searchInput.value.trim().toLowerCase();
      if (!q) { renderResults([]); return; }
      const filtered = searchData.filter(item =>
        item.title.toLowerCase().includes(q) || item.meta.toLowerCase().includes(q)
      );
      renderResults(filtered);
    });
  }

  const close1 = document.getElementById('closeTg');
  const close2 = document.getElementById('closeTg2');
  const tgOverlay = document.getElementById('tgOverlay');
  if (close1) close1.addEventListener('click', closeTg);
  if (close2) close2.addEventListener('click', closeTg);
  if (tgOverlay) tgOverlay.addEventListener('click', closeTg);

  renderTgFeed();
  addShareButtons();
  addShopToFooters();

  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      openSearch();
      return;
    }
    if (e.key === 'Escape') {
      closeSearch();
      closeTg();
      return;
    }
    if (!searchOverlay || !searchOverlay.classList.contains('open')) return;
    const results = searchResults.querySelectorAll('.search-result');
    if (!results.length) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      selectedIndex = Math.min(selectedIndex + 1, results.length - 1);
      updateSelection(results);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      selectedIndex = Math.max(selectedIndex - 1, 0);
      updateSelection(results);
    } else if (e.key === 'Enter' && selectedIndex >= 0) {
      e.preventDefault();
      results[selectedIndex].click();
    }
  });

  const revealTargets = document.querySelectorAll(
    '.hero, section, .topic, .panel, .tg-feed, .graph, .note-content, .sub-card, .why-block, .theme-card, .about-section, .item, .file-card'
  );
  revealTargets.forEach((el, i) => {
    if (el.classList.contains('reveal')) return;
    el.classList.add('reveal');
    if (i % 3 === 1) el.classList.add('reveal-delay-1');
    if (i % 3 === 2) el.classList.add('reveal-delay-2');
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
  revealTargets.forEach(el => observer.observe(el));
});
