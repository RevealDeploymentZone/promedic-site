// Promedic Main JS - Cart, Navigation, Toast, FAQ
// AI-agent friendly: all actions update visible UI state

let cart = JSON.parse(localStorage.getItem('promedic_cart') || '[]');
let wishlist = JSON.parse(localStorage.getItem('promedic_wishlist') || '[]');

// ===== CART =====
function saveCart() { localStorage.setItem('promedic_cart', JSON.stringify(cart)); }
function saveWishlist() { localStorage.setItem('promedic_wishlist', JSON.stringify(wishlist)); }

function updateCartUI() {
  const count = cart.reduce((sum, i) => sum + i.qty, 0);
  document.querySelectorAll('.cart-count').forEach(el => {
    el.textContent = count;
    el.style.display = count > 0 ? 'flex' : 'none';
  });
  renderCartItems();
}

function renderCartItems() {
  const body = document.getElementById('cart-body');
  if (!body) return;
  if (cart.length === 0) {
    body.innerHTML = `<div class="cart-empty"><div class="cart-empty-icon">🛒</div><p>Your cart is empty</p><a href="products.html" class="btn btn-primary btn-sm" style="margin-top:12px">Browse Products</a></div>`;
    document.getElementById('cart-total-val').textContent = '$0.00';
    return;
  }
  body.innerHTML = cart.map(item => `
    <div class="cart-item" data-id="${item.id}">
      <div class="cart-item-img">${item.emoji}</div>
      <div style="flex:1">
        <p class="cart-item-name">${item.name}</p>
        <p class="cart-item-price">$${(item.price * item.qty).toFixed(2)} <span style="color:var(--gray-400);font-weight:400">x${item.qty}</span></p>
      </div>
      <button class="cart-item-remove" onclick="removeFromCart(${item.id})" aria-label="Remove ${item.name}">&#10005;</button>
    </div>
  `).join('');
  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const el = document.getElementById('cart-total-val');
  if (el) el.textContent = '$' + total.toFixed(2);
}

function addToCart(id) {
  const product = PROMEDIC_PRODUCTS.find(p => p.id === id);
  if (!product) return;
  const existing = cart.find(i => i.id === id);
  if (existing) existing.qty++;
  else cart.push({ id, name: product.name, price: product.price, emoji: product.emoji, qty: 1, requires_rx: product.requires_rx });
  saveCart(); updateCartUI();
  showToast(`${product.emoji} ${product.name} added to cart!`, 'success');
}

function removeFromCart(id) {
  cart = cart.filter(i => i.id !== id);
  saveCart(); updateCartUI();
  showToast('Item removed from cart.', 'success');
}

function openCart() {
  document.getElementById('cart-overlay').classList.add('open');
  document.getElementById('cart-sidebar').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  document.getElementById('cart-overlay').classList.remove('open');
  document.getElementById('cart-sidebar').classList.remove('open');
  document.body.style.overflow = '';
}

// ===== WISHLIST =====
function toggleWishlist(id) {
  const idx = wishlist.indexOf(id);
  const product = PROMEDIC_PRODUCTS.find(p => p.id === id);
  if (idx === -1) {
    wishlist.push(id);
    showToast(`${product.emoji} Added to wishlist!`, 'success');
  } else {
    wishlist.splice(idx, 1);
    showToast('Removed from wishlist.', 'success');
  }
  saveWishlist();
  document.querySelectorAll(`.product-wishlist[onclick="toggleWishlist(${id})"]`).forEach(btn => {
    btn.innerHTML = wishlist.includes(id) ? '&#9829;' : '&#9825;';
    btn.style.color = wishlist.includes(id) ? 'var(--red)' : '';
  });
}

// ===== TOAST =====
function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  container.appendChild(toast);
  setTimeout(() => { toast.style.opacity = '0'; toast.style.transform = 'translateX(100px)'; toast.style.transition = 'all 0.3s'; setTimeout(() => toast.remove(), 300); }, 3000);
}

// ===== MOBILE MENU =====
function toggleMobileMenu() {
  const menu = document.getElementById('mobile-menu');
  const btn = document.getElementById('hamburger-btn');
  if (!menu) return;
  const isOpen = menu.classList.toggle('open');
  btn.setAttribute('aria-expanded', isOpen);
}

// ===== SEARCH =====
function handleSearch(e) {
  if (e.key === 'Enter' || e.type === 'click') {
    const q = document.getElementById('search-input')?.value?.trim();
    if (q) window.location.href = `products.html?search=${encodeURIComponent(q)}`;
  }
}

// ===== FAQ ACCORDION =====
function initFAQ() {
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', !expanded);
      const answer = btn.nextElementSibling;
      if (answer) answer.classList.toggle('open', !expanded);
    });
  });
}

// ===== QUANTITY SELECTOR =====
function changeQty(delta) {
  const input = document.getElementById('qty-input');
  if (!input) return;
  let val = parseInt(input.value) + delta;
  if (val < 1) val = 1;
  if (val > 99) val = 99;
  input.value = val;
}

// ===== CONTACT FORM =====
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = 'Sending...';
    btn.disabled = true;
    setTimeout(() => {
      showToast('Message sent! We\'ll respond within 24 hours.', 'success');
      form.reset();
      btn.textContent = 'Send Message';
      btn.disabled = false;
    }, 1200);
  });
}

// ===== NEWSLETTER =====
function initNewsletter() {
  document.querySelectorAll('.newsletter-form').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const email = form.querySelector('input[type="email"]');
      if (email?.value) {
        showToast('Subscribed! Check your email for a welcome discount.', 'success');
        email.value = '';
      }
    });
  });
}

// ===== BACK TO TOP =====
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;
  window.addEventListener('scroll', () => { btn.style.display = window.scrollY > 400 ? 'flex' : 'none'; });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// ===== ACTIVE NAV =====
function setActiveNav() {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.main-nav a, .mobile-menu a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === page || (page === '' && href === 'index.html')) a.classList.add('active');
    else a.classList.remove('active');
  });
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  updateCartUI();
  initFAQ();
  initContactForm();
  initNewsletter();
  initBackToTop();
  setActiveNav();
  // Wire up cart buttons
  document.querySelectorAll('.nav-cart-btn').forEach(btn => btn.addEventListener('click', openCart));
  document.getElementById('cart-overlay')?.addEventListener('click', closeCart);
});
