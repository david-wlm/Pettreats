const products = [
  {
    id: "chicken-berry",
    name: "莓果鸡胸训练粒",
    category: "鸡肉",
    price: 39,
    monthlySales: 2550,
    spec: "80g / 袋",
    tagline: "低脂小粒，适合外出训练和日常奖励。",
    ingredients: "鸡胸肉、蔓越莓、南瓜粉、少量亚麻籽",
    suitableFor: "犬猫通用，3 个月以上",
    palatability: "软硬适中，小型犬和猫咪也容易咀嚼",
    image: "assets/product-chicken.png"
  },
  {
    id: "freeze-salmon",
    name: "三文鱼冻干脆粒",
    category: "冻干",
    price: 56,
    monthlySales: 1820,
    spec: "60g / 罐",
    tagline: "高蛋白冻干，拌粮或单独奖励都顺手。",
    ingredients: "三文鱼、鸡蛋黄、少量鱼油",
    suitableFor: "猫咪、成犬、需要蛋白补给的宠物",
    palatability: "香气明显，适合挑嘴宠物尝鲜",
    image: "assets/product-freeze-dried.png"
  },
  {
    id: "dental-herb",
    name: "草本洁齿咀嚼棒",
    category: "洁齿",
    price: 42,
    monthlySales: 1360,
    spec: "7 支 / 盒",
    tagline: "纤维质地更耐嚼，帮助日常口气管理。",
    ingredients: "豌豆纤维、薄荷叶粉、欧芹粉、鸡肉粉",
    suitableFor: "中小型犬，6 个月以上",
    palatability: "淡草本香，适合饭后咀嚼",
    image: "assets/product-dental.png"
  },
  {
    id: "training-duck",
    name: "鸭肉南瓜奖励方",
    category: "训练奖励",
    price: 35,
    monthlySales: 2140,
    spec: "90g / 袋",
    tagline: "一口大小不掉渣，适合训练频繁给食。",
    ingredients: "鸭胸肉、南瓜、燕麦、椰子粉",
    suitableFor: "犬类，尤其适合训练期宠物",
    palatability: "香味温和，连续奖励也不容易腻",
    image: "assets/product-training.png"
  },
  {
    id: "chicken-cheese",
    name: "鸡肉羊奶酪小方",
    category: "鸡肉",
    price: 46,
    monthlySales: 980,
    spec: "75g / 盒",
    tagline: "鸡肉搭配羊奶酪，口感柔软浓郁。",
    ingredients: "鸡胸肉、羊奶酪、蛋黄粉、马铃薯淀粉",
    suitableFor: "幼犬、成犬、老年犬",
    palatability: "奶香明显，适合需要柔软口感的宠物",
    image: "assets/product-chicken-cheese.png"
  },
  {
    id: "freeze-beef",
    name: "牛肉冻干能量块",
    category: "冻干",
    price: 62,
    monthlySales: 760,
    spec: "70g / 罐",
    tagline: "肉香扎实，适合运动后或拌粮加餐。",
    ingredients: "牛肉、牛肝、少量蛋黄粉",
    suitableFor: "犬类，活动量较高的宠物",
    palatability: "肉香浓，适合高奖励价值场景",
    image: "assets/product-beef.png"
  },
  {
    id: "dental-pumpkin",
    name: "南瓜洁齿软棒",
    category: "洁齿",
    price: 38,
    monthlySales: 1180,
    spec: "10 支 / 袋",
    tagline: "比硬棒更温和，适合咀嚼力一般的小型犬。",
    ingredients: "南瓜泥、豌豆蛋白、苹果纤维、欧芹粉",
    suitableFor: "小型犬、老年犬",
    palatability: "柔韧不粘牙，饭后奖励友好",
    image: "assets/product-pumpkin.png"
  },
  {
    id: "training-fish",
    name: "金枪鱼训练薄片",
    category: "训练奖励",
    price: 49,
    monthlySales: 1570,
    spec: "65g / 袋",
    tagline: "薄片易掰开，猫咪和小型犬都能快速入口。",
    ingredients: "金枪鱼、鸡胸肉、海藻粉",
    suitableFor: "猫咪、小型犬",
    palatability: "鲜味强，适合召回和互动训练",
    image: "assets/product-fish.png"
  }
];

