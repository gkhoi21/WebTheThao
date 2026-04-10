 // ===== DỮ LIỆU =====
    const accounts = JSON.parse(localStorage.getItem('sf_accounts')) || [
  { email: 'test@gmail.com', password: '123456', name: 'Nguyễn Văn A' }
]; 

   const products = [
  { id: 1, name: 'Áo Bóng Đá', price: 350000, category: 'ao', type: 'shirt', colors: ['#E53935', '#1565C0', '#FDD835', '#212121'], colorNames: ['Đỏ', 'Xanh dương', 'Vàng', 'Trắng', 'Đen'], stock: 50, desc: 'Áo bóng đá chuyên nghiệp thấm hút mồ hôi' },
  { id: 2, name: 'Quần Bóng Đá', price: 250000, category: 'quan', type: 'shorts', colors: ['#E53935', '#1565C0', '#FDD835', '#212121'], colorNames: ['Đỏ', 'Xanh dương', 'Vàng', 'Trắng', 'Đen'], stock: 50, desc: 'Quần short bóng đá co giãn 4 chiều' },
  { id: 3, name: 'Bộ Đồ Bóng Đá', price: 550000, category: 'bo-do-bong-da', type: 'kit', colors: ['#E53935', '#1565C0', '#FDD835', '#212121'], colorNames: ['Đỏ', 'Xanh dương', 'Vàng', 'Trắng', 'Đen'], stock: 50, desc: 'Bộ đồ bóng đá hoàn chỉnh áo + quần' },
  { id: 4, name: 'Tất Bóng Đá', price: 120000, category: 'tat', type: 'socks', colors: ['#E53935', '#1565C0', '#FDD835', '#212121'], colorNames: ['Đỏ', 'Xanh dương', 'Vàng', 'Trắng', 'Đen'], stock: 50, desc: 'Tất bóng đá cổ dài bảo vệ bắp chân' },
  { id: 5, name: 'Giày Bóng Đá', price: 850000, category: 'giay', type: 'shoes', colors: ['#E53935', '#1565C0', '#FDD835', '#212121'], colorNames: ['Đỏ', 'Xanh dương', 'Vàng', 'Trắng', 'Đen'], stock: 50, desc: 'Giày bóng đá đinh dăm sân cỏ nhân tạo' },
];

    const categories = [
  { key: 'all', label: 'Tất Cả', icon: 'images/all.png' }, 
  { key: 'ao', label: 'Áo Bóng Đá', icon: 'images/ao.png' },
  { key: 'quan', label: 'Quần Bóng Đá', icon: 'images/quan.png' },
  { key: 'bo-do-bong-da', label: 'Bộ Đồ Bóng Đá', icon: 'images/bo.png' },
  { key: 'tat', label: 'Tất Bóng Đá', icon: 'images/tat.png' },
  { key: 'giay', label: 'Giày Bóng Đá', icon: 'images/giay.png' }
];

    // ===== TRẠNG THÁI =====
    let state = JSON.parse(localStorage.getItem('sf_state')) || {
  currentUser: null,
  cart: [],
  savedDesigns: {},
  activeCategory: 'all',
  isSearching: false,
  searchQuery: '',
  designProduct: null,
  designColorIndex: -1,
  designSockType: 'short',
};
    // ===== TIỆN ÍCH =====
    function formatPrice(n) {
      return n.toLocaleString('vi-VN') + 'đ';
    }

    function getContrastColor(hex) {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.55 ? '#1a1a1a' : '#ffffff';
    }

    function getBorderColor(hex) {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.55 ? '#cccccc' : '#444444';
    }

    // Tạo SVG áo
    function renderProductIcon(type, color, width, height, opts, id) {
  const textColor = getContrastColor(color);
  const borderColor = getBorderColor(color);
  const svgId = id || 'icon';
  const name = (opts && opts.name) || '';
  const number = (opts && opts.number) || '';
  const sockType = (opts && opts.sockType) || 'short';
  const darkerColor = adjustColor(color, -30);
  const lighterColor = adjustColor(color, 20);

  let svg = '<svg viewBox="VIEWBOX" width="' + width + '" height="' + height + '" xmlns="http://www.w3.org/2000/svg">';
  svg += '<defs><linearGradient id="sg-' + svgId + '" x1="0%" y1="0%" x2="100%" y2="100%">';
  svg += '<stop offset="0%" style="stop-color:' + lighterColor + ';stop-opacity:1"/>';
  svg += '<stop offset="100%" style="stop-color:' + darkerColor + ';stop-opacity:1"/>';
  svg += '</linearGradient></defs>';

  if (type === 'shirt') {
    svg = svg.replace('VIEWBOX', '0 0 200 250');
    svg += '<path d="M65 22 L48 38 L12 26 L28 88 L52 76 L52 232 L148 232 L148 76 L172 88 L188 26 L152 38 L135 22 Q100 42 65 22Z" fill="url(#sg-' + svgId + ')" stroke="' + borderColor + '" stroke-width="1.5"/>';
    svg += '<path d="M65 22 Q100 42 135 22" fill="none" stroke="' + borderColor + '" stroke-width="1.5"/>';
    svg += '<line x1="100" y1="22" x2="100" y2="42" stroke="' + borderColor + '" stroke-width="1" opacity="0.4"/>';
    if (name) svg += '<text x="100" y="115" text-anchor="middle" font-family="Oswald,sans-serif" font-size="15" font-weight="500" fill="' + textColor + '" letter-spacing="3" textLength="90" lengthAdjust="spacingAndGlyphs">' + escapeXml(name) + '</text>';
    if (number) svg += '<text x="100" y="185" text-anchor="middle" font-family="Oswald,sans-serif" font-size="56" font-weight="700" fill="' + textColor + '">' + escapeXml(number) + '</text>';

  } else if (type === 'shorts') {
    svg = svg.replace('VIEWBOX', '0 0 200 200');
    svg += '<path d="M48 12 L48 28 L18 188 L86 188 L100 125 L114 188 L182 188 L152 28 L152 12 Q100 24 48 12Z" fill="url(#sg-' + svgId + ')" stroke="' + borderColor + '" stroke-width="1.5"/>';
    svg += '<path d="M48 12 Q100 24 152 12" fill="none" stroke="' + borderColor + '" stroke-width="2"/>';
    svg += '<line x1="100" y1="20" x2="100" y2="125" stroke="' + borderColor + '" stroke-width="1" opacity="0.35"/>';
    if (number) svg += '<text x="100" y="90" text-anchor="middle" font-family="Oswald,sans-serif" font-size="40" font-weight="700" fill="' + textColor + '">' + escapeXml(number) + '</text>';

  } else if (type === 'kit') {
    svg = svg.replace('VIEWBOX', '0 0 200 280');
    svg += '<path d="M65 10 L48 24 L14 14 L28 72 L52 62 L52 128 L148 128 L148 62 L172 72 L186 14 L152 24 L135 10 Q100 28 65 10Z" fill="url(#sg-' + svgId + ')" stroke="' + borderColor + '" stroke-width="1.5"/>';
    svg += '<path d="M65 10 Q100 28 135 10" fill="none" stroke="' + borderColor + '" stroke-width="1.5"/>';
    svg += '<line x1="100" y1="10" x2="100" y2="30" stroke="' + borderColor + '" stroke-width="1" opacity="0.4"/>';
    svg += '<path d="M46 124 L24 268 L86 268 L100 210 L114 268 L176 268 L154 124 Q100 134 46 124Z" fill="url(#sg-' + svgId + ')" stroke="' + borderColor + '" stroke-width="1.5"/>';
    svg += '<line x1="100" y1="130" x2="100" y2="210" stroke="' + borderColor + '" stroke-width="1" opacity="0.3"/>';
    if (name) svg += '<text x="100" y="85" text-anchor="middle" font-family="Oswald,sans-serif" font-size="14" font-weight="500" fill="' + textColor + '" letter-spacing="2" textLength="70" lengthAdjust="spacingAndGlyphs">' + escapeXml(name) + '</text>';
    if (number) svg += '<text x="100" y="55" text-anchor="middle" font-family="Oswald,sans-serif" font-size="36" font-weight="700" fill="' + textColor + '">' + escapeXml(number) + '</text>';

  } else if (type === 'socks') {
    if (sockType === 'long') {
      svg = svg.replace('VIEWBOX', '0 0 200 260');
      svg += '<rect x="55" y="0" width="70" height="18" rx="2" fill="' + darkerColor + '" stroke="' + borderColor + '" stroke-width="1.2"/>';
      svg += '<line x1="55" y1="6" x2="125" y2="6" stroke="' + borderColor + '" stroke-width="0.7" opacity="0.45"/>';
      svg += '<line x1="55" y1="12" x2="125" y2="12" stroke="' + borderColor + '" stroke-width="0.7" opacity="0.45"/>';
      svg += '<path d="M58 18 L58 165 Q58 178 72 180 L178 180 Q193 182 195 195 L195 222 Q195 240 178 242 L72 242 Q52 242 48 222 L45 190 Q42 175 58 172 L122 172 L122 18 Z" fill="url(#sg-' + svgId + ')" stroke="' + borderColor + '" stroke-width="1.5"/>';
      svg += '<line x1="90" y1="22" x2="90" y2="165" stroke="' + borderColor + '" stroke-width="0.7" opacity="0.2"/>';
      svg += '<path d="M45 190 Q42 175 58 172" fill="none" stroke="' + borderColor + '" stroke-width="1.2" opacity="0.35"/>';
    } else {
      svg = svg.replace('VIEWBOX', '0 0 200 160');
      svg += '<rect x="55" y="0" width="70" height="16" rx="2" fill="' + darkerColor + '" stroke="' + borderColor + '" stroke-width="1.2"/>';
      svg += '<line x1="55" y1="5" x2="125" y2="5" stroke="' + borderColor + '" stroke-width="0.7" opacity="0.45"/>';
      svg += '<line x1="55" y1="10" x2="125" y2="10" stroke="' + borderColor + '" stroke-width="0.7" opacity="0.45"/>';
      svg += '<path d="M58 16 L58 75 Q58 88 72 90 L178 90 Q193 92 195 105 L195 125 Q195 142 178 144 L72 144 Q52 144 48 125 L45 98 Q42 85 58 82 L122 82 L122 16 Z" fill="url(#sg-' + svgId + ')" stroke="' + borderColor + '" stroke-width="1.5"/>';
      svg += '<line x1="90" y1="20" x2="90" y2="75" stroke="' + borderColor + '" stroke-width="0.7" opacity="0.2"/>';
      svg += '<path d="M45 98 Q42 85 58 82" fill="none" stroke="' + borderColor + '" stroke-width="1.2" opacity="0.35"/>';
    }

  } else if (type === 'shoes') {
    svg = svg.replace('VIEWBOX', '0 0 250 130');
    svg += '<path d="M8 82 L242 82 L250 94 Q252 108 240 112 L12 112 Q0 108 3 94 Z" fill="' + darkerColor + '" stroke="' + borderColor + '" stroke-width="1.5"/>';
    var studX = [28,52,76,100,124,148,172,196,220];
    for (var si = 0; si < studX.length; si++) {
      svg += '<rect x="' + (studX[si]-3) + '" y="113" width="6" height="7" rx="1" fill="' + borderColor + '" opacity="0.45"/>';
    }
    svg += '<path d="M15 82 L22 48 Q25 30 48 20 L92 10 Q112 5 132 8 L172 18 Q198 28 216 48 L242 82" fill="url(#sg-' + svgId + ')" stroke="' + borderColor + '" stroke-width="1.5"/>';
    svg += '<path d="M22 48 Q62 34 92 30 Q122 26 152 34 Q182 42 208 56" fill="none" stroke="' + borderColor + '" stroke-width="2"/>';
    svg += '<path d="M52 30 L68 5 Q98 -3 128 5 L146 30" fill="' + lighterColor + '" stroke="' + borderColor + '" stroke-width="0.8" opacity="0.65"/>';
    for (var li = 0; li < 5; li++) {
      var ly = 38 + li * 8;
      var lx1 = 60 + li * 2, lx2 = 150 - li * 2;
      svg += '<line x1="' + lx1 + '" y1="' + ly + '" x2="' + lx2 + '" y2="' + ly + '" stroke="' + borderColor + '" stroke-width="1" opacity="0.35"/>';
    }
    svg += '<path d="M208 56 Q230 68 242 82" fill="none" stroke="' + borderColor + '" stroke-width="1.2" opacity="0.25"/>';
    svg += '<line x1="8" y1="82" x2="242" y2="82" stroke="' + borderColor + '" stroke-width="0.8" opacity="0.25"/>';
  }

  svg += '</svg>';
  return svg;
}

    function adjustColor(hex, amount) {
      let r = Math.max(0, Math.min(255, parseInt(hex.slice(1, 3), 16) + amount));
      let g = Math.max(0, Math.min(255, parseInt(hex.slice(3, 5), 16) + amount));
      let b = Math.max(0, Math.min(255, parseInt(hex.slice(5, 7), 16) + amount));
      return '#' + [r, g, b].map(c => c.toString(16).padStart(2, '0')).join('');
    }

    function escapeXml(str) {
      return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }

    // Toast
    function showToast(message, type = 'info') {
      const container = document.getElementById('toast-container');
      const toast = document.createElement('div');
      const icons = { success: 'fa-check-circle', error: 'fa-circle-xmark', warning: 'fa-triangle-exclamation', info: 'fa-circle-info' };
      toast.className = `toast toast-${type}`;
      toast.innerHTML = `<i class="fa-solid ${icons[type]} text-lg"></i><span>${message}</span>`;
      container.appendChild(toast);
      setTimeout(() => {
        toast.classList.add('removing');
        setTimeout(() => toast.remove(), 300);
      }, 3500);
    }

    // Toggle mật khẩu
    function togglePasswordVisibility(inputId, btn) {
      const input = document.getElementById(inputId);
      const icon = btn.querySelector('i');
      if (input.type === 'password') {
        input.type = 'text';
        icon.classList.replace('fa-eye', 'fa-eye-slash');
      } else {
        input.type = 'password';
        icon.classList.replace('fa-eye-slash', 'fa-eye');
      }
    }

    // ===== XÁC THỰC =====
    function openAuthModal() {
      if (state.currentUser) return;
      document.getElementById('auth-modal').classList.add('active');
      switchAuthTab('login');
    }
    function closeAuthModal() {
      document.getElementById('auth-modal').classList.remove('active');
    }
    function switchAuthTab(tab) {
      document.querySelectorAll('#auth-modal .tab-btn').forEach(b => {
        b.classList.toggle('active', b.dataset.tab === tab);
      });
      document.getElementById('login-form').classList.toggle('hidden', tab !== 'login');
      document.getElementById('register-form').classList.toggle('hidden', tab !== 'register');
    }

    function handleLogin(e) {
      e.preventDefault();
      const email = document.getElementById('login-email').value.trim().toLowerCase();
      const password = document.getElementById('login-password').value;

      // TC2b: Email chưa tồn tại
      const account = accounts.find(a => a.email === email);
      if (!account) {
        showToast('Tài khoản chưa tồn tại trong hệ thống', 'error');
        return;
      }
      // TC2: Sai mật khẩu
      if (account.password !== password) {
        showToast('Đăng nhập không thành công - Email hoặc mật khẩu sai', 'error');
        return;
      }
      // TC1: Thành công
      state.currentUser = { email: account.email, name: account.name };
      saveState();
      updateAuthUI();
      closeAuthModal();
      showToast(`Xin chào, ${account.name}! Đăng nhập thành công.`, 'success');
      // Reset form
      document.getElementById('login-form').reset();
    }

    function handleRegister(e) {
      e.preventDefault();
      const name = document.getElementById('reg-name').value.trim();
      const email = document.getElementById('reg-email').value.trim().toLowerCase();
      const password = document.getElementById('reg-password').value;
      const confirm = document.getElementById('reg-confirm').value;

      if (password.length < 6) {
        showToast('Mật khẩu phải có ít nhất 6 ký tự', 'warning');
        return;
      }
      if (password !== confirm) {
        showToast('Mật khẩu xác nhận không khớp', 'error');
        return;
      }
      if (accounts.find(a => a.email === email)) {
        showToast('Email đã được đăng ký trước đó', 'warning');
        return;
      }

      accounts.push({ email, password, name });
      localStorage.setItem('sf_accounts', JSON.stringify(accounts));
      showToast('Đăng ký thành công! Bạn có thể đăng nhập ngay.', 'success');
      switchAuthTab('login');
      document.getElementById('login-email').value = email;
      document.getElementById('register-form').reset();
    }

    function logout() {
      state.currentUser = null;
      saveState();
      updateAuthUI();
      showToast('Bạn đã đăng xuất', 'info');
    }
