const STORAGE_KEY = 'ParamCGWalaBotsData';
const AUTH_KEY = 'ParamCGWalaBotsAuth';
const USER_KEY = 'ParamCGWalaBotsUsers';

const defaultConfig = {
  site: {
    name: 'ParamCGWalaBots',
    tagline: 'Trading • Forex • AI Automation • Market Intelligence',
    email: 'paramcgwala@gmail.com',
    phone: '+91 9617422068',
    address: 'Housing Board, Bhilai, Chhattisgarh, India',
    social: {
      facebook: 'https://www.facebook.com/profile.php?id=61590147527192',
      instagram: 'https://www.instagram.com/paramcgwala023/',
      telegram: 'https://web.telegram.org/k/',
      youtube: 'https://www.youtube.com/shorts/gkRGRU7svdE',
      chatgpt: 'https://chatgpt.com/',
    },
  },
  homepage: {
    headline: 'Master Trading, AI Automation & Market Intelligence',
    subheadline: 'Professional trading education, intelligent automation systems, market intelligence, trading bots and advanced learning resources.',
    ctaPrimary: 'Explore Courses',
    ctaPrimaryUrl: 'courses.html',
    ctaSecondary: 'Trading Dashboard',
    ctaSecondaryUrl: 'admin.html',
  },
  courses: [
    { title: 'Beginner Trading', description: 'Foundational forex training for disciplined market participation.' },
    { title: 'Advanced Forex', description: 'Institutional strategy frameworks, macro context and trade structure.' },
    { title: 'Risk Management', description: 'Capital preservation, position sizing and drawdown control.' },
    { title: 'Trading Psychology', description: 'Bias reduction, decision routines and confidence for traders.' },
    { title: 'AI Automation', description: 'Integrate automation into workflows, alerts and trade execution.' },
    { title: 'Trading Bots', description: 'Design and manage algorithmic strategies with built-in risk management.' },
  ],
  resources: [
    { title: 'Forex Factory', url: 'https://www.forexfactory.com' },
    { title: 'TradingView', url: 'https://www.tradingview.com' },
    { title: 'Investing.com', url: 'https://www.investing.com' },
    { title: 'Myfxbook', url: 'https://www.myfxbook.com' },
    { title: 'DailyFX', url: 'https://www.dailyfx.com' },
    { title: 'FXStreet', url: 'https://www.fxstreet.com' },
    { title: 'Babypips', url: 'https://www.babypips.com' },
  ],
  features: [
    { title: 'Signal Execution', description: 'Automated order flow for forex, digital assets and multi-asset strategies with risk overlays.' },
    { title: 'Market Intelligence', description: 'Sentiment, liquidity, volatility and calendar signals delivered through a unified dashboard.' },
    { title: 'AI Automation', description: 'End-to-end workflow automation, bot orchestration, and lead generation for financial businesses.' },
    { title: 'Learning & Research', description: 'Structured education across forex, SMC, ICT and systematic trade design for professional traders.' },
  ],
  aiServices: [
    { title: 'WhatsApp Automation', description: 'Signal delivery and client communication through WhatsApp automation.' },
    { title: 'Lead Generation Automation', description: 'AI funnels that qualify prospects and grow your community.' },
    { title: 'Customer Support Bots', description: 'Automated support for onboarding and trader queries.' },
    { title: 'CRM Automation', description: 'Keep your trader data aligned with CRM workflows.' },
    { title: 'Workflow Automation', description: 'Connect signals, bots and reporting into one automation engine.' },
    { title: 'AI Chatbots', description: 'Conversational support for trade guidance and knowledge delivery.' },
    { title: 'Business Process Automation', description: 'Streamline documentation, reporting and client onboarding.' },
  ],
  bots: [
    { title: 'Forex Precision Bot', description: 'Captures structured forex moves with risk-aware entry and exit.' },
    { title: 'Crypto Momentum Bot', description: 'Executes momentum strategies for digital asset markets.' },
    { title: 'Scalping Execution Bot', description: 'Fast intraday execution with tight risk controls.' },
    { title: 'Swing Capture Bot', description: 'Manages multi-day trades with trend and volatility alignment.' },
    { title: 'Risk System Bot', description: 'Automated drawdown control and portfolio resilience.' },
    { title: 'Strategy Workflow Bot', description: 'Deploys modular strategies with execution and reporting.' },
  ],
  news: [
    { title: 'Market volatility remains elevated ahead of central bank updates', url: 'https://www.investing.com/news/' },
  ],
  media: [
    { title: 'Platform Overview PDF', url: 'https://paramcgwala.com/overview.pdf' },
  ],
  contentItems: [],
};

const defaultUsers = [
  { name: 'Administrator', email: 'paramcgwala@gmail.com', phone: '+91 9617422068', password: '1313Wahegueru#', role: 'admin' },
];

let editingContentId = null;

function getData() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultConfig));
    return defaultConfig;
  }
  try {
    const parsed = JSON.parse(saved);
    return migrateLegacyData(parsed);
  } catch (error) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultConfig));
    return defaultConfig;
  }
}

