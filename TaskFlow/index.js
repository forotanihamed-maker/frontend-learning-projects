/* ============================================================
   TaskFlow — index.js
   ============================================================ */

// ---------- Storage key ----------
const STORAGE_KEY = "tasks";

// ---------- State ----------
let tasks = [];

// ---------- DOM ----------
const statTotal = document.getElementById("stat-total");
const statPending = document.getElementById("stat-pending");
const statProgress = document.getElementById("stat-progress");
const statCompleted = document.getElementById("stat-completed");
const grid = document.getElementById("tasks-grid");
const noResults = document.getElementById("no-results");
const newTaskBtn = document.getElementById("new-task-btn");
const taskFormClose = document.getElementById("task-form-close");
const overlay = document.getElementById("task-form-overlay");
const taskForm = document.getElementById("task-form");
const filterStatus = document.getElementById("filter-status");
const filterPriority = document.getElementById("filter-priority");
const filterCategory = document.getElementById("filter-category");
const searchInput = document.getElementById("search-input");
const modalTitle = document.getElementById("modal-title");
const submitBtn = document.getElementById("submit-task");
let currentStatus = "all";
let currentPriority = "all";
let currentCategory = "all";
let searchTerm = "";
let editingId = null;
/* ============================================================
   Storage
   ============================================================ */

function loadTasks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.warn("Failed to load tasks:", err);
    return [];
  }
}

function saveTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

/* ============================================================
   Seed (فقط بار اول)
   ============================================================ */

function seedIfEmpty() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw) return; // قبلاً ذخیره شده — دست نزن

  const seedTask = {
    id: Date.now(),
    title: "Build homepage",
    description: "Create the homepage UI",
    category: "development",
    priority: "high",
    dueDate: "2026-09-28",
    status: "pending",
  };

  tasks = [seedTask];
  saveTasks();
}

/* ============================================================
   Stats
   ============================================================ */

function updateStats() {
  const total = tasks.length;
  const pending = tasks.filter((t) => t.status === "pending").length;
  const progress = tasks.filter((t) => t.status === "progress").length;
  const completed = tasks.filter((t) => t.status === "completed").length;

  statTotal.innerText = total;
  statPending.innerText = pending;
  statProgress.innerText = progress;
  statCompleted.innerText = completed;
}

/* ============================================================
   Helpers
   ============================================================ */

function statusLabel(status) {
  const labels = {
    pending: "Pending",
    progress: "In Progress",
    completed: "Completed",
  };
  return labels[status] || status;
}

function categoryLabel(category) {
  const labels = {
    development: "Development",
    design: "Design",
    marketing: "Marketing",
    personal: "Personal",
  };
  return labels[category] || category;
}

function formatDate(isoDate) {
  if (!isoDate) return "No due date";

  const date = new Date(isoDate);
  if (isNaN(date)) return isoDate;

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/* ============================================================
   Render
   ============================================================ */

function renderTasks(list = tasks) {
  if (list.length === 0) {
    grid.innerHTML = "";
    noResults.hidden = false;
    return;
  }

  noResults.hidden = true;

  grid.innerHTML = list
    .map(
      (task) => `
      <div class="task-card">
        <div class="task-card__header">
          <h3 class="task-card__title">${task.title}</h3>
          <button class="badge badge--${task.status}" data-id="${task.id}">
           ${statusLabel(task.status)}
           </button>
        </div>

        <p class="task-card__desc">
          ${task.description || "No description"}
        </p>

        <div class="task-card__meta">
          <span class="task-card__category">${categoryLabel(
            task.category
          )}</span>
          <span class="task-card__due">${formatDate(task.dueDate)}</span>
        </div>

        <div class="task-card__actions">
          <button class="task-card__btn task-card__btn--edit" data-id="${
            task.id
          }">Edit</button>
          <button class="task-card__btn task-card__btn--delete" data-id="${
            task.id
          }">Delete</button>
        </div>
      </div>
    `
    )
    .join("");
}

// New Task
function openModal() {
  overlay.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  overlay.classList.remove("active");
  document.body.style.overflow = "";

  // ریست فرم و حالت
  taskForm.reset();
  editingId = null;
  modalTitle.textContent = "New Task";
  submitBtn.textContent = "Save Task";
}
newTaskBtn.addEventListener("click", openModal);
taskFormClose.addEventListener("click", closeModal);

// بستن با کلیک روی پس‌زمینه (نه روی موال)
overlay.addEventListener("click", (e) => {
  if (e.target === overlay) closeModal();
});

// بستن با Escape
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && overlay.classList.contains("active")) {
    closeModal();
  }
});
// Add Task
taskForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const data = {
    title: document.getElementById("task-title").value.trim(),
    description: document.getElementById("task-description").value.trim(),
    category: document.getElementById("task-category").value,
    priority: document.getElementById("task-priority").value,
    dueDate: document.getElementById("task-due-date").value,
  };

  if (editingId === null) {
    // Create
    tasks.push({
      id: Date.now(),
      status: "pending",
      ...data,
    });
  } else {
    // Update
    const task = tasks.find((t) => t.id === editingId);
    if (task) {
      Object.assign(task, data);
    }
  }

  saveTasks();
  updateStats();
  applyFilters();
  closeModal();
});
// filters