const categories = ["全部", "鸡肉", "冻干", "洁齿", "训练奖励"];
const state = {
  activeCategory: "全部",
  selectedProductId: null,
  hotlistIds: [],
  cart: []
};

const filtersEl = document.querySelector("#filters");
const productGridEl = document.querySelector("#productGrid");
const cartPanelEl = document.querySelector("#cartPanel");
const cartItemsEl = document.querySelector("#cartItems");
const cartCountEl = document.querySelector("#cartCount");
const cartTotalEl = document.querySelector("#cartTotal");
const checkoutButton = document.querySelector("#checkoutButton");
const detailModalEl = document.querySelector("#detailModal");
const hotlistModalEl = document.querySelector("#hotlistModal");
const hotlistItemsEl = document.querySelector("#hotlistItems");
const hotlistSummaryEl = document.querySelector("#hotlistSummary");
const successModalEl = document.querySelector("#successModal");
const toastEl = document.querySelector("#toast");
const detailAddButton = document.querySelector("#detailAddButton");
let toastTimer;

function yuan(value) {
  return `¥${value}`;
}

function getProduct(id) {
  return products.find(product => product.id === id);
}

function getHotlistProducts() {
  return [...products]
    .sort((a, b) => b.monthlySales - a.monthlySales)
    .slice(0, 5);
}

function getCartQuantity() {
  return state.cart.reduce((sum, item) => sum + item.quantity, 0);
}

function getCartTotal() {
  return state.cart.reduce((sum, item) => {
    const product = getProduct(item.id);
    return sum + product.price * item.quantity;
  }, 0);
}

function renderFilters() {
  filtersEl.innerHTML = categories.map(category => `
    <button
      class="filter-button ${category === state.activeCategory ? "active" : ""}"
      type="button"
      data-category="${category}"
    >${category}</button>
  `).join("");
}

function renderProducts() {
  const visibleProducts = products.filter(product => {
    return state.activeCategory === "全部" || product.category === state.activeCategory;
  });

  productGridEl.innerHTML = visibleProducts.map(product => `
    <article class="product-card">
      <img src="${product.image}" alt="${product.name}">
      <div class="product-body">
        <div class="product-meta">
          <span class="product-category">${product.category}</span>
          <strong class="product-price">${yuan(product.price)}</strong>
        </div>
        <h3>${product.name}</h3>
        <div class="product-sales">月销：${product.monthlySales}</div>
        <p>${product.tagline}</p>
        <div class="product-actions">
          <button class="button ghost" type="button" data-detail="${product.id}">查看详情</button>
          <button class="button primary" type="button" data-add="${product.id}">加入购物车</button>
        </div>
      </div>
    </article>
  `).join("");
}

function renderCart() {
  const total = getCartTotal();
  const quantity = getCartQuantity();

  cartCountEl.textContent = quantity;
  cartTotalEl.textContent = yuan(total);
  checkoutButton.disabled = state.cart.length === 0;
  checkoutButton.textContent = state.cart.length === 0 ? "购物车为空" : "模拟下单";

  if (state.cart.length === 0) {
    cartItemsEl.innerHTML = `
      <div class="empty-cart">
        <p>购物车里还没有零食。<br>先为小家伙挑一袋喜欢的吧。</p>
      </div>
    `;
    return;
  }

  cartItemsEl.innerHTML = state.cart.map(item => {
    const product = getProduct(item.id);
    return `
      <article class="cart-item">
        <img src="${product.image}" alt="${product.name}">
        <div>
          <h3>${product.name}</h3>
          <p>${product.spec} · ${yuan(product.price)}</p>
          <div class="cart-row">
            <div class="qty-control" aria-label="${product.name} 数量">
              <button type="button" data-dec="${product.id}" aria-label="减少数量">−</button>
              <span>${item.quantity}</span>
              <button type="button" data-inc="${product.id}" aria-label="增加数量">+</button>
            </div>
            <button class="remove-button" type="button" data-remove="${product.id}">删除</button>
          </div>
        </div>
      </article>
    `;
  }).join("");
}