function saveData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function getUsers() {
  const saved = localStorage.getItem(USER_KEY);
  if (!saved) {
    localStorage.setItem(USER_KEY, JSON.stringify(defaultUsers));
    return defaultUsers;
  }
  try {
    return JSON.parse(saved);
  } catch (error) {
    localStorage.setItem(USER_KEY, JSON.stringify(defaultUsers));
    return defaultUsers;
  }
}

function saveUsers(users) {
  localStorage.setItem(USER_KEY, JSON.stringify(users));
}

function sanitize(value) {
  const element = document.createElement('div');
  element.textContent = value;
  return element.innerHTML;
}

function updateFooterContact() {
  const data = getData();
  const emailLinks = document.querySelectorAll('.footer-email');
  const phoneLinks = document.querySelectorAll('.footer-phone');
  const addressTexts = document.querySelectorAll('.footer-address');
  emailLinks.forEach((el) => { el.textContent = data.site.email; el.href = `mailto:${data.site.email}`; });
  phoneLinks.forEach((el) => { el.textContent = data.site.phone; el.href = `tel:${data.site.phone}`; });
  addressTexts.forEach((el) => { el.textContent = data.site.address; });

  const socialUpdate = [
    { selector: 'a[aria-label="Facebook"]', value: data.site.social.facebook },
    { selector: 'a[aria-label="Instagram"]', value: data.site.social.instagram },
    { selector: 'a[aria-label="Telegram"]', value: data.site.social.telegram },
    { selector: 'a[aria-label="WhatsApp"]', value: data.site.social.whatsapp },
    { selector: 'a[aria-label="YouTube"]', value: data.site.social.youtube },
    { selector: 'a[aria-label="ChatGPT"]', value: data.site.social.chatgpt },
  ];
  socialUpdate.forEach((item) => {
    document.querySelectorAll(item.selector).forEach((el) => {
      if (item.value) el.href = item.value;
    });
  });
}

function renderHome() {
  const data = getData();
  const headline = document.querySelector('#hero h1');
  const subheadline = document.querySelector('.hero-text');
  const primaryCta = document.querySelector('.hero-actions .button-primary');
  const secondaryCta = document.querySelector('.hero-actions .button-outline');
  if (headline) headline.textContent = data.homepage.headline;
  if (subheadline) subheadline.textContent = data.homepage.subheadline;
  if (primaryCta) {
    primaryCta.textContent = data.homepage.ctaPrimary;
    if (data.homepage.ctaPrimaryUrl) primaryCta.href = data.homepage.ctaPrimaryUrl;
  }
  if (secondaryCta) {
    secondaryCta.textContent = data.homepage.ctaSecondary;
    if (data.homepage.ctaSecondaryUrl) secondaryCta.href = data.homepage.ctaSecondaryUrl;
  }
  renderHomepageFeatures();
  updateFooterContact();
}

function renderCoursesPage() {
  const data = getData();
  const container = document.querySelector('.feature-grid');
  if (!container) return;
  const contentItems = getItemsByCategory(data, 'Course');
  if (contentItems.length) {
    container.innerHTML = contentItems.map((course) => `
      <article class="feature-card">
        <h3>${sanitize(course.title)}</h3>
        <p>${sanitize(course.description)}</p>
      </article>
    `).join('');
  } else {
    container.innerHTML = data.courses.map((course) => `
      <article class="feature-card">
        <h3>${sanitize(course.title)}</h3>
        <p>${sanitize(course.description)}</p>
      </article>
    `).join('');
  }
  updateFooterContact();
}

function renderTradingBotsPage() {
  const data = getData();
  const container = document.querySelector('.bot-grid');
  if (!container) return;
  const contentItems = getItemsByCategory(data, 'Trading Bot');
  if (contentItems.length) {
    container.innerHTML = contentItems.map((bot) => `
      <article class="bot-card">
        <h3>${sanitize(bot.title)}</h3>
        <p>${sanitize(bot.description)}</p>
      </article>
    `).join('');
  } else {
    container.innerHTML = data.bots.map((bot) => `
      <article class="bot-card">
        <h3>${sanitize(bot.title)}</h3>
        <p>${sanitize(bot.description)}</p>
      </article>
    `).join('');
  }
  updateFooterContact();
}

function renderAutomationPage() {
  const data = getData();
  const container = document.querySelector('.service-grid');
  if (!container) return;
  const contentItems = getItemsByCategory(data, 'AI Automation Resource');
  if (contentItems.length) {
    container.innerHTML = contentItems.map((item) => `
      <article class="service-card">
        <h3>${sanitize(item.title)}</h3>
        <p>${sanitize(item.description)}</p>
      </article>
    `).join('');
  } else {
    container.innerHTML = data.aiServices.map((item) => `
      <article class="service-card">
        <h3>${sanitize(item.title)}</h3>
        <p>${sanitize(item.description)}</p>
      </article>
    `).join('');
  }
  updateFooterContact();
}

