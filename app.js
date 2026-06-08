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
    ctaSecondary: 'Trading Dashboard',
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
  { name: 'Administrator', email: 'admin@paramcgwala.com', phone: '+91 9617422068', password: 'Admin@1234', role: 'admin' },
];

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
}

function renderHome() {
  const data = getData();
  const headline = document.querySelector('#hero h1');
  const subheadline = document.querySelector('.hero-text');
  const primaryCta = document.querySelector('.hero-actions .button-primary');
  const secondaryCta = document.querySelector('.hero-actions .button-outline');
  if (headline) headline.textContent = data.homepage.headline;
  if (subheadline) subheadline.textContent = data.homepage.subheadline;
  if (primaryCta) primaryCta.textContent = data.homepage.ctaPrimary;
  if (secondaryCta) secondaryCta.textContent = data.homepage.ctaSecondary;
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

function handleContactSubmit(event) {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.checkValidity()) {
    const invalidEl = form.querySelector(':invalid');
    if (invalidEl) showValidationMessage(invalidEl, invalidEl.validationMessage);
    return;
  }
  alert('Your message has been received. We will reach out shortly.');
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
  alert('Account created successfully. Please login to continue.');
  window.location.href = 'login.html';
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
  alert('Login successful. Redirecting now.');
  if (user.role === 'admin') {
    window.location.href = 'admin.html';
  } else {
    window.location.href = 'index.html';
  }
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

function renderAdminList(containerId, items, rowRenderer) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = items.map((item, index) => rowRenderer(item, index)).join('');
}

function renderAdminDashboard() {
  const data = getData();
  const courses = data.courses || [];
  const resources = data.resources || [];
  const aiServices = data.aiServices || [];
  const bots = data.bots || [];
  const news = data.news || [];
  const media = data.media || [];

  renderAdminList('course-list', courses, (course, index) => `
    <tr>
      <td>${sanitize(course.title)}</td>
      <td>${sanitize(course.description)}</td>
      <td><button class="button button-soft" data-action="edit-course" data-index="${index}">Edit</button> <button class="button button-soft" data-action="delete-course" data-index="${index}">Delete</button></td>
    </tr>
  `);

  renderAdminList('resource-list', resources, (resource, index) => `
    <tr>
      <td>${sanitize(resource.title)}</td>
      <td><a href="${sanitize(resource.url)}" target="_blank" rel="noopener noreferrer">Link</a></td>
      <td><button class="button button-soft" data-action="edit-resource" data-index="${index}">Edit</button> <button class="button button-soft" data-action="delete-resource" data-index="${index}">Delete</button></td>
    </tr>
  `);

  renderAdminList('ai-service-list', aiServices, (service, index) => `
    <tr>
      <td>${sanitize(service.title)}</td>
      <td>${sanitize(service.description)}</td>
      <td><button class="button button-soft" data-action="edit-ai" data-index="${index}">Edit</button> <button class="button button-soft" data-action="delete-ai" data-index="${index}">Delete</button></td>
    </tr>
  `);

  renderAdminList('bot-list', bots, (bot, index) => `
    <tr>
      <td>${sanitize(bot.title)}</td>
      <td>${sanitize(bot.description)}</td>
      <td><button class="button button-soft" data-action="edit-bot" data-index="${index}">Edit</button> <button class="button button-soft" data-action="delete-bot" data-index="${index}">Delete</button></td>
    </tr>
  `);

  renderAdminList('news-list', news, (item, index) => `
    <tr>
      <td>${sanitize(item.title)}</td>
      <td><a href="${sanitize(item.url)}" target="_blank" rel="noopener noreferrer">Link</a></td>
      <td><button class="button button-soft" data-action="edit-news" data-index="${index}">Edit</button> <button class="button button-soft" data-action="delete-news" data-index="${index}">Delete</button></td>
    </tr>
  `);

  renderAdminList('media-list', media, (item, index) => `
    <tr>
      <td>${sanitize(item.title)}</td>
      <td><a href="${sanitize(item.url)}" target="_blank" rel="noopener noreferrer">Link</a></td>
      <td><button class="button button-soft" data-action="edit-media" data-index="${index}">Edit</button> <button class="button button-soft" data-action="delete-media" data-index="${index}">Delete</button></td>
    </tr>
  `);

  const headline = document.getElementById('homepage-headline');
  const subheadline = document.getElementById('homepage-subheadline');
  const ctaPrimary = document.getElementById('homepage-cta-primary');
  const ctaSecondary = document.getElementById('homepage-cta-secondary');
  const footerEmail = document.getElementById('footer-email');
  const footerPhone = document.getElementById('footer-phone');
  const footerAddress = document.getElementById('footer-address');

  if (headline) headline.value = data.homepage.headline;
  if (subheadline) subheadline.value = data.homepage.subheadline;
  if (ctaPrimary) ctaPrimary.value = data.homepage.ctaPrimary;
  if (ctaSecondary) ctaSecondary.value = data.homepage.ctaSecondary;
  if (footerEmail) footerEmail.value = data.site.email;
  if (footerPhone) footerPhone.value = data.site.phone;
  if (footerAddress) footerAddress.value = data.site.address;

  document.getElementById('metric-members').textContent = `${getUsers().length}`;
  document.getElementById('metric-bots').textContent = `${bots.length}`;
  document.getElementById('metric-news').textContent = `${news.length}`;
}

