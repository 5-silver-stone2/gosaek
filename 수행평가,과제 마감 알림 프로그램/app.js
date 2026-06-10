const STORAGE_KEYS = {
  tasks: "deadlinePlanner.tasks.v1",
  memos: "deadlinePlanner.memos.v1"
};

const state = {
  tasks: loadData(STORAGE_KEYS.tasks, []),
  memos: loadData(STORAGE_KEYS.memos, {}),
  calendarDate: startOfMonth(new Date()),
  selectedDate: null
};

const elements = {
  taskForm: document.querySelector("#taskForm"),
  editingTaskId: document.querySelector("#editingTaskId"),
  subjectInput: document.querySelector("#subjectInput"),
  titleInput: document.querySelector("#titleInput"),
  dateInput: document.querySelector("#dateInput"),
  detailInput: document.querySelector("#detailInput"),
  submitButton: document.querySelector("#submitButton"),
  cancelEditButton: document.querySelector("#cancelEditButton"),
  todayLabel: document.querySelector("#todayLabel"),
  activeCount: document.querySelector("#activeCount"),
  urgentCount: document.querySelector("#urgentCount"),
  doneCount: document.querySelector("#doneCount"),
  urgentPanel: document.querySelector("#urgentPanel"),
  urgentBadge: document.querySelector("#urgentBadge"),
  urgentList: document.querySelector("#urgentList"),
  calendarTitle: document.querySelector("#calendarTitle"),
  calendarGrid: document.querySelector("#calendarGrid"),
  activeListCount: document.querySelector("#activeListCount"),
  activeTaskList: document.querySelector("#activeTaskList"),
  completedTaskList: document.querySelector("#completedTaskList"),
  prevMonthButton: document.querySelector("#prevMonthButton"),
  nextMonthButton: document.querySelector("#nextMonthButton"),
  todayButton: document.querySelector("#todayButton"),
  clearDoneButton: document.querySelector("#clearDoneButton"),
  dayModal: document.querySelector("#dayModal"),
  modalTitle: document.querySelector("#modalTitle"),
  modalTaskList: document.querySelector("#modalTaskList"),
  dayMemo: document.querySelector("#dayMemo"),
  closeModalButton: document.querySelector("#closeModalButton"),
  saveMemoButton: document.querySelector("#saveMemoButton"),
  toast: document.querySelector("#toast")
};

initialize();

function initialize() {
  elements.dateInput.min = toDateKey(new Date());
  elements.dateInput.value = toDateKey(new Date());
  elements.todayLabel.textContent = formatKoreanDate(new Date(), true);
  bindEvents();
  render();
}

function bindEvents() {
  elements.taskForm.addEventListener("submit", handleTaskSubmit);
  elements.cancelEditButton.addEventListener("click", resetForm);
  elements.prevMonthButton.addEventListener("click", () => changeMonth(-1));
  elements.nextMonthButton.addEventListener("click", () => changeMonth(1));
  elements.todayButton.addEventListener("click", () => {
    state.calendarDate = startOfMonth(new Date());
    renderCalendar();
  });
  elements.clearDoneButton.addEventListener("click", clearCompletedTasks);
  elements.closeModalButton.addEventListener("click", closeDayModal);
  elements.saveMemoButton.addEventListener("click", saveDayMemo);
  elements.dayModal.addEventListener("click", (event) => {
    if (event.target === elements.dayModal) closeDayModal();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeDayModal();
  });
}

function handleTaskSubmit(event) {
  event.preventDefault();

  const taskData = {
    subject: elements.subjectInput.value.trim(),
    title: elements.titleInput.value.trim(),
    dueDate: elements.dateInput.value,
    detail: elements.detailInput.value.trim()
  };

  if (!taskData.subject || !taskData.title || !taskData.dueDate) return;

  const editingId = elements.editingTaskId.value;
  if (editingId) {
    const task = state.tasks.find((item) => item.id === editingId);
    if (task) Object.assign(task, taskData);
    showToast("일정을 수정했습니다.");
  } else {
    state.tasks.push({
      id: createId(),
      ...taskData,
      completed: false,
      createdAt: new Date().toISOString()
    });
    showToast("새 일정을 추가했습니다.");
  }

  saveTasks();
  resetForm();
  render();
}

function render() {
  const activeTasks = sortTasks(state.tasks.filter((task) => !task.completed));
  const completedTasks = sortTasks(state.tasks.filter((task) => task.completed));
  const urgentTasks = activeTasks.filter((task) => {
    const days = getDaysLeft(task.dueDate);
    return days >= 0 && days <= 3;
  });

  elements.activeCount.textContent = activeTasks.length;
  elements.urgentCount.textContent = urgentTasks.length;
  elements.doneCount.textContent = completedTasks.length;
  elements.activeListCount.textContent = activeTasks.length;

  renderUrgentTasks(urgentTasks);
  renderTaskList(elements.activeTaskList, activeTasks, false);
  renderTaskList(elements.completedTaskList, completedTasks, true);
  renderCalendar();
}