function saveState() {
  localStorage.setItem('sf_state', JSON.stringify(state));
}
    function updateAuthUI() {
      const authBtn = document.getElementById('auth-btn');
      const userMenu = document.getElementById('user-menu');
      if (state.currentUser) {
        authBtn.classList.add('hidden');
        userMenu.classList.remove('hidden');
        userMenu.classList.add('flex');
        document.getElementById('user-avatar').textContent = state.currentUser.name.charAt(0).toUpperCase();
        document.getElementById('user-name-display').textContent = state.currentUser.name;
      } else {
        authBtn.classList.remove('hidden');
        userMenu.classList.add('hidden');
        userMenu.classList.remove('flex');
      }
      localStorage.setItem('sf_products', JSON.stringify(products));
    }

    // ===== TÌM KIẾM =====
    function fuzzySearch(query) {
  if (!query) return [];
  var q = query.toLowerCase().trim();
  var words = q.split(/\s+/);
  return products.filter(function(p) {
    var n = p.name.toLowerCase(), d = p.desc.toLowerCase(), c = p.category.toLowerCase();
    return words.some(function(w) { return n.indexOf(w) !== -1 || d.indexOf(w) !== -1 || c.indexOf(w) !== -1; });
  });
}

function handleSearch(query) {
  var q = (query || '').trim();
  if (!q) { showToast('Vui lòng nhập từ khóa tìm kiếm', 'warning'); return; }
  document.getElementById('search-dropdown').classList.add('hidden');
  state.isSearching = true;
  state.searchQuery = q;
  var results = fuzzySearch(q);
  document.getElementById('product-grid').style.display = 'none';
  document.getElementById('search-results-area').style.display = 'block';
  document.getElementById('search-results-grid').style.display = 'grid';
  document.getElementById('no-results').style.display = 'none';
  document.getElementById('search-results-grid').innerHTML = '';
  if (results.length === 0) {
    document.getElementById('search-results-grid').style.display = 'none';
    document.getElementById('no-results').style.display = 'block';
    document.getElementById('search-results-label').textContent = 'Không tìm thấy kết quả cho "' + q + '"';
    return;
  }
  document.getElementById('search-results-label').textContent = 'Tìm thấy ' + results.length + ' sản phẩm cho "' + q + '"';
  var html = '';
  for (var i = 0; i < results.length; i++) {
    html += buildCard(results[i]);
  }
  document.getElementById('search-results-grid').innerHTML = html;
}