function renderResourcesPage() {
  const data = getData();
  const container = document.querySelector('.resource-grid');
  if (!container) return;
  const contentItems = getItemsByCategory(data, 'Resource Link');
  if (contentItems.length) {
    container.innerHTML = contentItems.map((resource) => `
      <a class="resource-card" href="${sanitize(resource.externalLink || resource.pdfUrl || '#')}" target="_blank" rel="noopener noreferrer">
        <h3>${sanitize(resource.title)}</h3>
        <p>${sanitize(resource.description || 'Premium research and market intelligence resources.')}</p>
      </a>
    `).join('');
  } else {
    container.innerHTML = data.resources.map((resource) => `
      <a class="resource-card" href="${sanitize(resource.url)}" target="_blank" rel="noopener noreferrer">
        <h3>${sanitize(resource.title)}</h3>
        <p>${sanitize(resource.description || 'Premium research and market intelligence resources.')}</p>
      </a>
    `).join('');
  }
  updateFooterContact();
}

function renderIntelligencePage() {
  const data = getData();
  const container = document.querySelector('.feature-grid');
  if (!container) return;
  const contentItems = getContentItems(data).filter((item) => ['Article', 'News'].includes(item.category));
  if (contentItems.length) {
    container.innerHTML = contentItems.map((item) => `
      <article class="feature-card">
        <h3>${sanitize(item.title)}</h3>
        <p>${sanitize(item.description)}</p>
        ${item.externalLink ? `<a href="${sanitize(item.externalLink)}" target="_blank" rel="noopener noreferrer">Read more</a>` : ''}
      </article>
    `).join('');
  }
  updateFooterContact();
}

function renderContactPage() {
  updateFooterContact();
}

function showValidationMessage(input, message) {
  input.setCustomValidity(message);
  input.reportValidity();
  setTimeout(() => input.setCustomValidity(''), 3000);
}

function showToast(message, type = 'info') {
  const toast = document.createElement('div');
  toast.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    padding: 1rem 1.5rem;
    border-radius: 12px;
    background: ${type === 'success' ? 'rgba(111, 245, 173, 0.2)' : type === 'error' ? 'rgba(255, 130, 130, 0.2)' : 'rgba(100, 150, 255, 0.2)'};
    color: ${type === 'success' ? '#6ff5ad' : type === 'error' ? '#ff8282' : '#74a0ff'};
    border: 1px solid ${type === 'success' ? 'rgba(111, 245, 173, 0.4)' : type === 'error' ? 'rgba(255, 130, 130, 0.4)' : 'rgba(100, 150, 255, 0.4)'};
    font-weight: 600;
    z-index: 1000;
    max-width: 300px;
    word-wrap: break-word;
  `;
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3500);
}

function checkPasswordStrength(password) {
  let strength = 0;
  if (password.length >= 8) strength++;
  if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++;
  if (password.match(/[0-9]/)) strength++;
  if (password.match(/[!@#$%^&*]/)) strength++;
  return strength;
}

function confirmDelete(itemName = 'item') {
  return confirm(`Are you sure you want to delete "${itemName}"? This cannot be undone.`);
}

function handleContactSubmit(event) {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.checkValidity()) {
    const invalidEl = form.querySelector(':invalid');
    if (invalidEl) showValidationMessage(invalidEl, invalidEl.validationMessage);
    return;
  }
  showToast('✓ Your message has been received. We will reach out shortly.', 'success');
  form.reset();
}

function handleSignupSubmit(event) {
  event.preventDefault();
  const name = sanitize(document.getElementById('signup-name').value.trim());
  const email = sanitize(document.getElementById('signup-email').value.trim().toLowerCase());
  const phone = sanitize(document.getElementById('signup-phone').value.trim());
  const password = document.getElementById('signup-password').value;
  const confirm = document.getElementById('signup-confirm').value;
  if (!name || !email || !phone || !password || !confirm) return;
  const strength = checkPasswordStrength(password);
  if (strength < 2) {
    showValidationMessage(document.getElementById('signup-password'), 'Password must be at least 8 characters with mixed case and numbers.');
    return;
  }
  if (password !== confirm) {
    showValidationMessage(document.getElementById('signup-confirm'), 'Passwords must match.');
    return;
  }
  const users = getUsers();
  if (users.some((user) => user.email === email)) {
    showValidationMessage(document.getElementById('signup-email'), 'Email already registered.');
    return;
  }
  users.push({ name, email, phone, password, role: 'member' });
  saveUsers(users);
  showToast('✓ Account created successfully. Redirecting to login...', 'success');
  setTimeout(() => window.location.href = 'login.html', 1500);
}

function handleLoginSubmit(event) {
  event.preventDefault();
  const email = sanitize(document.getElementById('login-email').value.trim().toLowerCase());
  const password = document.getElementById('login-password').value;
  const users = getUsers();
  const user = users.find((item) => item.email === email && item.password === password);
  if (!user) {
    showValidationMessage(document.getElementById('login-password'), 'Invalid email or password.');
    return;
  }
  localStorage.setItem(AUTH_KEY, JSON.stringify({ authenticated: true, email: user.email, role: user.role }));
  showToast('✓ Login successful. Redirecting...', 'success');
  setTimeout(() => {
    if (user.role === 'admin') window.location.href = 'admin.html';
    else window.location.href = 'index.html';
  }, 1000);
}

function handleForgotSubmit(event) {
  event.preventDefault();
  const email = sanitize(document.getElementById('forgot-email').value.trim().toLowerCase());
  const users = getUsers();
  if (!users.some((user) => user.email === email)) {
    showValidationMessage(document.getElementById('forgot-email'), 'Email not registered.');
    return;
  }
  alert('Password reset instructions have been sent to your email.');
  window.location.href = 'login.html';
}

function initAuthForms() {
  const contactForm = document.getElementById('contact-form');
  const signupForm = document.getElementById('signup-form');
  const loginForm = document.getElementById('login-form');
  const forgotForm = document.getElementById('forgot-form');

  if (contactForm) contactForm.addEventListener('submit', handleContactSubmit);
  if (signupForm) signupForm.addEventListener('submit', handleSignupSubmit);
  if (loginForm) loginForm.addEventListener('submit', handleLoginSubmit);
  if (forgotForm) forgotForm.addEventListener('submit', handleForgotSubmit);
}

function requireAdmin() {
  const auth = JSON.parse(localStorage.getItem(AUTH_KEY) || 'null');
  if (!auth || !auth.authenticated || auth.role !== 'admin') {
    window.location.href = 'login.html';
    return false;
  }
  return true;
}

function logout() {
  localStorage.removeItem(AUTH_KEY);
  window.location.href = 'login.html';
}

function getAuth() {
  return JSON.parse(localStorage.getItem(AUTH_KEY) || 'null');
}

function updateNavAuthState() {
  document.querySelectorAll('.admin-link').forEach((link) => {
    link.classList.remove('hidden');
  });
}

function generateId() {
  return `content-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function migrateLegacyData(data) {
  if (!data.contentItems) data.contentItems = [];
  const existing = data.contentItems;

  const appendLegacy = (items, category) => {
    if (!Array.isArray(items) || items.length === 0) return false;
    items.forEach((item) => {
      existing.push({
        id: item.id || generateId(),
        category,
        title: item.title || item.name || '',
        description: item.description || '',
        imageUrl: item.imageUrl || '',
        pdfUrl: item.url || item.pdfUrl || '',
        externalLink: item.url || item.externalLink || '',
      });
    });
    return true;
  };

  let migrated = false;
  migrated = appendLegacy(data.courses, 'Course') || migrated;
  migrated = appendLegacy(data.resources, 'Resource Link') || migrated;
  migrated = appendLegacy(data.aiServices, 'AI Automation Resource') || migrated;
  migrated = appendLegacy(data.bots, 'Trading Bot') || migrated;
  migrated = appendLegacy(data.news, 'News') || migrated;
  migrated = appendLegacy(data.media, 'PDF') || migrated;

  if (migrated) {
    data.courses = [];
    data.resources = [];
    data.aiServices = [];
    data.bots = [];
    data.news = [];
    data.media = [];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }

  return data;
}

function getContentItems(data) {
  return Array.isArray(data.contentItems) ? data.contentItems : [];
}

function getItemsByCategory(data, category) {
  return getContentItems(data).filter((item) => item.category === category);
}

function renderHomepageFeatures() {
  const data = getData();
  const container = document.querySelector('#services .service-grid');
  if (!container) return;
  const featureItems = getItemsByCategory(data, 'Feature');
  if (!featureItems.length) return;
  container.innerHTML = featureItems.map((item) => `
      <article class="service-card">
        <h3>${sanitize(item.title)}</h3>
        <p>${sanitize(item.description)}</p>
      </article>
    `).join('');
}

function renderAdminList(containerId, items, renderRow) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = items.length > 0 ? items.map(renderRow).join('') : '<tr><td colspan="3">No items yet.</td></tr>';
}

