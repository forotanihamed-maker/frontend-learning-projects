/* =========================================================
   ۱. داده‌ها و State
========================================================= */

// ----- داده‌ی محصولات -----
const products = [
  {
    id: 1,
    name: "Running Shoes",
    price: 89,
    category: "shoes",
    image: "./images/running-shoes.jpg",
    description: "Lightweight shoes built for speed and comfort.",
  },
  {
    id: 2,
    name: "Trail Sneakers",
    price: 120,
    category: "shoes",
    image: "./images/trail-sneakers.jpg",
    description: "Durable grip for off-road running.",
  },
  {
    id: 3,
    name: "Adjustable Dumbbells",
    price: 150,
    category: "equipment",
    image: "./images/dumbbells.jpg",
    description: "Space-saving dumbbells, 5 to 25kg.",
  },
  {
    id: 4,
    name: "Yoga Mat",
    price: 35,
    category: "equipment",
    image: "./images/yoga-mat.jpg",
    description: "Non-slip mat for yoga and stretching.",
  },
  {
    id: 5,
    name: "Sports Bag",
    price: 45,
    category: "accessories",
    image: "./images/sports-bag.jpg",
    description: "Roomy gym bag with shoe compartment.",
  },
  {
    id: 6,
    name: "Water Bottle",
    price: 18,
    category: "accessories",
    image: "./images/water-bottle.jpg",
    description: "Insulated bottle, keeps drinks cold 24h.",
  },
];

// ----- State سبد خرید (از localStorage بازیابی میشه) -----
let savedCarts = localStorage.getItem("carts");
let carts = savedCarts ? JSON.parse(savedCarts) : [];

// ----- State فیلتر و جستجوی محصولات -----
let currentCategory = "all";
let searchTerm = "";

// ----- State مودال جزئیات محصول -----
let currentProduct = null; // محصولی که الان تو Modal بازه

/* =========================================================
   ۲. ارجاع به عناصر DOM
========================================================= */

// ----- محصولات / نوار جستجو و فیلتر -----
let productsGrid = document.getElementById("products-grid");
let searchInput = document.getElementById("search-input");
let selectCategory = document.getElementById("filter");

// ----- سبد خرید -----
const cartBtn = document.getElementById("cart-btn");
const overlay = document.getElementById("overlay");
const cartClose = document.getElementById("cart-close");
const sabadItems = document.getElementById("sabad-items");
const clearBtn = document.getElementById("clear-cart");

// ----- مودال جزئیات محصول -----
const detailsOverlay = document.getElementById("details-overlay");
const detailsClose = document.getElementById("details-close");

// همون لحظه‌ی لود صفحه، شمارنده‌ی سبد خرید رو با مقدار واقعی هماهنگ کن
document.getElementById("cart-count").textContent = carts.length;

/* =========================================================
   ۳. محصولات: رندر، فیلتر/جستجو، و کلیک‌های داخل کارت
========================================================= */

function renderProducts(list) {
  const grid = document.getElementById("products-grid");
  const noResults = document.getElementById("no-results");

  if (list.length === 0) {
    grid.innerHTML = "";
    noResults.hidden = false;
    return;
  }

  noResults.hidden = true;

  grid.innerHTML = list
    .map(
      (product) => `
      <article class="product-card" data-id="${product.id}">
        <img src="${product.image}" alt="${product.name}" class="product-img" />
        <div class="product-info">
          <h3>${product.name}</h3>
          <span class="product-category">${product.category}</span>
          <p class="product-price">$${product.price}</p>
          <p class="product-desc">${product.description}</p>
          <div class="product-actions">
            <button class="btn-details" data-id="${product.id}">View Details</button>
            <button class="btn-add" data-id="${product.id}">Add to Cart</button>
          </div>
        </div>
      </article>
    `
    )
    .join("");
}