function addToCart(id) {
  const item = state.cart.find(entry => entry.id === id);
  if (item) {
    item.quantity += 1;
  } else {
    state.cart.push({ id, quantity: 1 });
  }
  renderCart();
}

function changeQuantity(id, delta) {
  const item = state.cart.find(entry => entry.id === id);
  if (!item) return;

  item.quantity += delta;
  if (item.quantity <= 0) {
    state.cart = state.cart.filter(entry => entry.id !== id);
  }
  renderCart();
}

function removeFromCart(id) {
  state.cart = state.cart.filter(item => item.id !== id);
  renderCart();
}

function showToast(message, anchor) {
  window.clearTimeout(toastTimer);
  toastEl.textContent = message;
  toastEl.style.left = "";
  toastEl.style.top = "";
  toastEl.style.right = "";
  toastEl.style.bottom = "";
  toastEl.classList.add("show");

  if (anchor) {
    const anchorRect = anchor.getBoundingClientRect();
    const toastRect = toastEl.getBoundingClientRect();
    const gap = 10;
    const left = Math.min(
      Math.max(16, anchorRect.left + (anchorRect.width - toastRect.width) / 2),
      window.innerWidth - toastRect.width - 16
    );
    const top = anchorRect.top >= toastRect.height + gap + 16
      ? anchorRect.top - toastRect.height - gap
      : anchorRect.bottom + gap;

    toastEl.style.left = `${left}px`;
    toastEl.style.top = `${Math.min(top, window.innerHeight - toastRect.height - 16)}px`;
  }

  toastTimer = window.setTimeout(() => {
    toastEl.classList.remove("show");
  }, 2200);
}

function setPanelOpen(panel, isOpen) {
  panel.classList.toggle("open", isOpen);
  panel.setAttribute("aria-hidden", String(!isOpen));
  document.body.style.overflow = document.querySelector(".cart-panel.open, .modal-shell.open") ? "hidden" : "";
}

function openCart() {
  setPanelOpen(cartPanelEl, true);
}

function closeCart() {
  setPanelOpen(cartPanelEl, false);
}

function openDetail(id) {
  const product = getProduct(id);
  state.selectedProductId = id;

  document.querySelector("#detailImage").src = product.image;
  document.querySelector("#detailImage").alt = product.name;
  document.querySelector("#detailCategory").textContent = product.category;
  document.querySelector("#detailTitle").textContent = product.name;
  document.querySelector("#detailTagline").textContent = product.tagline;
  document.querySelector("#detailSpec").textContent = product.spec;
  document.querySelector("#detailSuitable").textContent = product.suitableFor;
  document.querySelector("#detailPalatability").textContent = product.palatability;
  document.querySelector("#detailIngredients").textContent = product.ingredients;
  document.querySelector("#detailPrice").textContent = yuan(product.price);

  setPanelOpen(detailModalEl, true);
}

function closeDetail() {
  setPanelOpen(detailModalEl, false);
}