function renderUrgentTasks(tasks) {
  elements.urgentBadge.textContent = `${tasks.length}건`;
  elements.urgentPanel.classList.toggle("no-alert", tasks.length === 0);

  if (!tasks.length) {
    elements.urgentList.innerHTML = '<div class="empty-state">3일 안에 마감되는 일정이 없습니다. 여유 있게 준비하고 있어요.</div>';
    return;
  }

  elements.urgentList.innerHTML = tasks.map((task) => `
    <article class="urgent-item">
      <div class="urgent-dday">${escapeHtml(getDdayLabel(task.dueDate))}</div>
      <div>
        <strong>${escapeHtml(task.title)}</strong>
        <span>${escapeHtml(task.subject)} · ${formatShortDate(task.dueDate)}</span>
      </div>
    </article>
  `).join("");
}

function renderTaskList(container, tasks, completed) {
  if (!tasks.length) {
    container.innerHTML = `<div class="empty-state">${completed ? "완료한 과제가 아직 없습니다." : "등록된 진행 일정이 없습니다."}</div>`;
    return;
  }

  container.innerHTML = tasks.map((task) => {
    const daysLeft = getDaysLeft(task.dueDate);
    const urgent = !completed && daysLeft >= 0 && daysLeft <= 3;
    const overdue = !completed && daysLeft < 0;

    return `
      <article class="task-item ${urgent || overdue ? "is-urgent" : ""}">
        <button class="complete-toggle ${completed ? "checked" : ""}" type="button"
          data-action="toggle" data-id="${task.id}" aria-label="${completed ? "진행 중으로 되돌리기" : "완료하기"}">
          ${completed ? "✓" : ""}
        </button>
        <div class="task-content">
          <strong>${escapeHtml(task.subject)} · ${escapeHtml(task.title)}</strong>
          <span>
            <b class="dday-tag ${overdue ? "overdue" : ""}">${escapeHtml(getDdayLabel(task.dueDate))}</b>
            ${formatShortDate(task.dueDate)}
            ${task.detail ? ` · ${escapeHtml(task.detail)}` : ""}
          </span>
        </div>
        <div class="task-actions">
          ${completed ? "" : `<button class="icon-button" type="button" data-action="edit" data-id="${task.id}">수정</button>`}
          <button class="icon-button" type="button" data-action="delete" data-id="${task.id}">삭제</button>
        </div>
      </article>
    `;
  }).join("");

  container.querySelectorAll("[data-action]").forEach((button) => {
    button.addEventListener("click", () => handleTaskAction(button.dataset.action, button.dataset.id));
  });
}

function handleTaskAction(action, id) {
  const task = state.tasks.find((item) => item.id === id);
  if (!task) return;

  if (action === "toggle") {
    task.completed = !task.completed;
    saveTasks();
    render();
    showToast(task.completed ? "완료함으로 이동했습니다." : "진행 중으로 되돌렸습니다.");
  }

  if (action === "edit") {
    elements.editingTaskId.value = task.id;
    elements.subjectInput.value = task.subject;
    elements.titleInput.value = task.title;
    elements.dateInput.value = task.dueDate;
    elements.detailInput.value = task.detail || "";
    elements.submitButton.textContent = "일정 수정하기";
    elements.cancelEditButton.classList.remove("hidden");
    elements.subjectInput.focus();
    window.scrollTo({ top: elements.taskForm.getBoundingClientRect().top + window.scrollY - 30, behavior: "smooth" });
  }

  if (action === "delete" && window.confirm(`'${task.title}' 일정을 삭제할까요?`)) {
    state.tasks = state.tasks.filter((item) => item.id !== id);
    saveTasks();
    render();
    showToast("일정을 삭제했습니다.");
  }
}

function renderCalendar() {
  const year = state.calendarDate.getFullYear();
  const month = state.calendarDate.getMonth();
  elements.calendarTitle.textContent = `${year}년 ${month + 1}월`;

  const firstDay = new Date(year, month, 1);
  const gridStart = new Date(year, month, 1 - firstDay.getDay());
  const cells = [];

  for (let index = 0; index < 42; index += 1) {
    const cellDate = addDays(gridStart, index);
    const dateKey = toDateKey(cellDate);
    const dayTasks = sortTasks(state.tasks.filter((task) => task.dueDate === dateKey));
    const isCurrentMonth = cellDate.getMonth() === month;
    const isToday = dateKey === toDateKey(new Date());
    const hasMemo = Boolean(state.memos[dateKey]);

    cells.push(`
      <button class="calendar-day ${isCurrentMonth ? "" : "other-month"} ${isToday ? "today" : ""} ${hasMemo ? "has-memo" : ""}"
        type="button" data-date="${dateKey}" aria-label="${formatKoreanDate(cellDate)} 일정 보기">
        <span class="day-number">${cellDate.getDate()}</span>
        ${dayTasks.slice(0, 3).map((task) => {
          const daysLeft = getDaysLeft(task.dueDate);
          const className = task.completed ? "done" : (daysLeft >= 0 && daysLeft <= 3 ? "urgent" : "");
          return `<span class="calendar-event ${className}">${escapeHtml(task.subject)} ${escapeHtml(task.title)}</span>`;
        }).join("")}
        ${dayTasks.length > 3 ? `<span class="more-events">+${dayTasks.length - 3}개 더보기</span>` : ""}
      </button>
    `);
  }

  elements.calendarGrid.innerHTML = cells.join("");
  elements.calendarGrid.querySelectorAll(".calendar-day").forEach((dayButton) => {
    dayButton.addEventListener("click", () => openDayModal(dayButton.dataset.date));
  });
}