function applyFilters() {
  const filtered = products.filter((item) => {
    const matchesCategory =
      currentCategory === "all" || item.category === currentCategory;
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  renderProducts(filtered);
}

// اولین بار که صفحه لود میشه، همه محصولات رو نشون بده
applyFilters();

searchInput.addEventListener("input", function (event) {
  searchTerm = event.target.value;
  applyFilters();
});

selectCategory.addEventListener("change", function (event) {
  currentCategory = event.target.value;
  applyFilters();
});

// کلیک روی دکمه‌های داخل کارت‌های داینامیک (View Details / Add to Cart)
productsGrid.addEventListener("click", function (event) {
  if (event.target.classList.contains("btn-details")) {
    const id = event.target.dataset.id;
    currentProduct = products.find(function (item) {
      return item.id == id;
    });
    openModal();
  } else if (event.target.classList.contains("btn-add")) {
    const id = event.target.dataset.id;
    let cart = products.find(function (product) {
      return product.id == id;
    });
    carts.push(cart);

    localStorage.setItem("carts", JSON.stringify(carts));
    document.getElementById("cart-count").textContent = carts.length;
  }
});

/* =========================================================
   ۴. سبد خرید: رندر، باز/بسته شدن، حذف، خالی کردن
========================================================= */

function renderCart() {
  savedCarts = localStorage.getItem("carts");
  carts = savedCarts ? JSON.parse(savedCarts) : [];
  if (carts.length === 0) {
    sabadItems.innerHTML = "Your cart is empty.";
  } else {
    sabadItems.innerHTML = carts
      .map(
        (product) =>
          `<div class="sabad-item">
          <span class="sabad-name">${product.name}</span>
            <span class="sabad-price">$${product.price}</span>
            <button class="remove" data-id="${product.id}">Remove</button>
        </div>
      `
      )
      .join("");
  }
  const total = carts.reduce(function (sum, item) {
    return sum + item.price;
  }, 0);
  document.getElementById("sabad-total").textContent = `Total: $${total}`;
}

function openCart() {
  overlay.classList.add("active");
  document.body.style.overflow = "hidden";
  renderCart();
}

function closeCart() {
  overlay.classList.remove("active");
  document.body.style.overflow = "";
}

cartBtn.addEventListener("click", openCart);
cartClose.addEventListener("click", closeCart);

// بستن با کلیک روی پس‌زمینه (نه روی sabad)
overlay.addEventListener("click", (e) => {
  if (e.target === overlay) closeCart();
});

// بستن با Escape
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && overlay.classList.contains("active")) {
    closeCart();
  }
});

// حذف یک آیتم مشخص از سبد خرید
sabadItems.addEventListener("click", function (e) {
  if (e.target.classList.contains("remove")) {
    const id = e.target.dataset.id;
    savedCarts = localStorage.getItem("carts");
    carts = savedCarts ? JSON.parse(savedCarts) : [];
    const index = carts.findIndex(function (product) {
      return product.id == id;
    });
    const first = carts.slice(0, index);
    const end = carts.slice(index + 1, carts.length);
    carts = first.concat(end);
    localStorage.setItem("carts", JSON.stringify(carts));
    renderCart();
    document.getElementById("cart-count").textContent = carts.length;
  }
});

// خالی کردن کامل سبد خرید
clearBtn.addEventListener("click", function () {
  carts = [];
  localStorage.setItem("carts", JSON.stringify(carts));
  renderCart();
  document.getElementById("cart-count").textContent = carts.length;
});

/* =========================================================
   ۵. مودال جزئیات محصول: رندر، باز/بسته شدن، افزودن به سبد
========================================================= */

function renderModal() {
  document.getElementById("details-img").src = currentProduct.image;
  document.getElementById("details-name").textContent = currentProduct.name;
  document.getElementById("details-desc").textContent =
    currentProduct.description;
  document.getElementById("details-category").textContent =
    currentProduct.category;
  document.getElementById("details-price").textContent = currentProduct.price;
}

function openModal() {
  detailsOverlay.classList.add("active");
  document.body.style.overflow = "hidden";
  renderModal();
}

function closeModal() {
  detailsOverlay.classList.remove("active");
  document.body.style.overflow = "";
}

detailsClose.addEventListener("click", closeModal);

// افزودن محصولِ درحال‌نمایش در مودال، به سبد خرید
document.getElementById("details-add").addEventListener("click", function () {
  carts.push(currentProduct);
  localStorage.setItem("carts", JSON.stringify(carts));
  document.getElementById("cart-count").textContent = carts.length;
});

// بستن با Escape
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && detailsOverlay.classList.contains("active")) {
    closeModal();
  }
});

// بستن با کلیک روی پس‌زمینه
detailsOverlay.addEventListener("click", (e) => {
  if (e.target === detailsOverlay) closeModal();
});
