# ✅ TaskFlow

A simple and clean **task management app** built with vanilla JavaScript. Create, edit, filter, and track your tasks — everything is saved in your browser, no backend needed.

## 📖 About

TaskFlow is a practice project for learning full CRUD operations (Create, Read, Update, Delete) on the front end, working with forms, and persisting data using `localStorage`.

## ✨ Features

- **Create tasks** with title, description, category, priority, and due date
- **Edit** existing tasks using the same form
- **Delete** tasks (with a confirmation dialog)
- **Status workflow:** click a task's status badge to move it forward — `Pending → In Progress → Completed`
- **Live statistics** dashboard: Total, Pending, In Progress, Completed
- **Search** tasks by title
- **Filter** by status, priority, and category — all filters work together with search
- **Empty state** message when no task matches
- **Persistent data** with `localStorage` (a sample task is added on first launch)
- Modal form that closes with the ✕ button, by clicking outside, or with `Esc`
- Responsive layout with CSS

## 🛠️ Built With

- HTML5 (form elements, modal with `role="dialog"`, ARIA labels)
- CSS3 (BEM-style class naming, responsive design)
- JavaScript (ES6+): array methods, spread/`Object.assign`, template literals, event delegation
- Web Storage API (`localStorage`)
- [normalize.css](https://necolas.github.io/normalize.css/)

## 📁 Project Structure

```
TaskFlow/
├── index.html
├── index.js
└── css/
    ├── normalize.css
    └── style.css
```

## 🚀 Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/<your-username>/TaskFlow.git
   ```
2. Open `index.html` in your browser (or use the VS Code *Live Server* extension).
3. Click **+ New Task** and start organizing your work!

## 🎯 What I Learned

- Implementing full CRUD logic with plain JavaScript
- Reusing one form for both creating and editing
- Keeping UI, state, and storage in sync after every change
- Combining multiple filters and search in one function
- Writing cleaner CSS with BEM-style naming

## 🔮 Possible Improvements

- Drag and drop between status columns (Kanban view)
- Overdue task highlighting
- Sorting by due date or priority
- Dark mode
- Escaping user input before rendering it as HTML

## 👤 Author

**Hamed Foroutani**
GitHub: [@forotanihamed-maker](https://github.com/forotanihamed-maker)