function toggleManageContentActions() {
  const actions = document.getElementById('admin-category-actions');
  if (!actions) return;
  actions.classList.toggle('hidden');
}

function scrollToAdminSection(targetSelector) {
  const target = document.querySelector(targetSelector);
  if (!target) return;
  target.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function resetContentToDefaults() {
  if (!confirm('Reset ALL content to defaults? This will remove all your changes and cannot be undone.')) return;
  localStorage.removeItem(STORAGE_KEY);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultConfig));
  renderAdminDashboard();
  showToast('✓ Content reset to defaults.', 'success');
}

function clearAllContent() {
  if (!confirm('Delete ALL managed content? This cannot be undone.')) return;
  const data = getData();
  saveData({ ...data, contentItems: [] });
  renderAdminDashboard();
  showToast('✓ All content cleared.', 'success');
}

function openContentModal(category = '', itemId = null) {
  const modal = document.getElementById('content-modal');
  const titleElement = document.getElementById('content-modal-title');
  const categoryInput = document.getElementById('content-category');
  const item = itemId ? getContentItems(getData()).find((entry) => entry.id === itemId) : null;
  editingContentId = itemId;

  titleElement.textContent = item ? 'Edit Content' : 'Add New Content';
  document.getElementById('content-title').value = item ? item.title : '';
  document.getElementById('content-description').value = item ? item.description : '';
  categoryInput.value = category || (item ? item.category : '');
  document.getElementById('content-image').value = item ? item.imageUrl : '';
  document.getElementById('content-pdf').value = item ? item.pdfUrl : '';
  document.getElementById('content-link').value = item ? item.externalLink : '';
  modal.classList.remove('hidden');
  modal.setAttribute('aria-hidden', 'false');
}