function clearSearch() {
  state.isSearching = false;
  state.searchQuery = '';
  document.getElementById('search-input').value = '';
  var m = document.getElementById('mobile-search-input');
  if (m) m.value = '';
  document.getElementById('search-results-area').style.display = 'none';
  document.getElementById('product-grid').style.display = '';
  document.getElementById('search-dropdown').classList.add('hidden');
  renderProducts();
}

function showSearchDropdown(query) {
  var dropdown = document.getElementById('search-dropdown');
  if (!query || query.trim().length < 1) { dropdown.classList.add('hidden'); return; }
  var results = fuzzySearch(query.trim()).slice(0, 5);
  if (results.length === 0) { dropdown.classList.add('hidden'); return; }
  dropdown.classList.remove('hidden');
  var html = '';
  for (var i = 0; i < results.length; i++) {
    var p = results[i];
    html += '<div class="search-dropdown-item" onclick="handleSearch(\'' + p.name.replace(/'/g, "\\'") + '\')">' +
      '<div style="width:36px;height:36px;border-radius:8px;display:flex;align-items:center;justify-content:center;flex-shrink:0;background:' + p.colors[0] + '15;">' +
      renderProductIcon(p.type, p.colors[0], 24, 30, {}, 'sd' + p.id) +
      '</div><div style="flex:1;min-width:0;"><div style="font-size:14px;font-weight:500;color:var(--fg);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">' + p.name + '</div>' +
      '<div style="font-size:12px;color:var(--muted);">' + formatPrice(p.price) + '</div></div></div>';
  }
  dropdown.innerHTML = html;
}

function buildCard(product) {
  var sc = product.stock <= 5 ? 'stock-low' : 'stock-ok';
  var st = product.stock <= 5 ? 'Còn ' + product.stock : 'Còn ' + product.stock;
  var saved = state.savedDesigns[product.id];
  var dots = '';
  for (var i = 0; i < product.colors.length; i++) {
    dots += '<div style="width:20px;height:20px;border-radius:50%;border:1px solid var(--border);background:' + product.colors[i] + ';" title="' + product.colorNames[i] + '"></div>';
  }
  return '<div class="product-card" data-pid="' + product.id + '" style="cursor:pointer;">' +
    '<div class="relative" style="padding:24px 20px 8px 20px;min-height:230px;display:flex;align-items:center;justify-content:center;">' +
    '<div class="card-shirt" style="transition:transform 0.25s;">' + renderProductIcon(product.type, product.colors[0], 140, 175, {}, 'card' + product.id) + '</div>' +
    '<span class="stock-badge ' + sc + '" style="position:absolute;top:12px;left:12px;">' + st + '</span>' +
    (saved ? '<span style="position:absolute;top:12px;right:12px;width:28px;height:28px;border-radius:50%;background:var(--success);display:flex;align-items:center;justify-content:center;color:white;font-size:12px;"><i class="fa-solid fa-check"></i></span>' : '') +
    '</div>' +
    '<div style="padding:12px 16px;">' +
    '<h3 class="font-display" style="font-size:18px;font-weight:600;color:white;line-height:1.3;margin-bottom:4px;">' + product.name + '</h3>' +
    '<p style="font-size:14px;color:var(--muted);margin-bottom:12px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">' + product.desc + '</p>' +
    '<div style="display:flex;align-items:center;justify-content:space-between;">' +
    '<span class="font-display" style="font-size:20px;font-weight:700;color:var(--accent);">' + formatPrice(product.price) + '</span>' +
    '<button class="btn-primary" style="padding:8px 16px;font-size:14px;" data-design="' + product.id + '"><i class="fa-solid fa-palette"></i> Thiết Kế</button>' +
    '</div>' +
    '<div style="display:flex;gap:6px;margin-top:12px;">' + dots + '</div>' +
    '</div></div>';
}

// Bắt click cho TẤT CẢ product-card trên toàn trang
document.addEventListener('click', function(e) {
  // Nếu bấm nút Thiết Kế
  var btn = e.target.closest('[data-design]');
  if (btn) {
    e.stopPropagation();
    openDesignModal(parseInt(btn.getAttribute('data-design')));
    return;
  }
  // Nếu bấm vào card
  var card = e.target.closest('[data-pid]');
  if (card) {
    openDesignModal(parseInt(card.getAttribute('data-pid')));
  }
});

function createProductCardHTML(product) {
  return buildCard(product);
}
    function renderProducts() {
      const grid = document.getElementById('product-grid');
      const filtered = state.activeCategory === 'all'
        ? products
        : products.filter(p => p.category === state.activeCategory);

      grid.innerHTML = filtered.map(p => createProductCardHTML(p)).join('');
      document.getElementById('product-count-label').textContent = `${filtered.length} san pham`;

      const catLabel = categories.find(c => c.key === state.activeCategory);
      document.getElementById('product-subtitle').textContent = catLabel
        ? (catLabel.key === 'all' ? 'Tất cả sản phẩm' : `Danh mục ${catLabel.label}`)
        : 'Tất cả sản phẩm';
    }
   function updateCategoryBar() {
  var bar = document.getElementById('category-bar');
  bar.innerHTML = categories.map(function(c) {
    return '<button class="cat-btn ' + (state.activeCategory === c.key ? 'active' : '') + '" onclick="selectCategory(\'' + c.key + '\')">' +
      '<img src="' + c.icon + '" alt="" style="width:16px;height:16px;margin-right:4px;vertical-align:middle;">' + c.label + '</button>';
  }).join('');
}

    function selectCategory(key) {
      state.activeCategory = key;
      updateCategoryBar();
      if (state.isSearching) clearSearch();
      renderProducts();
    }

    // ===== THIẾT KẾ =====
    function openDesignModal(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;
  state.designProduct = product;
  state.designColorIndex = -1;
  state.designSockType = product.type === 'socks' ? 'short' : '';

  document.getElementById('design-modal-title').textContent = 'Thiết Kế - ' + product.name;
  document.getElementById('design-product-name').textContent = product.desc;
  document.getElementById('design-product-price').textContent = formatPrice(product.price);
  document.getElementById('design-stock-label').textContent = `(Tồn kho: ${product.stock})`;
  document.getElementById('design-qty').value = 1;
  document.getElementById('design-qty').max = product.stock;

  const saved = state.savedDesigns[productId];
  document.getElementById('design-name').value = saved ? saved.name : '';
  document.getElementById('design-number').value = saved ? saved.number : '';
  document.getElementById('design-name-count').textContent = saved ? saved.name.length : '0';
  document.getElementById('design-number-count').textContent = saved ? saved.number.length : '0';

  const colorsDiv = document.getElementById('design-colors');
  colorsDiv.innerHTML = product.colors.map((c, i) => {
    const tc = getContrastColor(c);
    const isSelected = saved && saved.colorIndex === i;
    return `<div class="color-swatch ${isSelected ? 'selected' : ''}" style="background:${c};color:${isSelected ? tc : 'transparent'};" data-index="${i}" onclick="selectDesignColor(${i})" title="${product.colorNames[i]}">${isSelected ? '✓' : ''}</div>`;
  }).join('');
  if (saved) state.designColorIndex = saved.colorIndex;
  if (saved && saved.sockType) state.designSockType = saved.sockType;

  // === HIỆN/ẨN CÁC TRƯỜNG THEO LOẠI ===
  const t = product.type;
  // Màu sắc: hiện cho tất cả
  document.getElementById('design-color-section').style.display = 'block';
  // Loại tất: chỉ hiện khi là tất
  document.getElementById('design-socktype-section').style.display = t === 'socks' ? 'block' : 'none';
  // Tên in: chỉ hiện khi là áo hoặc bộ đồ
  document.getElementById('design-name-section').style.display = (t === 'shirt' || t === 'kit') ? 'block' : 'none';
  // Số in: chỉ hiện khi là áo, quần, bộ đồ
  document.getElementById('design-number-section').style.display = (t === 'shirt' || t === 'kit') ? 'block' : 'none';

  if (t === 'socks') {
    const st = state.designSockType || 'short';
    document.getElementById('sock-short-btn').classList.toggle('active', st === 'short');
    document.getElementById('sock-long-btn').classList.toggle('active', st === 'long');
  }

  clearDesignErrors();
  updateDesignPreview();
  document.getElementById('design-modal').classList.add('active');
}

    function closeDesignModal() {
      document.getElementById('design-modal').classList.remove('active');
      state.designProduct = null;
      state.designColorIndex = -1;
    }

    function selectDesignColor(index) {
      state.designColorIndex = index;
      document.querySelectorAll('#design-colors .color-swatch').forEach((s, i) => {
        s.classList.toggle('selected', i === index);
        // Thêm dấu check có màu tương phản
        const color = state.designProduct.colors[i];
        const tc = getContrastColor(color);
        s.style.color = i === index ? tc : '';
      });
      document.getElementById('design-color-error').classList.add('hidden');
      updateDesignPreview();
    }

    function clearDesignErrors() {
      ['design-color-error', 'design-name-error', 'design-number-error'].forEach(id => {
        document.getElementById(id).classList.add('hidden');
      });
    }

    function validateDesign() {
  clearDesignErrors();
  let valid = true;
  const t = state.designProduct.type;

  // Tất cả loại đều phải chọn màu
  if (state.designColorIndex < 0) {
    document.getElementById('design-color-error').classList.remove('hidden');
    valid = false;
  }

  const name = document.getElementById('design-name').value.trim();
  const number = document.getElementById('design-number').value.trim();

  // Áo và bộ đồ: cần tên in
  if ((t === 'shirt' || t === 'kit') && !name) {
    document.getElementById('design-name-error').classList.remove('hidden');
    document.getElementById('design-name-error').textContent = 'Vui lòng nhập tên in';
    valid = false;
  }
  // Áo, quần, bộ đồ: cần số in
  if ((t === 'shirt' || t === 'kit') && !number) {
    document.getElementById('design-number-error').classList.remove('hidden');
    document.getElementById('design-number-error').textContent = 'Vui lòng nhập số in';
    valid = false;
  }
  // Giới hạn ký tự
  if (name.length > 20) {
    document.getElementById('design-name-error').classList.remove('hidden');
    document.getElementById('design-name-error').textContent = 'Bản thiết kế vượt quá giới hạn 20 ký tự cho phép';
    valid = false;
  }
  if (number.length > 3) {
    document.getElementById('design-number-error').classList.remove('hidden');
    document.getElementById('design-number-error').textContent = 'Bản thiết kế vượt quá giới hạn 3 ký tự cho phép';
    valid = false;
  }

  return valid;
}
    function selectSockType(type) {
  state.designSockType = type;
  document.getElementById('sock-short-btn').classList.toggle('active', type === 'short');
  document.getElementById('sock-long-btn').classList.toggle('active', type === 'long');
  updateDesignPreview();
}

function updateDesignPreview() {
  const preview = document.getElementById('design-preview');
  const p = state.designProduct;
  if (!p) return;
  const color = state.designColorIndex >= 0 ? p.colors[state.designColorIndex] : '#444444';
  const name = document.getElementById('design-name').value.trim();
  const number = document.getElementById('design-number').value.trim();
  const opts = { name, number, sockType: state.designSockType || 'short' };

  // Kích thước preview theo loại
  if (p.type === 'socks') {
    preview.style.width = '50%';
    preview.style.maxWidth = '140px';
  } else if (p.type === 'shoes') {
    preview.style.width = '90%';
    preview.style.maxWidth = '320px';
  } else {
    preview.style.width = '80%';
    preview.style.maxWidth = '260px';
  }

  preview.innerHTML = renderProductIcon(p.type, color, '100%', '100%', opts, 'preview');
}

    function changeDesignQty(delta) {
      const input = document.getElementById('design-qty');
      let val = parseInt(input.value) || 1;
      val = Math.max(1, Math.min(state.designProduct.stock, val + delta));
      input.value = val;
    }

    // TC1: Lưu thiết kế thành công
    function handleSaveDesign() {
  if (!validateDesign()) return;
  const p = state.designProduct;
  state.savedDesigns[p.id] = {
    colorIndex: state.designColorIndex,
    name: document.getElementById('design-name').value.trim(),
    number: document.getElementById('design-number').value.trim(),
    sockType: state.designSockType || 'short',
  };
  saveState();
  showToast('Lưu mẫu thiết kế thành công!', 'success');
  renderProducts();
}

    // Thêm vào giỏ từ modal thiết kế
   function handleAddToCartFromDesign() {
  if (!validateDesign()) return;
  const p = state.designProduct;
  const qty = parseInt(document.getElementById('design-qty').value) || 1;

  if (qty > p.stock) {
    showToast(`Số lượng vượt quá tồn kho (Còn lại: ${p.stock})`, 'error');
    return;
  }

  const cartItem = {
    productId: p.id,
    productName: p.name,
    productType: p.type,
    price: p.price,
    colorIndex: state.designColorIndex,
    colorName: p.colorNames[state.designColorIndex],
    colorHex: p.colors[state.designColorIndex],
    printName: document.getElementById('design-name').value.trim(),
    printNumber: document.getElementById('design-number').value.trim(),
    sockType: state.designSockType || 'short',
    quantity: qty,
    maxStock: p.stock,
  };

  const existingIndex = state.cart.findIndex(item =>
    item.productId === cartItem.productId &&
    item.colorIndex === cartItem.colorIndex &&
    item.printName === cartItem.printName &&
    item.printNumber === cartItem.printNumber &&
    item.sockType === cartItem.sockType
  );

  if (existingIndex >= 0) {
    const newQty = state.cart[existingIndex].quantity + qty;
    if (newQty > p.stock) {
      showToast(`Tổng số lượng vượt quá tồn kho (Còn lại: ${p.stock}). Hiện có: ${state.cart[existingIndex].quantity}`, 'error');
      return;
    }
    state.cart[existingIndex].quantity = newQty;
    showToast(`Cập nhật số lượng thành ${newQty} trong giỏ hàng`, 'success');
  } else {
    state.cart.push(cartItem);
    showToast('Thêm sản phẩm vào giỏ hàng thành công!', 'success');
  }
saveState();
  updateCartBadge();
  renderProducts();
}

    // ===== GIỎ HÀNG =====
    function openCart() {
      document.getElementById('cart-sidebar').classList.add('active');
      document.getElementById('cart-overlay').classList.add('active');
      document.body.style.overflow = 'hidden';
      renderCartItems();
    }
    function closeCart() {
      document.getElementById('cart-sidebar').classList.remove('active');
      document.getElementById('cart-overlay').classList.remove('active');
      document.body.style.overflow = '';
    }

    function updateCartBadge() {
      const count = state.cart.reduce((s, i) => s + i.quantity, 0);
      const badge = document.getElementById('cart-count');
      if (count > 0) {
        badge.textContent = count > 99 ? '99+' : count;
        badge.classList.remove('hidden');
        badge.classList.add('animate-count-bump');
        setTimeout(() => badge.classList.remove('animate-count-bump'), 300);
      } else {
        badge.classList.add('hidden');
      }
    }

    function renderCartItems() {
  const empty = document.getElementById('cart-empty');
  const list = document.getElementById('cart-items-list');
  const footer = document.getElementById('cart-footer');
  const countLabel = document.getElementById('cart-item-count');

  if (state.cart.length === 0) {
    empty.classList.remove('hidden');
    list.classList.add('hidden');
    footer.classList.add('hidden');
    countLabel.textContent = '(0)';
    return;
  }

  empty.classList.add('hidden');
  list.classList.remove('hidden');
  footer.classList.remove('hidden');

  const totalItems = state.cart.reduce((s, i) => s + i.quantity, 0);
  countLabel.textContent = `(${totalItems})`;

  let subtotal = 0;
  list.innerHTML = state.cart.map((item, idx) => {
    const itemTotal = item.price * item.quantity;
    subtotal += itemTotal;

    // Xây dựng mô tả ngắn gọn theo loại
    let desc = item.colorName;
    if (item.printName) desc += ' | ' + item.printName;
    if (item.printNumber) desc += ' #' + item.printNumber;
    if (item.productType === 'socks') desc += ' | Tất ' + (item.sockType === 'long' ? 'cổ dài' : 'cổ ngắn');

    // Icon nhỏ trong giỏ hàng
    const iconOpts = { name: item.printName, number: item.printNumber, sockType: item.sockType || 'short' };
    let iconW = 44, iconH = 55;
    if (item.productType === 'socks') { iconW = 22; iconH = 55; }
    if (item.productType === 'shoes') { iconW = 50; iconH = 32; }

    return `
      <div class="flex gap-3 p-3 rounded-xl border border-[var(--border)] bg-[var(--bg)]" style="animation:fade-in 0.3s ease ${idx * 0.05}s both;">
        <div class="w-16 h-16 rounded-lg flex items-center justify-center shrink-0" style="background:${item.colorHex}15;">
          ${renderProductIcon(item.productType, item.colorHex, iconW, iconH, iconOpts, 'cart' + idx)}
        </div>
        <div class="flex-1 min-w-0">
          <h4 class="text-sm font-semibold text-white truncate">${item.productName}</h4>
          <div class="text-xs text-[var(--muted)] mt-0.5">${desc}</div>
          <div class="flex items-center justify-between mt-2">
            <div class="flex items-center gap-2">
              <button class="qty-btn" style="width:26px;height:26px;" onclick="changeCartQty(${idx},-1)"><i class="fa-solid fa-minus" style="font-size:9px;"></i></button>
              <span class="text-sm font-medium w-6 text-center">${item.quantity}</span>
              <button class="qty-btn" style="width:26px;height:26px;" onclick="changeCartQty(${idx},1)"><i class="fa-solid fa-plus" style="font-size:9px;"></i></button>
            </div>
            <span class="font-display font-bold text-sm" style="color:var(--accent);">${formatPrice(itemTotal)}</span>
          </div>
        </div>
        <button class="self-start w-7 h-7 rounded-md flex items-center justify-center text-[var(--muted)] hover:text-[var(--danger)] hover:bg-[rgba(255,23,68,0.1)] transition shrink-0" onclick="removeCartItem(${idx})" title="Xóa" aria-label="Xóa sản phẩm">
          <i class="fa-solid fa-trash-can text-xs"></i>
        </button>
      </div>`;
  }).join('');

  document.getElementById('cart-subtotal').textContent = formatPrice(subtotal);
}

    function changeCartQty(idx, delta) {
      const item = state.cart[idx];
      if (!item) return;
      const newQty = item.quantity + delta;
      if (newQty < 1) {
        removeCartItem(idx);
        return;
      }
      if (newQty > item.maxStock) {
        showToast(`Số lượng vượt quá tồn kho (Còn lại: ${item.maxStock})`, 'error');
        return;
      }
      item.quantity = newQty;
      updateCartBadge();
      renderCartItems();
    }

    // TC4: Xoá sản phẩm
    function removeCartItem(idx) {
      const removed = state.cart.splice(idx, 1)[0];
      updateCartBadge();
      renderCartItems();
      saveState();
      showToast(`Đã xoá "${removed.productName}" Sản phẩm đã xoá khỏi giỏ hàng. Tổng tiền đã cập nhật.`, 'info');
    }

    // TC5: Xoá toàn bộ giỏ hàng
    function handleClearCart() {
      state.cart = [];
      updateCartBadge();
      renderCartItems();
      saveState();
      showToast('Giỏ hàng đã được xóa toàn bộ.', 'info');
    }

    // ===== ĐẶT HÀNG =====
    function openCheckout() {
      // TC4: Giỏ hàng trống
      if (state.cart.length === 0) {
        showToast('Giỏ hàng trống. Vui lòng thêm sản phẩm trước khi đặt hàng.', 'warning');
        return;
      }
      closeCart();
      // Tự động điền thông tin nếu đã đăng nhập
      if (state.currentUser) {
        document.getElementById('ck-name').value = state.currentUser.name;
      }
      renderCheckoutSummary();
      clearCheckoutErrors();
      document.getElementById('checkout-modal').classList.add('active');
    }

    function closeCheckout() {
      document.getElementById('checkout-modal').classList.remove('active');
    }

    function renderCheckoutSummary() {
  const summary = document.getElementById('checkout-summary');
  let total = 0;
  summary.innerHTML = state.cart.map(item => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    let desc = item.colorName;
    if (item.printName) desc += ' | ' + item.printName;
    if (item.printNumber) desc += ' #' + item.printNumber;
    if (item.productType === 'socks') desc += ' | Tất ' + (item.sockType === 'long' ? 'cổ dài' : 'cổ ngắn');

    const iconOpts = { name: item.printName, number: item.printNumber, sockType: item.sockType || 'short' };
    let iconW = 32, iconH = 40;
    if (item.productType === 'socks') { iconW = 14; iconH = 40; }
    if (item.productType === 'shoes') { iconW = 40; iconH = 22; }
    if (item.productType === 'kit') { iconW = 28; iconH = 40; }

    return `
      <div class="flex items-center gap-3 p-3 rounded-lg bg-[var(--bg)] border border-[var(--border)]">
        <div class="w-12 h-12 rounded-md flex items-center justify-center shrink-0" style="background:${item.colorHex}15;">
          ${renderProductIcon(item.productType, item.colorHex, iconW, iconH, iconOpts, 'ck' + item.productId)}
        </div>
        <div class="flex-1 min-w-0">
          <div class="text-sm font-medium text-white truncate">${item.productName}</div>
          <div class="text-xs text-[var(--muted)]">${desc} | x${item.quantity}</div>
        </div>
        <span class="text-sm font-semibold text-white shrink-0">${formatPrice(itemTotal)}</span>
      </div>`;
  }).join('');
  document.getElementById('checkout-total').textContent = formatPrice(total);
}

    function clearCheckoutErrors() {
      ['ck-phone-error', 'ck-address-error'].forEach(id => {
        document.getElementById(id).classList.add('hidden');
      });
      ['ck-phone', 'ck-address'].forEach(id => {
        document.getElementById(id).classList.remove('error');
      });
    }

        function handlePlaceOrder(e) {
  e.preventDefault();
  if (state.cart.length === 0) return;
  clearCheckoutErrors();
  let valid = true;

  const name = document.getElementById('ck-name').value.trim();
  const phone = document.getElementById('ck-phone').value.trim();
  const address = document.getElementById('ck-address').value.trim();

  const phoneRegex = /^(0[3|5|7|8|9])+([0-9]{8})$/;
  if (!phoneRegex.test(phone)) {
    document.getElementById('ck-phone-error').classList.remove('hidden');
    document.getElementById('ck-phone').classList.add('error');
    valid = false;
  }

  if (!address) {
    document.getElementById('ck-address-error').classList.remove('hidden');
    document.getElementById('ck-address').classList.add('error');
    valid = false;
  }

  if (!name) {
    valid = false;
    showToast('Vui lòng nhập họ và tên', 'warning');
  }

  if (!valid) return;

  closeCheckout();

  // Tính tổng và clone items TRƯỚC khi xoá giỏ
  const orderItems = JSON.parse(JSON.stringify(state.cart));
  const orderTotal = state.cart.reduce(function(s, i) { return s + i.price * i.quantity; }, 0);
  const newId = 'DH' + Date.now().toString().slice(-8);

  // Lưu đơn hàng — chỉ 1 lần
  var orderKey = 'sf_orders_' + state.currentUser.email;
  var orderHistory = JSON.parse(localStorage.getItem(orderKey)) || [];
  orderHistory.unshift({
    id: newId,
    date: new Date().toLocaleString('vi-VN'),
    items: orderItems,
    total: orderTotal,
    payment: document.querySelector('input[name="payment"]:checked').value,
    name: name,
    phone: phone,
    address: address,
    status: 'Chờ xác nhận'
  });
  localStorage.setItem(orderKey, JSON.stringify(orderHistory));

  // Giảm tồn kho — chỉ 1 lần
  for (var i = 0; i < state.cart.length; i++) {
    var item = state.cart[i];
    for (var j = 0; j < products.length; j++) {
      if (products[j].id === item.productId) {
        products[j].stock -= item.quantity;
        if (products[j].stock < 0) products[j].stock = 0;
        break;
      }
    }
  }
  localStorage.setItem('sf_products', JSON.stringify(products));

  // Xoá giỏ hàng
  state.cart = [];
  saveState();
  updateCartBadge();
  renderCartItems();
  renderProducts();
  document.getElementById('checkout-form').reset();

  // Hiển thị success overlay
  document.getElementById('order-success').classList.add('active');
  document.body.style.overflow = 'hidden';
}
    function openOrderHistory() {
  if (!state.currentUser) { showToast('Vui lòng đăng nhập để xem đơn hàng', 'warning'); return; }
var orders = JSON.parse(localStorage.getItem('sf_orders_' + state.currentUser.email)) || [];
  var container = document.getElementById('order-list');

  if (orders.length === 0) {
    container.innerHTML = '<div class="text-center py-16"><i class="fa-solid fa-box-open text-4xl text-border mb-3 block"></i><p class="text-muted">Bạn chưa có đơn hàng nào</p></div>';
  } else {
    var html = '';
    for (var i = 0; i < orders.length; i++) {
      var o = orders[i];
      var payLabel = o.payment === 'cod' ? 'Tiền mặt' : 'Chuyển khoản';
      var payIcon = o.payment === 'cod' ? 'fa-flag' : 'fa-credit-card';

      var itemsHtml = '';
      for (var j = 0; j < o.items.length; j++) {
        var item = o.items[j];
        var desc = item.colorName;
        if (item.printName) desc += ' | ' + item.printName;
        if (item.printNumber) desc += ' #' + item.printNumber;
        if (item.productType === 'socks') desc += ' | Tất ' + (item.sockType === 'long' ? 'cổ dài' : 'cổ ngắn');

        var iconW = 28, iconH = 35;
        if (item.productType === 'socks') { iconW = 14; iconH = 35; }
        if (item.productType === 'shoes') { iconW = 35; iconH = 22; }
        if (item.productType === 'kit') { iconW = 24; iconH = 35; }

        itemsHtml += '<div class="flex items-center gap-3 py-2">' +
          '<div style="width:40px;height:40px;border-radius:8px;display:flex;align-items:center;justify-content:center;flex-shrink:0;background:' + item.colorHex + '15;">' +
          renderProductIcon(item.productType, item.colorHex, iconW, iconH, { name: item.printName, number: item.printNumber, sockType: item.sockType || 'short' }, 'oh' + i + j) +
          '</div>' +
          '<div style="flex:1;min-width:0;"><div style="font-size:13px;font-weight:500;color:white;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">' + item.productName + '</div>' +
          '<div style="font-size:11px;color:var(--muted);">' + desc + ' | x' + item.quantity + '</div></div>' +
          '<span style="font-size:13px;font-weight:600;color:var(--accent);white-space:nowrap;">' + formatPrice(item.price * item.quantity) + '</span></div>';
      }

      html += '<div class="rounded-xl border border-border mb-4" style="background:var(--bg);">' +
        '<div class="p-3 flex items-center justify-between border-b border-border">' +
        '<div><span style="font-size:13px;font-weight:600;color:var(--accent);">' + o.id + '</span><span style="font-size:12px;color:var(--muted);margin-left:12px;">' + o.date + '</span></div>' +
        '<span style="font-size:12px;padding:3px 10px;border-radius:20px;background:rgba(0,200,83,0.12);color:var(--success);font-weight:500;">' + o.status + '</span></div>' +
        '<div class="px-3 py-1" style="font-size:12px;color:var(--muted);"><i class="fa-solid ' + payIcon + ' mr-1"></i> ' + payLabel + ' | ' + o.name + ' | ' + o.phone + '</div>' +
        '<div class="px-3 pb-3">' + itemsHtml + '</div>' +
        '<div class="p-3 border-t border-border flex items-center justify-between">' +
        '<span style="font-size:13px;color:var(--muted);">Tổng cộng:</span>' +
        '<span class="font-display" style="font-size:18px;font-weight:700;color:var(--accent);">' + formatPrice(o.total) + '</span></div></div>';
    }
    container.innerHTML = html;
  }

  document.getElementById('order-modal').classList.add('active');
}

