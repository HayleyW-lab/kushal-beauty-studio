// ── NAV SCROLL EFFECT ──
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) nav.classList.add('scrolled');
  else nav.classList.remove('scrolled');
});

// ── HAMBURGER MENU ──
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
if (hamburger) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
}

// ── TIME SLOT SELECTION ──
function selectTime(el) {
  if (el.classList.contains('unavailable')) return;
  document.querySelectorAll('.time-slot').forEach(s => s.classList.remove('selected'));
  el.classList.add('selected');
  const hidden = document.getElementById('selectedTime');
  if (hidden) hidden.value = el.textContent.trim();
}

// ── BOOKING FORM SUBMISSION (Netlify Forms) ──
// Netlify automatically intercepts the POST and:
//   1. Emails the submission to kushalbeautystudio@gmail.com
//   2. Stores it in the Netlify dashboard
// We intercept the submit event to validate time slot first, then let Netlify handle it.
function handleSubmit(event) {
  event.preventDefault();
  const time = document.getElementById('selectedTime')?.value;
  if (!time) {
    alert('Please select a preferred time slot.');
    return;
  }
  // Submit to Netlify via fetch
  const form = event.target;
  const formData = new FormData(form);
  fetch('/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams(formData).toString()
  })
  .then(() => {
    form.style.display = 'none';
    document.getElementById('bookingSuccess').style.display = 'block';
  })
  .catch(() => {
    // Fallback — show success anyway and advise calling
    form.style.display = 'none';
    document.getElementById('bookingSuccess').style.display = 'block';
  });
}

// ── SET MIN DATE ON BOOKING FORM ──
const dateInput = document.getElementById('bookDate');
if (dateInput) {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  dateInput.min = `${yyyy}-${mm}-${dd}`;

  // Disable Sundays
  dateInput.addEventListener('change', () => {
    const selected = new Date(dateInput.value + 'T00:00:00');
    if (selected.getDay() === 0) {
      alert('Sorry, we are closed on Sundays. Please choose another day.');
      dateInput.value = '';
    }
  });
}

// ── FADE UP ON SCROLL ──
const fadeEls = document.querySelectorAll('.svc-card, .why-item, .value-item');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  fadeEls.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = `opacity 0.5s ease ${i * 0.08}s, transform 0.5s ease ${i * 0.08}s`;
    observer.observe(el);
  });
}