function closeContentModal() {
  const modal = document.getElementById('content-modal');
  if (!modal) return;
  modal.classList.add('hidden');
  modal.setAttribute('aria-hidden', 'true');
  editingContentId = null;
  document.getElementById('content-form')?.reset();
}

function renderContentItemList() {
  const data = getData();
  const items = getContentItems(data);
  const container = document.getElementById('content-item-list');
  if (!container) return;
  if (items.length === 0) {
    container.innerHTML = '<tr><td colspan="4">No content published yet. Use Add New Content to start.</td></tr>';
    return;
  }
  container.innerHTML = items.map((item) => {
    const mediaLinks = [];
    if (item.pdfUrl) {
      mediaLinks.push(`<a href="${sanitize(item.pdfUrl)}" target="_blank" rel="noopener noreferrer">PDF</a>`);
    }
    if (item.externalLink) {
      mediaLinks.push(`<a href="${sanitize(item.externalLink)}" target="_blank" rel="noopener noreferrer">Link</a>`);
    }
    if (item.imageUrl) {
      mediaLinks.push(`<a href="${sanitize(item.imageUrl)}" target="_blank" rel="noopener noreferrer">Image</a>`);
    }
    return `
      <tr>
        <td>${sanitize(item.title)}</td>
        <td>${sanitize(item.category)}</td>
        <td>${mediaLinks.length ? mediaLinks.join(' | ') : '-'}</td>
        <td>
          <button class="button button-soft" data-action="edit-content" data-id="${item.id}">Edit</button>
          <button class="button button-soft" data-action="delete-content" data-id="${item.id}">Delete</button>
        </td>
      </tr>
    `;
  }).join('');
}

function saveContentForm(event) {
  event.preventDefault();
  const title = sanitize(document.getElementById('content-title').value.trim());
  const description = sanitize(document.getElementById('content-description').value.trim());
  const category = document.getElementById('content-category').value;
  const imageUrl = document.getElementById('content-image').value.trim();
  const pdfUrl = document.getElementById('content-pdf').value.trim();
  const externalLink = document.getElementById('content-link').value.trim();

  if (!title || !category) {
    showValidationMessage(document.getElementById('content-title'), 'Title and category are required.');
    return;
  }

  const data = getData();
  const items = getContentItems(data);
  const newItem = {
    id: editingContentId || generateId(),
    title,
    description,
    category,
    imageUrl,
    pdfUrl,
    externalLink,
  };

  const updatedItems = editingContentId
    ? items.map((item) => (item.id === editingContentId ? newItem : item))
    : [...items, newItem];

  saveData({ ...data, contentItems: updatedItems });
  renderAdminDashboard();
  closeContentModal();
  showToast(`✓ Content "${title}" saved successfully.`, 'success');
}

function handleContentActions(event) {
  const button = event.target.closest('button');
  if (!button) return;
  const action = button.dataset.action;
  const itemId = button.dataset.id;
  if (!action || !itemId) return;

  const data = getData();
  const items = getContentItems(data);
  const item = items.find(i => i.id === itemId);

  if (action === 'edit-content') {
    openContentModal('', itemId);
    return;
  }

  if (action === 'delete-content') {
    if (!confirmDelete(item?.title || 'this item')) return;
    const updatedItems = items.filter((item) => item.id !== itemId);
    saveData({ ...data, contentItems: updatedItems });
    renderAdminDashboard();
    showToast('✓ Content deleted successfully.', 'success');
    return;
  }
}