function closeOrderHistory() {
  document.getElementById('order-modal').addEventListener('click', function(e) {
  if (e.target === this) closeOrderHistory();
});
  document.getElementById('order-modal').classList.remove('active');
}

    function closeOrderSuccess() {
      document.getElementById('order-success').classList.remove('active');
      document.body.style.overflow = '';
    }

    // ===== SỰ KIỆN =====
    document.addEventListener('DOMContentLoaded', () => {
  setTimeout(function() {
    if (document.getElementById('category-bar')) updateCategoryBar();
    if (document.getElementById('product-grid')) renderProducts();
    if (document.getElementById('auth-btn')) updateAuthUI();
  }, 100);
  });
            // Search input events
      const searchInput = document.getElementById('search-input');
      if (searchInput) {
        let searchTimeout;
        searchInput.addEventListener('input', (e) => {
          clearTimeout(searchTimeout);
          searchTimeout = setTimeout(() => showSearchDropdown(e.target.value), 200);
        });
        searchInput.addEventListener('keydown', (e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            document.getElementById('search-dropdown').classList.add('hidden');
            handleSearch(e.target.value);
          }
        });
        document.getElementById('search-btn').addEventListener('click', () => {
          document.getElementById('search-dropdown').classList.add('hidden');
          handleSearch(searchInput.value);
        });
      }
      const searchBtn = document.getElementById('search-btn');

