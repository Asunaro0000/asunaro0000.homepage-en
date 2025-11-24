// ============================
// normal calendar mapping
// ============================
const NORMAL_CALENDAR_IMAGES = {
  1:"assets/normal-calendar/01.png",
  2:"assets/normal-calendar/02.png",
  3:"assets/normal-calendar/03.png",
  4:"assets/normal-calendar/04.png",
  5:"assets/normal-calendar/05.png",
  6:"assets/normal-calendar/06.png",
  7:"assets/normal-calendar/07.png",
  8:"assets/normal-calendar/08.png",
  9:"assets/normal-calendar/09.png",
  10:"assets/normal-calendar/10.png",
  11:"assets/normal-calendar/11.png",
  12:"assets/normal-calendar/12.png",
};

let normalCalendarMonth = 1;

function updateNormalCalendar(month, animate = false) {
  const img = document.getElementById("normal-calendar-image");
  if (!img) return;

  normalCalendarMonth = month;

  if (animate) {
    img.style.opacity = "0";
    img.style.transform = "scale(.96)";
    setTimeout(() => {
      img.src = NORMAL_CALENDAR_IMAGES[month];
      img.style.opacity = "1";
      img.style.transform = "scale(1)";
    }, 140);
  } else {
    img.src = NORMAL_CALENDAR_IMAGES[month];
  }
}


// ============================
// button events
// ============================
function setupNormalCalendarNav() {
  const prev = document.getElementById("normal-calendar-prev");
  const next = document.getElementById("normal-calendar-next");

  if (!prev || !next) return;

  prev.addEventListener("click", () => {
    normalCalendarMonth = normalCalendarMonth === 1 ? 12 : normalCalendarMonth - 1;
    updateNormalCalendar(normalCalendarMonth, true);
  });

  next.addEventListener("click", () => {
    normalCalendarMonth = normalCalendarMonth === 12 ? 1 : normalCalendarMonth + 1;
    updateNormalCalendar(normalCalendarMonth, true);
  });
}


// ============================
// init
// ============================
document.addEventListener("DOMContentLoaded", () => {
  const img = document.getElementById("normal-calendar-image");
  if (!img) return;

  const datasetMonth = Number(img.dataset.month);
  normalCalendarMonth = datasetMonth || 1;

  updateNormalCalendar(normalCalendarMonth, false);
  setupNormalCalendarNav();
});
