/* ===== ĐĂNG NHẬP ADMIN ===== */
    var ADMIN_USER = 'admin';
    var ADMIN_PASS = 'admin123';

    document.addEventListener('DOMContentLoaded', function() {
      /* Đã đăng nhập rồi → bỏ màn login, hiện nội dung */
      if (sessionStorage.getItem('ht_admin_ok') === '1') {
        document.getElementById('login-gate').remove();
        document.getElementById('admin-wrap').style.display = '';
      }

      var form = document.getElementById('login-form');
if (!form) return;

form.addEventListener('submit', function(e) {
        e.preventDefault();
        var u = document.getElementById('lg-user').value.trim();
        var p = document.getElementById('lg-pass').value;

        if (u !== ADMIN_USER || p !== ADMIN_PASS) {
          document.getElementById('lg-err').style.display = 'block';
          var box = document.getElementById('login-box');
          box.classList.remove('shake');
          void box.offsetWidth; /* reflow để chạy lại animation */
          box.classList.add('shake');
          return;
        }

        sessionStorage.setItem('ht_admin_ok', '1');
        document.getElementById('login-gate').remove();
        document.getElementById('admin-wrap').style.display = '';
        loadData();
      });
    });

    function adminLogout() {
      sessionStorage.removeItem('ht_admin_ok');
      location.reload();
    }
    /* ===== KẾT THÚC ĐĂNG NHẬP ===== */

    // --- TIỆN ÍCH ---
    function formatPrice(n) { return n.toLocaleString('vi-VN') + 'đ'; }
    function getContrastColor(hex) { var r=parseInt(hex.slice(1,3),16),g=parseInt(hex.slice(3,5),16),b=parseInt(hex.slice(5,7),16); return (0.299*r+0.587*g+0.114*b)/255>0.55?'#1a1a1a':'#ffffff'; }
    function adjustColor(hex,amount) { var r=Math.max(0,Math.min(255,parseInt(hex.slice(1,3),16)+amount)),g=Math.max(0,Math.min(255,parseInt(hex.slice(3,5),16)+amount)),b=Math.max(0,Math.min(255,parseInt(hex.slice(5,7),16)+amount)); return '#'+[r,g,b].map(function(c){return c.toString(16).padStart(2,'0')}).join(''); }
    function escapeXml(str) { return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

    function renderProductIcon(type, color, w, h, opts, id) {
      var tc=getContrastColor(color),bc=adjustColor(color,-30),lc=adjustColor(color,20),svgId=id||'icon';
      var name=(opts&&opts.name)||'',number=(opts&&opts.number)||'',sockType=(opts&&opts.sockType)||'short';
      var s='<svg viewBox="0 0 200 200" width="'+w+'" height="'+h+'" xmlns="http://www.w3.org/2000/svg">';
      s+='<defs><linearGradient id="bg-'+svgId+'" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:'+lc+'"/><stop offset="100%" style="stop-color:'+bc+'"/></linearGradient></defs>';
      s+='<rect x="6" y="6" width="188" height="188" rx="40" fill="url(#bg-'+svgId+')"/>';
      var sw='stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none"';
      if(type==='shirt'){s+='<g transform="translate(100,100)"><path d="M-32-55 L-42-48 L-66-56 L-56-10 L-40-20 L-40 52 L40 52 L40-20 L56-10 L66-56 L42-48 L32-55 Q0-40 -32-55Z" '+sw+'/>';if(name)s+='<text x="0" y="10" text-anchor="middle" font-family="Oswald,sans-serif" font-size="14" font-weight="600" fill="white" opacity="0.85" letter-spacing="2" textLength="90" lengthAdjust="spacingAndGlyphs">'+escapeXml(name)+'</text>';if(number)s+='<text x="0" y="42" text-anchor="middle" font-family="Oswald,sans-serif" font-size="38" font-weight="700" fill="white" opacity="0.85">'+escapeXml(number)+'</text>';s+='</g>';}
      else if(type==='shorts'){s+='<g transform="translate(100,102)"><path d="M-38-45 L-38-32 L-58 50 L-6 50 L0 8 L6 50 L58 50 L38-32 L38-45 Q0-34 -38-45Z" '+sw+'/>';if(number)s+='<text x="0" y="18" text-anchor="middle" font-family="Oswald,sans-serif" font-size="32" font-weight="700" fill="white" opacity="0.85">'+escapeXml(number)+'</text>';s+='</g>';}
      else if(type==='kit'){s+='<g transform="translate(100,100)"><path d="M-20-62 L-26-58 L-46-62 L-38-30 L-26-36 L-26-6 L26-6 L26-36 L38-30 L46-62 L26-58 L20-62 Q0-50 -20-62Z" '+sw+'/><path d="M-20 0 L-36 60 L-4 60 L0 32 L4 60 L36 60 L20 0 Q0 4 -20 0Z" '+sw+'/>';if(name)s+='<text x="0" y="-28" text-anchor="middle" font-family="Oswald,sans-serif" font-size="10" font-weight="600" fill="white" opacity="0.8" letter-spacing="1" textLength="70" lengthAdjust="spacingAndGlyphs">'+escapeXml(name)+'</text>';if(number)s+='<text x="0" y="-46" text-anchor="middle" font-family="Oswald,sans-serif" font-size="24" font-weight="700" fill="white" opacity="0.85">'+escapeXml(number)+'</text>';s+='</g>';}
      else if(type==='socks'){var oy=sockType==='long'?-8:12,sy=sockType==='long'?1.1:0.72;s+='<g transform="translate(100,100) scale(0.82,'+sy+') translate(0,'+oy+')"><rect x="-14" y="-72" width="28" height="10" rx="3" '+sw+' stroke-width="2" opacity="0.5"/><path d="M-10,-63 L10,-63 L10,-5 L55,-5 Q68,-5 68,8 Q68,22 55,22 L-5,22 Q-18,22 -18,10 L-18,-1 Q-18,-5 -10,-5 Z" '+sw+'/></g>';}
      else if(type==='shoes'){s+='<g transform="translate(100,108) scale(0.85)"><rect x="-80" y="0" width="165" height="16" rx="6" '+sw+' stroke-width="3" opacity="0.7"/><path d="M-72,0 L-68,-18 Q-65,-30 -50,-36 L-15,-44 Q5,-48 25,-44 L55,-36 Q70,-30 75,-18 L82,0" '+sw+'/><path d="M-68,-18 Q-30,-32 5,-34 Q40,-32 65,-18" stroke="white" stroke-width="2" fill="none" opacity="0.3"/></g>';}
      s+='</svg>';return s;
    }

    // --- DỮ LIỆU TOÀN CỤC ---
    var allAccounts = [];
    var allOrders = [];
    var allProducts = [];

    function loadData() {
      allAccounts = JSON.parse(localStorage.getItem('sf_accounts')) || [];
      allProducts = JSON.parse(localStorage.getItem('sf_products')) || [];
      allOrders = [];
      allAccounts.forEach(function(acc) {
        var orders = JSON.parse(localStorage.getItem('sf_orders_' + acc.email)) || [];
        orders.forEach(function(o) { o.customerEmail = acc.email; o.customerName = acc.name; });
        allOrders = allOrders.concat(orders);
      });
      allOrders.sort(function(a, b) { return b.id.localeCompare(a.id); });
      renderStats();
      renderUsers(allAccounts);
      renderOrders(allOrders);
    }

    function renderStats() {
      document.getElementById('stat-users').textContent = allAccounts.length;
      document.getElementById('stat-orders').textContent = allOrders.length;
      var revenue = 0;
      allOrders.forEach(function(o) { revenue += o.total; });
      document.getElementById('stat-revenue').textContent = formatPrice(revenue);
      var lowStock = allProducts.filter(function(p) { return p.stock <= 5; }).length;
      document.getElementById('stat-lowstock').textContent = lowStock;
    }

    function renderUsers(data) {
      var tbody = document.getElementById('user-tbody');
      if (data.length === 0) { tbody.innerHTML = '<tr><td colspan="5" class="text-center text-[var(--muted)] py-8">Chưa có tài khoản khách hàng nào</td></tr>'; return; }
      var html = '';
      data.forEach(function(u, i) {
        html += '<tr><td class="text-[var(--muted)]">' + (i+1) + '</td><td class="font-medium text-white">' + u.name + '</td><td class="text-[var(--accent)]">' + u.email + '</td><td>' + (u.phone || '-') + '</td><td class="max-w-[200px] truncate text-[var(--muted)]">' + (u.address || '-') + '</td></tr>';
      });
      tbody.innerHTML = html;
    }

    function renderOrders(data) {
      var tbody = document.getElementById('order-tbody');
      if (data.length === 0) { tbody.innerHTML = '<tr><td colspan="7" class="text-center text-[var(--muted)] py-8">Chưa có đơn hàng nào</td></tr>'; return; }
      var html = '';
      data.forEach(function(o) {
        var payLabel = o.payment === 'cod' ? 'Tiền mặt' : 'Chuyển khoản';
        var payBadge = o.payment === 'cod' ? 'badge-success' : 'badge-warning';
        html += '<tr><td class="font-display font-semibold text-[var(--accent)]">' + o.id + '</td><td><div class="font-medium text-white">' + o.name + '</div><div class="text-xs text-[var(--muted)]">' + o.customerEmail + '</div></td><td class="text-[var(--muted)] text-sm">' + o.date + '</td><td><span class="badge ' + payBadge + '">' + payLabel + '</span></td><td class="font-display font-bold text-white">' + formatPrice(o.total) + '</td><td><span class="badge badge-success">Chờ xác nhận</span></td><td><button onclick="viewDetail(\'' + o.id + '\')" class="text-sm text-[var(--accent)] hover:underline font-medium">Xem chi tiết</button></td></tr>';
      });
      tbody.innerHTML = html;
    }

    function viewDetail(orderId) {
      var order = allOrders.find(function(o) { return o.id === orderId; });
      if (!order) return;
      var payLabel = order.payment === 'cod' ? 'Tiền mặt' : 'Chuyển khoản';
      var itemsHtml = '';
      order.items.forEach(function(item) {
        var desc = item.colorName;
        if (item.printName) desc += ' | In: ' + item.printName;
        if (item.printNumber) desc += ' #' + item.printNumber;
        if (item.productType === 'socks') desc += ' | Tất ' + (item.sockType === 'long' ? 'cổ dài' : 'cổ ngắn');
        var iconW = 30, iconH = 38;
        if (item.productType === 'socks') { iconW = 16; iconH = 38; }
        if (item.productType === 'shoes') { iconW = 40; iconH = 25; }
        if (item.productType === 'kit') { iconW = 26; iconH = 38; }
        itemsHtml += '<div class="flex items-center gap-3 py-3 border-b border-[var(--border)]"><div style="width:45px;height:45px;border-radius:8px;display:flex;align-items:center;justify-content:center;flex-shrink:0;background:' + item.colorHex + '15;">' + renderProductIcon(item.productType, item.colorHex, iconW, iconH, {name:item.printName, number:item.printNumber, sockType:item.sockType}, 'od'+item.productId) + '</div><div style="flex:1;min-width:0;"><div class="text-sm font-medium text-white truncate">' + item.productName + '</div><div class="text-xs text-[var(--muted)]">' + desc + '</div></div><div class="text-right shrink-0"><div class="text-sm font-bold text-white">' + formatPrice(item.price * item.quantity) + '</div><div class="text-xs text-[var(--muted)]">x' + item.quantity + '</div></div></div>';
      });
      var html = '<div class="space-y-4"><div class="grid grid-cols-2 gap-4 p-3 rounded-lg" style="background:var(--bg);"><div><span class="text-xs text-[var(--muted)]">Mã đơn hàng</span><div class="font-display font-bold text-[var(--accent)]">' + order.id + '</div></div><div><span class="text-xs text-[var(--muted)]">Ngày đặt</span><div class="text-sm font-medium text-white">' + order.date + '</div></div><div><span class="text-xs text-[var(--muted)]">Khách hàng</span><div class="text-sm font-medium text-white">' + order.name + '</div></div><div><span class="text-xs text-[var(--muted)]">Email</span><div class="text-sm text-[var(--muted)]">' + order.customerEmail + '</div></div><div><span class="text-xs text-[var(--muted)]">SĐT</span><div class="text-sm text-white">' + (order.phone || '-') + '</div></div><div><span class="text-xs text-[var(--muted)]">Thanh toán</span><div class="text-sm text-white">' + payLabel + '</div></div></div><div><span class="text-xs text-[var(--muted)]">Địa chỉ giao hàng</span><div class="text-sm text-white mt-1 p-2 rounded" style="background:var(--bg);">' + (order.address || '-') + '</div></div><div><span class="text-xs text-[var(--muted)] block mb-2">Chi tiết sản phẩm</span>' + itemsHtml + '</div><div class="flex items-center justify-between pt-2 border-t border-[var(--border)]"><span class="font-semibold text-white">Tổng cộng:</span><span class="font-display text-2xl font-bold" style="color:var(--accent);">' + formatPrice(order.total) + '</span></div></div>';
      document.getElementById('detail-content').innerHTML = html;
      document.getElementById('detail-modal').classList.add('active');
    }

    function closeDetailModal() { document.getElementById('detail-modal').classList.remove('active'); }

    function filterUsers() {
      var q = document.getElementById('search-user').value.toLowerCase();
      var filtered = allAccounts.filter(function(u) { return u.name.toLowerCase().indexOf(q) !== -1 || u.email.toLowerCase().indexOf(q) !== -1; });
      renderUsers(filtered);
    }

    function filterOrders() {
      var q = document.getElementById('search-order').value.toLowerCase();
      var filtered = allOrders.filter(function(o) { return o.id.toLowerCase().indexOf(q) !== -1 || o.name.toLowerCase().indexOf(q) !== -1 || o.customerEmail.toLowerCase().indexOf(q) !== -1; });
      renderOrders(filtered);
    }

    document.addEventListener('DOMContentLoaded', function() {
  var modal = document.getElementById('detail-modal');
  if (modal) {
    modal.addEventListener('click', function(e) {
      if (e.target === this) closeDetailModal();
    });
  }

  /* Chỉ load dữ liệu khi đã đăng nhập */
  if (sessionStorage.getItem('ht_admin_ok') === '1') loadData();
});

    document.addEventListener('DOMContentLoaded', function() {
      /* Chỉ load dữ liệu khi đã đăng nhập */
      if (sessionStorage.getItem('ht_admin_ok') === '1') loadData();
    });