function openDayModal(dateKey) {
  state.selectedDate = dateKey;
  const selected = fromDateKey(dateKey);
  const tasks = sortTasks(state.tasks.filter((task) => task.dueDate === dateKey));

  elements.modalTitle.textContent = formatKoreanDate(selected);
  elements.dayMemo.value = state.memos[dateKey] || "";
  elements.modalTaskList.innerHTML = tasks.length
    ? tasks.map((task) => {
      const daysLeft = getDaysLeft(task.dueDate);
      const urgent = !task.completed && daysLeft >= 0 && daysLeft <= 3;
      return `<div class="modal-task ${urgent ? "urgent" : ""}">
        <strong>${escapeHtml(task.subject)}</strong> · ${escapeHtml(task.title)}
        ${task.completed ? " (완료)" : ""}
      </div>`;
    }).join("")
    : '<div class="empty-state">이날 마감되는 일정이 없습니다.</div>';

  elements.dayModal.classList.remove("hidden");
  document.body.style.overflow = "hidden";
  setTimeout(() => elements.dayMemo.focus(), 50);
}

function closeDayModal() {
  elements.dayModal.classList.add("hidden");
  document.body.style.overflow = "";
}

function saveDayMemo() {
  if (!state.selectedDate) return;
  const memo = elements.dayMemo.value.trim();

  if (memo) {
    state.memos[state.selectedDate] = memo;
  } else {
    delete state.memos[state.selectedDate];
  }

  localStorage.setItem(STORAGE_KEYS.memos, JSON.stringify(state.memos));
  renderCalendar();
  closeDayModal();
  showToast("날짜 메모를 저장했습니다.");
}

function changeMonth(amount) {
  state.calendarDate = new Date(
    state.calendarDate.getFullYear(),
    state.calendarDate.getMonth() + amount,
    1
  );
  renderCalendar();
}

function clearCompletedTasks() {
  const completedCount = state.tasks.filter((task) => task.completed).length;
  if (!completedCount) {
    showToast("비울 완료 기록이 없습니다.");
    return;
  }

  if (window.confirm(`완료한 일정 ${completedCount}건을 모두 삭제할까요?`)) {
    state.tasks = state.tasks.filter((task) => !task.completed);
    saveTasks();
    render();
    showToast("완료 기록을 비웠습니다.");
  }
}

function resetForm() {
  elements.taskForm.reset();
  elements.editingTaskId.value = "";
  elements.dateInput.value = toDateKey(new Date());
  elements.submitButton.textContent = "일정 추가하기";
  elements.cancelEditButton.classList.add("hidden");
}

function saveTasks() {
  localStorage.setItem(STORAGE_KEYS.tasks, JSON.stringify(state.tasks));
}

function loadData(key, fallback) {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
}

function getDaysLeft(dateKey) {
  const today = fromDateKey(toDateKey(new Date()));
  const dueDate = fromDateKey(dateKey);
  return Math.round((dueDate - today) / 86400000);
}

function getDdayLabel(dateKey) {
  const days = getDaysLeft(dateKey);
  if (days === 0) return "D-DAY";
  if (days > 0) return `D-${days}`;
  return `D+${Math.abs(days)}`;
}

function sortTasks(tasks) {
  return [...tasks].sort((a, b) => {
    const dateOrder = a.dueDate.localeCompare(b.dueDate);
    return dateOrder || a.createdAt.localeCompare(b.createdAt);
  });
}

function formatKoreanDate(date, includeWeekday = false) {
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    ...(includeWeekday ? { weekday: "short" } : {})
  }).format(date);
}

function formatShortDate(dateKey) {
  return new Intl.DateTimeFormat("ko-KR", {
    month: "short",
    day: "numeric",
    weekday: "short"
  }).format(fromDateKey(dateKey));
}

function startOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function addDays(date, amount) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + amount);
}

function toDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function fromDateKey(dateKey) {
  const [year, month, day] = dateKey.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function createId() {
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

let toastTimer;
function showToast(message) {
  elements.toast.textContent = message;
  elements.toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => elements.toast.classList.remove("show"), 2200);
}
