# 🛒 Sportify — Interactive Sports Store

An interactive online sports store front-end built with **vanilla JavaScript**. Browse products, search and filter them, view details in a modal, and manage a shopping cart that is saved in the browser.

> Train Hard. Play Better.

## 📖 About

Sportify is a practice project for learning DOM manipulation, event handling, and browser storage. All products are rendered dynamically from a JavaScript array, and the cart persists between visits using `localStorage`.

## ✨ Features

- **Dynamic product rendering** from a JavaScript data array (6 products in 3 categories: shoes, equipment, accessories)
- **Live search** by product name
- **Category filter** (All / Shoes / Equipment / Accessories), combined with search
- **"No products found"** empty state
- **Product details modal** with image, description, category, and price
- **Shopping cart panel** with:
  - Add to cart (from the card or from the modal)
  - Remove a single item
  - Clear the whole cart
  - Live cart counter in the header and automatic total price
- **Cart persistence** with `localStorage` — your cart is still there after a page refresh
- **Close overlays** by clicking the background, the close button, or pressing `Esc`
- **Event delegation** for dynamically generated buttons
- Responsive layout with CSS

## 🛠️ Built With

- HTML5
- CSS3
- JavaScript (ES6+): `Array.map / filter / find / reduce`, template literals, event delegation
- Web Storage API (`localStorage`)
- [normalize.css](https://necolas.github.io/normalize.css/)

## 📁 Project Structure

```
Interactive Sports Store/
├── index.html
├── index.js
├── css/
│   ├── normalize.css
│   └── style.css
└── images/
    └── hero.jpg
```

> **Note:** Product images (e.g. `running-shoes.jpg`, `yoga-mat.jpg`) are referenced in `index.js` and should be placed in the `images/` folder.

## 🚀 Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/<your-username>/Interactive-Sports-Store.git
   ```
2. Open `index.html` in your browser (or use a tool like the VS Code *Live Server* extension).

## 🎯 What I Learned

- Rendering UI from data with `map()` and template literals
- Combining search and filter logic in a single function
- Managing state (cart, filters, selected product) in plain JavaScript
- Persisting data with `localStorage`
- Handling clicks on dynamic elements with event delegation
- Building accessible-feeling modals and overlays (Esc key, click outside to close)

## 🔮 Possible Improvements

- Quantity controls instead of repeated cart entries
- Checkout flow
- Sorting by price
- Escaping/sanitizing rendered text and better accessibility (focus trapping in modals)

## 👤 Author

**Hamed Foroutani**
GitHub: [@forotanihamed-maker](https://github.com/forotanihamed-maker)