function renderAdminDashboard() {
  const data = getData();
  const contentItems = getContentItems(data);
  renderContentItemList();

  renderAdminList('course-list', getItemsByCategory(data, 'Course'), (item) => `
    <tr>
      <td>${sanitize(item.title)}</td>
      <td>${sanitize(item.description)}</td>
      <td><button class="button button-soft" data-action="edit-content" data-id="${item.id}">Edit</button> <button class="button button-soft" data-action="delete-content" data-id="${item.id}">Delete</button></td>
    </tr>
  `);

  renderAdminList('resource-list', getItemsByCategory(data, 'Resource Link'), (item) => `
    <tr>
      <td>${sanitize(item.title)}</td>
      <td><a href="${sanitize(item.externalLink || item.pdfUrl || '#')}" target="_blank" rel="noopener noreferrer">Link</a></td>
      <td><button class="button button-soft" data-action="edit-content" data-id="${item.id}">Edit</button> <button class="button button-soft" data-action="delete-content" data-id="${item.id}">Delete</button></td>
    </tr>
  `);

  renderAdminList('feature-list', getItemsByCategory(data, 'Feature'), (item) => `
    <tr>
      <td>${sanitize(item.title)}</td>
      <td>${sanitize(item.description)}</td>
      <td><button class="button button-soft" data-action="edit-content" data-id="${item.id}">Edit</button> <button class="button button-soft" data-action="delete-content" data-id="${item.id}">Delete</button></td>
    </tr>
  `);

  renderAdminList('ai-service-list', getItemsByCategory(data, 'AI Automation Resource'), (item) => `
    <tr>
      <td>${sanitize(item.title)}</td>
      <td>${sanitize(item.description)}</td>
      <td><button class="button button-soft" data-action="edit-content" data-id="${item.id}">Edit</button> <button class="button button-soft" data-action="delete-content" data-id="${item.id}">Delete</button></td>
    </tr>
  `);

  renderAdminList('bot-list', getItemsByCategory(data, 'Trading Bot'), (item) => `
    <tr>
      <td>${sanitize(item.title)}</td>
      <td>${sanitize(item.description)}</td>
      <td><button class="button button-soft" data-action="edit-content" data-id="${item.id}">Edit</button> <button class="button button-soft" data-action="delete-content" data-id="${item.id}">Delete</button></td>
    </tr>
  `);

  renderAdminList('news-list', getItemsByCategory(data, 'News'), (item) => `
    <tr>
      <td>${sanitize(item.title)}</td>
      <td><a href="${sanitize(item.externalLink || item.pdfUrl || '#')}" target="_blank" rel="noopener noreferrer">Link</a></td>
      <td><button class="button button-soft" data-action="edit-content" data-id="${item.id}">Edit</button> <button class="button button-soft" data-action="delete-content" data-id="${item.id}">Delete</button></td>
    </tr>
  `);

  renderAdminList('blog-list', getItemsByCategory(data, 'Blog'), (item) => `
    <tr>
      <td>${sanitize(item.title)}</td>
      <td>${sanitize(item.description)}</td>
      <td><button class="button button-soft" data-action="edit-content" data-id="${item.id}">Edit</button> <button class="button button-soft" data-action="delete-content" data-id="${item.id}">Delete</button></td>
    </tr>
  `);

  renderAdminList('media-list', getItemsByCategory(data, 'PDF'), (item) => `
    <tr>
      <td>${sanitize(item.title)}</td>
      <td><a href="${sanitize(item.pdfUrl || item.externalLink || '#')}" target="_blank" rel="noopener noreferrer">PDF</a></td>
      <td><button class="button button-soft" data-action="edit-content" data-id="${item.id}">Edit</button> <button class="button button-soft" data-action="delete-content" data-id="${item.id}">Delete</button></td>
    </tr>
  `);

  const headline = document.getElementById('homepage-headline');
  const subheadline = document.getElementById('homepage-subheadline');
  const ctaPrimary = document.getElementById('homepage-cta-primary');
  const ctaSecondary = document.getElementById('homepage-cta-secondary');
  const footerEmail = document.getElementById('footer-email');
  const footerPhone = document.getElementById('footer-phone');
  const footerAddress = document.getElementById('footer-address');
  const welcomeMessage = document.getElementById('admin-welcome');

  if (welcomeMessage) {
    const auth = getAuth();
    if (auth?.authenticated) {
      welcomeMessage.textContent = `Signed in as ${auth.email}. Manage your platform content below.`;
    } else {
      welcomeMessage.textContent = 'Welcome to the admin workspace.';
    }
  }

  if (headline) headline.value = data.homepage.headline;
  if (subheadline) subheadline.value = data.homepage.subheadline;
  if (ctaPrimary) ctaPrimary.value = data.homepage.ctaPrimary;
  if (ctaSecondary) ctaSecondary.value = data.homepage.ctaSecondary;
  if (footerEmail) footerEmail.value = data.site.email;
  if (footerPhone) footerPhone.value = data.site.phone;
  if (footerAddress) footerAddress.value = data.site.address;
  const socialFacebook = document.getElementById('social-facebook');
  const socialInstagram = document.getElementById('social-instagram');
  const socialTelegram = document.getElementById('social-telegram');
  const socialWhatsApp = document.getElementById('social-whatsapp');
  const socialYouTube = document.getElementById('social-youtube');
  const socialChatGPT = document.getElementById('social-chatgpt');
  if (socialFacebook) socialFacebook.value = data.site.social.facebook || '';
  if (socialInstagram) socialInstagram.value = data.site.social.instagram || '';
  if (socialTelegram) socialTelegram.value = data.site.social.telegram || '';
  if (socialWhatsApp) socialWhatsApp.value = data.site.social.whatsapp || '';
  if (socialYouTube) socialYouTube.value = data.site.social.youtube || '';
  if (socialChatGPT) socialChatGPT.value = data.site.social.chatgpt || '';

  document.getElementById('metric-members').textContent = `${getUsers().length}`;
  document.getElementById('metric-bots').textContent = `${getItemsByCategory(data, 'Trading Bot').length}`;
  document.getElementById('metric-news').textContent = `${getItemsByCategory(data, 'News').length}`;
}