function generateId() {
  return `content-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function saveData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
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
}

function handleContentActions(event) {
  const button = event.target.closest('button');
  if (!button) return;
  const action = button.dataset.action;
  const itemId = button.dataset.id;
  if (!action || !itemId) return;

  const data = getData();
  const items = getContentItems(data);

  if (action === 'edit-content') {
    openContentModal('', itemId);
    return;
  }

  if (action === 'delete-content') {
    const updatedItems = items.filter((item) => item.id !== itemId);
    saveData({ ...data, contentItems: updatedItems });
    renderAdminDashboard();
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

  if (headline) headline.value = data.homepage.headline;
  if (subheadline) subheadline.value = data.homepage.subheadline;
  if (ctaPrimary) ctaPrimary.value = data.homepage.ctaPrimary;
  if (ctaSecondary) ctaSecondary.value = data.homepage.ctaSecondary;
  if (footerEmail) footerEmail.value = data.site.email;
  if (footerPhone) footerPhone.value = data.site.phone;
  if (footerAddress) footerAddress.value = data.site.address;

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
  saveData({
    ...data,
    homepage: { ...data.homepage, headline, subheadline, ctaPrimary, ctaSecondary },
    site: { ...data.site, email: footerEmail, phone: footerPhone, address: footerAddress },
  });
  alert('Homepage and footer content saved successfully.');
}

function initAdminPage() {
  if (!requireAdmin()) return;
  const logoutButton = document.getElementById('logout-button');
  if (logoutButton) logoutButton.addEventListener('click', logout);
  renderAdminDashboard();
  document.getElementById('open-content-modal')?.addEventListener('click', () => openContentModal());
  document.getElementById('close-content-modal')?.addEventListener('click', closeContentModal);
  document.getElementById('cancel-content')?.addEventListener('click', closeContentModal);
  document.getElementById('content-form')?.addEventListener('submit', saveContentForm);
  document.getElementById('add-course-button')?.addEventListener('click', () => openContentModal('Course'));
  document.getElementById('add-resource-button')?.addEventListener('click', () => openContentModal('Resource Link'));
  document.getElementById('add-ai-service-button')?.addEventListener('click', () => openContentModal('AI Automation Resource'));
  document.getElementById('add-bot-button')?.addEventListener('click', () => openContentModal('Trading Bot'));
  document.getElementById('add-news-button')?.addEventListener('click', () => openContentModal('News'));
  document.getElementById('add-media-button')?.addEventListener('click', () => openContentModal('PDF'));
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

function init() {
  const path = window.location.pathname.split('/').pop();
  if (document.querySelector('.hero')) renderHome();
  if (path === 'courses.html') renderCoursesPage();
  if (path === 'trading-bots.html') renderTradingBotsPage();
  if (path === 'ai-automation.html') renderAutomationPage();
  if (path === 'resources.html') renderResourcesPage();
  if (path === 'intelligence.html') renderIntelligencePage();
  if (path === 'contact.html') renderContactPage();

  initAuthForms();
  handlePasswordToggles();
  initCalculators();

  if (path === 'admin.html') initAdminPage();
}

document.addEventListener('DOMContentLoaded', init);