filterStatus.addEventListener("change", function (event) {
  currentStatus = event.target.value;
  applyFilters();
});
filterPriority.addEventListener("change", function (event) {
  currentPriority = event.target.value;
  applyFilters();
});
filterCategory.addEventListener("change", function (event) {
  currentCategory = event.target.value;
  applyFilters();
});
searchInput.addEventListener("input", function (event) {
  searchTerm = event.target.value;
  applyFilters();
});

function applyFilters() {
  const filters = tasks.filter((task) => {
    const matchesStatus =
      currentStatus === "all" || task.status === currentStatus;
    const matchesPriorities =
      currentPriority === "all" || task.priority === currentPriority;
    const matchesCategories =
      currentCategory === "all" || task.category === currentCategory;
    const matchesSearch = task.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return (
      matchesStatus && matchesPriorities && matchesCategories && matchesSearch
    );
  });
  renderTasks(filters);
}
/* ============================================================
   Delete
   ============================================================ */

function deleteTask(id) {
  const confirmed = confirm("Are you sure you want to delete this task?");
  if (!confirmed) return;

  tasks = tasks.filter((task) => task.id !== id);
  saveTasks();
  updateStats();
  applyFilters(); // ← به‌جای renderTasks چون فیلترها باید حفظ بشن
}
/* ============================================================
   Change Status
   ============================================================ */

const STATUS_CYCLE = ["pending", "progress", "completed"];

function nextStatus(current) {
  const index = STATUS_CYCLE.indexOf(current);
  if (index === -1) return STATUS_CYCLE[0];
  if (index === STATUS_CYCLE.length - 1) return current; // completed → completed
  return STATUS_CYCLE[index + 1];
}

function changeStatus(id) {
  const task = tasks.find((t) => t.id === id);
  if (!task) return;

  task.status = nextStatus(task.status);

  saveTasks();
  updateStats();
  applyFilters();
}
/* ============================================================
   Edit
   ============================================================ */

function startEdit(id) {
  const task = tasks.find((t) => t.id === id);
  if (!task) return;

  editingId = id;

  document.getElementById("task-title").value = task.title;
  document.getElementById("task-description").value = task.description;
  document.getElementById("task-category").value = task.category;
  document.getElementById("task-priority").value = task.priority;
  document.getElementById("task-due-date").value = task.dueDate;

  modalTitle.textContent = "Edit Task";
  submitBtn.textContent = "Update Task";

  openModal();
}

grid.addEventListener("click", function (e) {
  // Delete
  const deleteBtn = e.target.closest(".task-card__btn--delete");
  if (deleteBtn) {
    const id = Number(deleteBtn.dataset.id);
    deleteTask(id);
    return;
  }

  // Change Status
  const badge = e.target.closest(".badge");
  if (badge) {
    const id = Number(badge.dataset.id);
    changeStatus(id);
    return;
  }
  // Edit
  const editBtn = e.target.closest(".task-card__btn--edit");
  if (editBtn) {
    startEdit(Number(editBtn.dataset.id));
    return;
  }
});
/* ============================================================
   Init
   ============================================================ */

function init() {
  seedIfEmpty();
  tasks = loadTasks();
  updateStats();
  renderTasks(tasks);
}

init();