function saveHomepageSettings() {
  const data = getData();
  const headline = document.getElementById('homepage-headline').value.trim();
  const subheadline = document.getElementById('homepage-subheadline').value.trim();
  const ctaPrimary = document.getElementById('homepage-cta-primary').value.trim();
  const ctaSecondary = document.getElementById('homepage-cta-secondary').value.trim();
  const footerEmail = document.getElementById('footer-email').value.trim();
  const footerPhone = document.getElementById('footer-phone').value.trim();
  const footerAddress = document.getElementById('footer-address').value.trim();
  const socialFacebook = document.getElementById('social-facebook')?.value.trim() ?? data.site.social.facebook;
  const socialInstagram = document.getElementById('social-instagram')?.value.trim() ?? data.site.social.instagram;
  const socialTelegram = document.getElementById('social-telegram')?.value.trim() ?? data.site.social.telegram;
  const socialWhatsApp = document.getElementById('social-whatsapp')?.value.trim() ?? data.site.social.whatsapp;
  const socialYouTube = document.getElementById('social-youtube')?.value.trim() ?? data.site.social.youtube;
  const socialChatGPT = document.getElementById('social-chatgpt')?.value.trim() ?? data.site.social.chatgpt;
  saveData({
    ...data,
    homepage: { ...data.homepage, headline, subheadline, ctaPrimary, ctaSecondary },
    site: {
      ...data.site,
      email: footerEmail,
      phone: footerPhone,
      address: footerAddress,
      social: {
        ...data.site.social,
        facebook: socialFacebook,
        instagram: socialInstagram,
        telegram: socialTelegram,
        whatsapp: socialWhatsApp,
        youtube: socialYouTube,
        chatgpt: socialChatGPT,
      },
    },
  });
  showToast('✓ Homepage settings saved successfully.', 'success');
}

function initAdminPage() {
  const logoutButton = document.getElementById('logout-button');
  if (logoutButton) logoutButton.addEventListener('click', logout);
  renderAdminDashboard();
  document.getElementById('open-content-modal')?.addEventListener('click', () => openContentModal());
  document.getElementById('close-content-modal')?.addEventListener('click', closeContentModal);
  document.getElementById('cancel-content')?.addEventListener('click', closeContentModal);
  document.getElementById('content-form')?.addEventListener('submit', saveContentForm);
  document.getElementById('add-course-button')?.addEventListener('click', () => openContentModal('Course'));
  document.getElementById('add-feature-button')?.addEventListener('click', () => openContentModal('Feature'));
  document.getElementById('add-resource-button')?.addEventListener('click', () => openContentModal('Resource Link'));
  document.getElementById('add-ai-service-button')?.addEventListener('click', () => openContentModal('AI Automation Resource'));
  document.getElementById('add-bot-button')?.addEventListener('click', () => openContentModal('Trading Bot'));
  document.getElementById('add-news-button')?.addEventListener('click', () => openContentModal('News'));
  document.getElementById('add-media-button')?.addEventListener('click', () => openContentModal('PDF'));
  document.getElementById('add-blog-button')?.addEventListener('click', () => openContentModal('Blog'));
  document.getElementById('manage-content-button')?.addEventListener('click', toggleManageContentActions);
  document.getElementById('reset-content')?.addEventListener('click', resetContentToDefaults);
  document.getElementById('clear-content')?.addEventListener('click', clearAllContent);
  document.querySelectorAll('#admin-category-actions button').forEach((button) => {
    button.addEventListener('click', () => scrollToAdminSection(button.dataset.target));
  });
  document.getElementById('save-homepage')?.addEventListener('click', saveHomepageSettings);
  document.querySelector('main')?.addEventListener('click', handleContentActions);
}

function handlePasswordToggles() {
  const toggleButtons = document.querySelectorAll('.toggle-password');
  toggleButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      const target = event.currentTarget.dataset.target;
      const input = document.getElementById(target);
      if (!input) return;
      const isPassword = input.type === 'password';
      input.type = isPassword ? 'text' : 'password';
      event.currentTarget.textContent = isPassword ? 'Hide' : 'Show';
    });
  });
}

function initCalculators() {
  const calculatorMap = [
    { buttonId: 'rr-calc', callback: () => {
      const entry = parseFloat(document.getElementById('rr-entry')?.value);
      const target = parseFloat(document.getElementById('rr-target')?.value);
      const stop = parseFloat(document.getElementById('rr-stop')?.value);
      if (!entry || !target || !stop || entry === stop) {
        document.getElementById('rr-result').textContent = 'Enter valid entry, target and stop values.';
        return;
      }
      const ratio = (Math.abs(target - entry) / Math.abs(entry - stop)).toFixed(2);
      document.getElementById('rr-result').textContent = `Risk/reward ratio: ${ratio} to 1`;
    } },
    { buttonId: 'ps-calc', callback: () => {
      const account = parseFloat(document.getElementById('ps-account')?.value);
      const risk = parseFloat(document.getElementById('ps-risk')?.value);
      const pips = parseFloat(document.getElementById('ps-pips')?.value);
      if (!account || !risk || !pips) {
        document.getElementById('ps-result').textContent = 'Enter account size, risk percent, and stop loss pips.';
        return;
      }
      const size = ((account * risk) / 100 / pips).toFixed(2);
      document.getElementById('ps-result').textContent = `Position size: ${size} units per pip.`;
    } },
    { buttonId: 'pip-calc', callback: () => {
      const value = parseFloat(document.getElementById('pip-value')?.value);
      const move = parseFloat(document.getElementById('pip-move')?.value);
      if (!value || !move) {
        document.getElementById('pip-result').textContent = 'Enter pip value and movement amount.';
        return;
      }
      document.getElementById('pip-result').textContent = `Trade impact: ${(value * move).toFixed(2)} currency units.`;
    } },
    { buttonId: 'lot-calc', callback: () => {
      const risk = parseFloat(document.getElementById('lot-risk')?.value);
      const pip = parseFloat(document.getElementById('lot-pip')?.value);
      if (!risk || !pip) {
        document.getElementById('lot-result').textContent = 'Enter risk amount and value per pip.';
        return;
      }
      document.getElementById('lot-result').textContent = `Recommended lot size: ${(risk / pip).toFixed(2)}`;
    } },
  ];
  calculatorMap.forEach(({ buttonId, callback }) => {
    document.getElementById(buttonId)?.addEventListener('click', callback);
  });
}
function initHamburgerMenu() {
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');
  if (!hamburger || !navMenu) return;
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', !isExpanded);
    document.querySelector('.topbar')?.classList.toggle('mobile-nav-open');
  });
  navMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    document.querySelector('.topbar')?.classList.remove('mobile-nav-open');
  }));
}