if (searchBtn) {
  searchBtn.addEventListener('click', () => {
    const dropdown = document.getElementById('search-dropdown');

    if (dropdown) {
      dropdown.classList.add('hidden');
    }

    handleSearch(searchInput.value);
  });
}
      // Mobile search
      const mobileSearchInput = document.getElementById('mobile-search-input');

if (mobileSearchInput) {
  mobileSearchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleMobileSearch();
    }
  });
}
      // Đóng dropdown khi click bên ngoài
      document.addEventListener('click', (e) => {
        if (!e.target.closest('#search-wrapper')) {
          document.getElementById('search-dropdown').classList.add('hidden');
        }
      });

      // Design modal input events
      const designNameInput = document.getElementById('design-name');

if (designNameInput) {
  designNameInput.addEventListener('input', (e) => {
    const val = e.target.value;

    const count = document.getElementById('design-name-count');
    if (count) {
      count.textContent = val.length;
    }

    const error = document.getElementById('design-name-error');
    if (error) {
      if (val.length > 20) {
        error.classList.remove('hidden');
        error.textContent =
          'Bản thiết kế vượt quá giới hạn 20 ký tự cho phép';
      } else {
        error.classList.add('hidden');
      }
    }

    updateDesignPreview();
  });
}
      const designNumberInput = document.getElementById('design-number');

