// Shared layout components
const HEADER_HTML = `
<div class="top-bar" role="banner">
  <div class="container">
    <div class="top-bar-left">
      <span>📞 <a href="tel:+13052020900">+1 (305) 202-0900</a></span>
      <span>✉️ <a href="mailto:rxxx3369@gmail.com">rxxx3369@gmail.com</a></span>
      <span>🕐 24/7 Customer Support</span>
    </div>
    <div class="top-bar-right">
      <span>🚚 Free shipping on orders $75+</span>
      <span>🔒 SSL Secured</span>
    </div>
  </div>
</div>
<header role="banner">
  <div class="container">
    <nav class="nav-wrapper" role="navigation" aria-label="Main navigation">
      <a href="index.html" class="logo" aria-label="Promedic Home">
        <img src="images/logo.svg" alt="Promedic" height="44" style="display:block;">
      </a>
      <div class="nav-search" role="search">
        <label for="search-input" class="visually-hidden">Search products</label>
        <input type="search" id="search-input" placeholder="Search medications, supplements, devices..." aria-label="Search products" onkeypress="handleSearch(event)">
        <button onclick="handleSearch(event)" aria-label="Submit search" tabindex="0">
          <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
        </button>
      </div>
      <nav class="main-nav" aria-label="Site sections">
        <a href="index.html">Home</a>
        <a href="products.html">Products</a>
        <a href="about.html">About</a>
        <a href="blog.html">Blog</a>
        <a href="faq.html">FAQ</a>
        <a href="contact.html">Contact</a>
      </nav>
      <div class="nav-actions">
        <button class="nav-cart-btn" aria-label="Open shopping cart" tabindex="0">
          <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
          Cart
          <span class="cart-count" aria-live="polite">0</span>
        </button>
        <button class="hamburger" id="hamburger-btn" aria-label="Toggle mobile menu" aria-expanded="false" onclick="toggleMobileMenu()">
          <svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
        </button>
      </div>
    </nav>
  </div>
  <nav class="mobile-menu" id="mobile-menu" aria-label="Mobile navigation">
    <a href="index.html">Home</a>
    <a href="products.html">Products</a>
    <a href="about.html">About</a>
    <a href="blog.html">Blog</a>
    <a href="faq.html">FAQ</a>
    <a href="contact.html">Contact</a>
  </nav>
</header>
`;

const CART_HTML = `
<div class="cart-overlay" id="cart-overlay" role="dialog" aria-modal="true" aria-label="Shopping cart"></div>
<aside class="cart-sidebar" id="cart-sidebar" aria-label="Shopping cart">
  <div class="cart-header">
    <h3>Your Cart</h3>
    <button class="cart-close" onclick="closeCart()" aria-label="Close cart">&#10005;</button>
  </div>
  <div class="cart-body" id="cart-body"></div>
  <div class="cart-footer">
    <div class="cart-total"><span>Total</span><span id="cart-total-val">$0.00</span></div>
    <button class="btn btn-primary btn-full" onclick="closeCart(); window.location.href='checkout.html';">Checkout</button>
    <p style="font-size:12px;color:var(--gray-400);text-align:center;margin-top:8px">Rx items require valid prescription at checkout</p>
  </div>
</aside>
`;

const FOOTER_HTML = `
<footer role="contentinfo">
  <div class="footer-top">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <div class="footer-logo">
            <img src="images/logo.svg" alt="Promedic" height="36" style="display:block;filter:brightness(0) invert(1);">
          </div>
          <p>Your trusted partner for affordable, FDA-compliant medications, supplements, and medical devices. Serving all 50 states.</p>
          <div class="footer-contact-item"><span>📞</span><a href="tel:+13052020900" style="color:rgba(255,255,255,0.6)">+1 (305) 202-0900</a></div>
          <div class="footer-contact-item"><span>✉️</span><a href="mailto:rxxx3369@gmail.com" style="color:rgba(255,255,255,0.6)">rxxx3369@gmail.com</a></div>
          <div class="footer-contact-item"><span>📍</span><span>Serving all 50 US States</span></div>
        </div>
        <div class="footer-col">
          <h4>Products</h4>
          <ul>
            <li><a href="products.html?cat=rx">Prescription (Rx)</a></li>
            <li><a href="products.html?cat=otc">OTC Medications</a></li>
            <li><a href="products.html?cat=supplement">Supplements</a></li>
            <li><a href="products.html?cat=device">Medical Devices</a></li>
            <li><a href="products.html">All Products</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Company</h4>
          <ul>
            <li><a href="about.html">About Us</a></li>
            <li><a href="blog.html">Blog</a></li>
            <li><a href="faq.html">FAQ</a></li>
            <li><a href="contact.html">Contact</a></li>
            <li><a href="contact.html#b2b">B2B / Wholesale</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Legal</h4>
          <ul>
            <li><a href="privacy-policy.html">Privacy Policy</a></li>
            <li><a href="terms.html">Terms & Conditions</a></li>
            <li><a href="medical-disclaimer.html">Medical Disclaimer</a></li>
            <li><a href="shipping-policy.html">Shipping Policy</a></li>
            <li><a href="refund-policy.html">Refund Policy</a></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <div class="container">
    <div class="footer-bottom">
      <p>&copy; 2026 Promedic. All rights reserved. | Business Legal Name: Promedic</p>
      <div class="footer-badges">
        <span class="footer-badge">FDA Compliant</span>
        <span class="footer-badge">SSL Secured</span>
        <span class="footer-badge">HIPAA Aware</span>
        <span class="footer-badge">50 States</span>
      </div>
    </div>
  </div>
</footer>
<button id="back-to-top" aria-label="Back to top" style="display:none;position:fixed;bottom:80px;right:24px;z-index:999;background:var(--primary);color:white;border:none;border-radius:50%;width:44px;height:44px;cursor:pointer;align-items:center;justify-content:center;box-shadow:var(--shadow-lg)">
  <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><polyline points="18 15 12 9 6 15"/></svg>
</button>
<div class="toast-container" id="toast-container" role="status" aria-live="polite"></div>
`;

// Inject layout on load
document.addEventListener('DOMContentLoaded', () => {
  // Header
  const headerPlaceholder = document.getElementById('header-placeholder');
  if (headerPlaceholder) headerPlaceholder.innerHTML = HEADER_HTML;
  // Cart
  const cartPlaceholder = document.getElementById('cart-placeholder');
  if (cartPlaceholder) cartPlaceholder.innerHTML = CART_HTML;
  // Footer
  const footerPlaceholder = document.getElementById('footer-placeholder');
  if (footerPlaceholder) footerPlaceholder.innerHTML = FOOTER_HTML;
});