function initThemeToggle() {
  const toggleBtn = document.getElementById('theme-toggle');
  if (!toggleBtn) return;
  const savedTheme = localStorage.getItem('theme-mode') || 'dark';
  document.body.className = savedTheme === 'light' ? 'light-mode' : '';
  toggleBtn.textContent = savedTheme === 'light' ? '🌙' : '☀️';
  toggleBtn.addEventListener('click', () => {
    const isDark = document.body.classList.contains('light-mode');
    document.body.classList.toggle('light-mode');
    localStorage.setItem('theme-mode', isDark ? 'dark' : 'light');
    toggleBtn.textContent = isDark ? '☀️' : '🌙';
  });
}

function initAdminSearch() {
  const searchInput = document.getElementById('admin-search-input');
  const searchBtn = document.getElementById('admin-search-button');
  if (!searchInput || !searchBtn) return;
  searchBtn.addEventListener('click', () => performAdminSearch());
  searchInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') performAdminSearch(); });
}

function performAdminSearch() {
  const query = document.getElementById('admin-search-input')?.value.toLowerCase().trim();
  if (!query) { renderAdminDashboard(); return; }
  const data = getData();
  const items = getContentItems(data);
  const filtered = items.filter(item => item.title.toLowerCase().includes(query) || item.category.toLowerCase().includes(query) || item.description.toLowerCase().includes(query));
  const contentTable = document.querySelector('#content-item-list');
  if (contentTable) {
    contentTable.innerHTML = '';
    filtered.forEach(item => {
      const row = document.createElement('tr');
      row.innerHTML = `<td>${sanitize(item.title)}</td><td>${sanitize(item.category)}</td><td>${item.imageUrl || item.pdfUrl ? '✓' : '-'}</td><td><button type=\"button\" class=\"button button-soft\" data-action=\"edit-content\" data-id=\"${item.id}\">Edit</button> <button type=\"button\" class=\"button button-soft\" data-action=\"delete-content\" data-id=\"${item.id}\">Delete</button></td>`;
      contentTable.appendChild(row);
    });
    document.getElementById('content-item-list').addEventListener('click', handleContentActions);
    showToast(`Found ${filtered.length} matching items.`, 'info');
  }
}

function exportAdminData() {
  const data = getData();
  const dataStr = JSON.stringify(data, null, 2);
  const blob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `paramcgwala-backup-${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
  showToast('✓ Data exported successfully. File saved to downloads.', 'success');
}

function importAdminData() {
  const fileInput = document.getElementById('import-file-input');
  if (fileInput) fileInput.click();
}

function handleFileImport(event) {
  const file = event.target.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const importedData = JSON.parse(e.target?.result || '{}');
      if (!importedData.site || !importedData.homepage) { showToast('✗ Invalid backup file format.', 'error'); return; }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(importedData));
      showToast('✓ Data imported successfully. Page refreshing...', 'success');
      setTimeout(() => window.location.reload(), 1500);
    } catch (err) {
      showToast('✗ Failed to import data. File may be corrupted.', 'error');
    }
  };
  reader.readAsText(file);
}

function initExportImport() {
  const exportBtn = document.getElementById('export-data-button');
  const importBtn = document.getElementById('import-data-button');
  const fileInput = document.getElementById('import-file-input');
  if (exportBtn) exportBtn.addEventListener('click', exportAdminData);
  if (importBtn) importBtn.addEventListener('click', importAdminData);
  if (fileInput) fileInput.addEventListener('change', handleFileImport);
}
function init() {
  const path = window.location.pathname.split('/').pop();
  if (document.querySelector('.hero')) renderHome();
  if (path === 'courses.html') renderCoursesPage();
  if (path === 'trading-bots.html') renderTradingBotsPage();
  if (path === 'ai-automation.html') renderAutomationPage();
  if (path === 'resources.html') renderResourcesPage();
  if (path === 'intelligence.html') renderIntelligencePage();
  if (path === 'contact.html') renderContactPage();

  initHamburgerMenu();
  initThemeToggle();
  updateNavAuthState();
  initAuthForms();
  handlePasswordToggles();
  initCalculators();

  if (path === 'admin.html') {
    initAdminPage();
    initAdminSearch();
    initExportImport();
  }
}

document.addEventListener('DOMContentLoaded', init);