function renderHotlist() {
  const hotlistProducts = getHotlistProducts();
  state.hotlistIds = hotlistProducts.map(product => product.id);
  hotlistSummaryEl.textContent = `按月销排序，精选前 5 款，总月销 ${hotlistProducts.reduce((sum, product) => sum + product.monthlySales, 0)}。`;

  hotlistItemsEl.innerHTML = hotlistProducts.map((product, index) => `
    <article class="hotlist-item">
      <span class="hotlist-rank">#${index + 1}</span>
      <img src="${product.image}" alt="${product.name}">
      <div class="hotlist-body">
        <div class="hotlist-meta">
          <span class="product-category">${product.category}</span>
          <strong class="product-price">${yuan(product.price)}</strong>
        </div>
        <h3>${product.name}</h3>
        <div class="product-sales">月销：${product.monthlySales}</div>
        <p>${product.tagline}</p>
        <dl class="hotlist-detail-list">
          <div>
            <dt>规格</dt>
            <dd>${product.spec}</dd>
          </div>
          <div>
            <dt>适用</dt>
            <dd>${product.suitableFor}</dd>
          </div>
          <div>
            <dt>适口性</dt>
            <dd>${product.palatability}</dd>
          </div>
          <div>
            <dt>成分</dt>
            <dd>${product.ingredients}</dd>
          </div>
        </dl>
        <div class="hotlist-actions">
          <button class="button primary" type="button" data-hot-add="${product.id}">加入购物车</button>
        </div>
      </div>
    </article>
  `).join("");
}

function openHotlist() {
  renderHotlist();
  setPanelOpen(hotlistModalEl, true);
}

function closeHotlist() {
  setPanelOpen(hotlistModalEl, false);
}

function checkout() {
  if (state.cart.length === 0) return;
  state.cart = [];
  renderCart();
  closeCart();
  setPanelOpen(successModalEl, true);
}

function bindEvents() {
  filtersEl.addEventListener("click", event => {
    const button = event.target.closest("[data-category]");
    if (!button) return;
    state.activeCategory = button.dataset.category;
    renderFilters();
    renderProducts();
  });

  productGridEl.addEventListener("click", event => {
    const addButton = event.target.closest("[data-add]");
    const detailButton = event.target.closest("[data-detail]");
    if (addButton) {
      addToCart(addButton.dataset.add);
      openCart();
    }
    if (detailButton) {
      openDetail(detailButton.dataset.detail);
    }
  });

  hotlistItemsEl.addEventListener("click", event => {
    const addButton = event.target.closest("[data-hot-add]");
    if (addButton) {
      addToCart(addButton.dataset.hotAdd);
      showToast("加入购物车成功", addButton);
    }
  });

  cartItemsEl.addEventListener("click", event => {
    const incButton = event.target.closest("[data-inc]");
    const decButton = event.target.closest("[data-dec]");
    const removeButton = event.target.closest("[data-remove]");
    if (incButton) changeQuantity(incButton.dataset.inc, 1);
    if (decButton) changeQuantity(decButton.dataset.dec, -1);
    if (removeButton) removeFromCart(removeButton.dataset.remove);
  });

  document.querySelectorAll("[data-open-cart]").forEach(button => {
    button.addEventListener("click", openCart);
  });

  document.querySelectorAll("[data-open-hotlist]").forEach(button => {
    button.addEventListener("click", openHotlist);
  });

  document.querySelectorAll("[data-close-cart]").forEach(button => {
    button.addEventListener("click", closeCart);
  });

  document.querySelectorAll("[data-close-hotlist]").forEach(button => {
    button.addEventListener("click", closeHotlist);
  });

  document.querySelectorAll("[data-close-detail]").forEach(button => {
    button.addEventListener("click", closeDetail);
  });

  document.querySelectorAll("[data-close-success]").forEach(button => {
    button.addEventListener("click", () => setPanelOpen(successModalEl, false));
  });

  detailAddButton.addEventListener("click", () => {
    if (!state.selectedProductId) return;
    addToCart(state.selectedProductId);
    closeDetail();
    openCart();
  });

  checkoutButton.addEventListener("click", checkout);

  document.addEventListener("keydown", event => {
    if (event.key !== "Escape") return;
    closeCart();
    closeHotlist();
    closeDetail();
    setPanelOpen(successModalEl, false);
  });
}

renderFilters();
renderProducts();
renderCart();
bindEvents();
