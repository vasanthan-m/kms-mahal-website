// Navbar scroll effect
const navbar = document.getElementById('navbar');
const scrollTop = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
    scrollTop.classList.add('visible');
  } else {
    navbar.classList.remove('scrolled');
    scrollTop.classList.remove('visible');
  }
});

// Hamburger menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// Scroll reveal
const revealEls = document.querySelectorAll(
  '.fac-card, .event-card, .gallery-card, .about-grid, .cinfo-card, .contact-form-wrap, .pricing-table-wrap'
);
revealEls.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => observer.observe(el));

// Infinite testimonial carousel — duplicate cards for seamless loop
const track = document.getElementById('testiTrack');
if (track) {
  const clone = track.innerHTML;
  track.innerHTML += clone;
}

// Gallery tabs
document.querySelectorAll('.gallery-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.gallery-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.gallery-panel').forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById('tab-' + tab.dataset.tab).classList.add('active');
  });
});

// Contact form submit — Web3Forms
document.getElementById('contactForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const btn = document.getElementById('submitBtn');
  const msg = document.getElementById('formMsg');
  btn.textContent = 'Sending…';
  btn.disabled = true;

  const data = new FormData(e.target);
  const res = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    body: data
  });
  const json = await res.json();

  if (json.success) {
    btn.textContent = 'Enquiry Sent! ✓';
    btn.style.background = '#27ae60';
    btn.style.borderColor = '#27ae60';
    msg.style.display = 'block';
    msg.style.color = '#27ae60';
    msg.textContent = 'Thank you! We will get back to you shortly.';
    e.target.reset();
    setTimeout(() => {
      btn.textContent = 'Send Enquiry';
      btn.style.background = '';
      btn.style.borderColor = '';
      btn.disabled = false;
      msg.style.display = 'none';
    }, 5000);
  } else {
    btn.textContent = 'Send Enquiry';
    btn.disabled = false;
    msg.style.display = 'block';
    msg.style.color = '#e74c3c';
    msg.textContent = 'Something went wrong. Please try again or call us directly.';
  }
});