if (designNumberInput) {
  designNumberInput.addEventListener('input', (e) => {
    const val = e.target.value;

    const count = document.getElementById('design-number-count');
    if (count) {
      count.textContent = val.length;
    }

    const error = document.getElementById('design-number-error');
    if (error) {
      if (val.length > 3) {
        error.classList.remove('hidden');
        error.textContent =
          'Bản thiết kế vượt quá giới hạn 3 ký tự cho phép';
      } else {
        error.classList.add('hidden');
      }
    }

    updateDesignPreview();
  });
}
      const designQtyInput = document.getElementById('design-qty');

if (designQtyInput) {
  designQtyInput.addEventListener('change', (e) => {
    let val = parseInt(e.target.value) || 1;

    val = Math.max(
      1,
      Math.min(
        state.designProduct
          ? state.designProduct.stock
          : 99,
        val
      )
    );

    e.target.value = val;
  });
}

      // Đóng modal khi click overlay
     const modalActions = {
  'auth-modal': closeAuthModal,
  'design-modal': closeDesignModal,
  'checkout-modal': closeCheckout
};

Object.keys(modalActions).forEach(id => {
  const modal = document.getElementById(id);

  if (!modal) return;

  modal.addEventListener('click', (e) => {
    if (e.target === e.currentTarget) {
      modalActions[id]();
    }
  });
});

      // Escape key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          closeAuthModal();
          closeDesignModal();
          closeCheckout();
          closeCart();
          closeOrderSuccess(); closeOrderHistory(); document.getElementById('search-dropdown')
        }
      });

      // Checkout phone input — clear error khi sửa
      const ckPhone = document.getElementById('ck-phone');
if (ckPhone) {
  ckPhone.addEventListener('input', () => {
    const error = document.getElementById('ck-phone-error');
    if (error) error.classList.add('hidden');

    ckPhone.classList.remove('error');
  });
}

const ckAddress = document.getElementById('ck-address');
if (ckAddress) {
  ckAddress.addEventListener('input', () => {
    const error = document.getElementById('ck-address-error');
    if (error) error.classList.add('hidden');

    ckAddress.classList.remove('error');
  });
}
