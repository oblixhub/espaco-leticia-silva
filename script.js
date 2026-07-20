const navbar = document.getElementById('navbar');
const toggle = document.getElementById('navToggle');
const links = document.getElementById('navLinks');
const bookingForm = document.getElementById('bookingForm');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

function closeNav() {
  links.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-label', 'Abrir menu');
}

links.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', closeNav);
});

toggle.addEventListener('click', () => {
  const isOpen = links.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(isOpen));
  toggle.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeNav();
});

const fadeEls = document.querySelectorAll('.fade-up');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if ('IntersectionObserver' in window && !prefersReducedMotion) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (!entry.isIntersecting) return;

      window.setTimeout(() => entry.target.classList.add('visible'), index * 90);
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.1 });

  fadeEls.forEach((element) => observer.observe(element));
} else {
  fadeEls.forEach((element) => element.classList.add('visible'));
}

bookingForm.addEventListener('submit', (event) => {
  event.preventDefault();

  if (!bookingForm.reportValidity()) return;

  const data = new FormData(bookingForm);
  const preferredDate = data.get('data');
  const formattedDate = preferredDate
    ? new Date(`${preferredDate}T12:00:00`).toLocaleDateString('pt-BR')
    : 'A combinar';
  const message = [
    'Olá, Leticia! Gostaria de solicitar um horário.',
    '',
    `Nome: ${data.get('nome')}`,
    `WhatsApp: ${data.get('whatsapp')}`,
    `Serviço: ${data.get('servico')}`,
    `Data preferida: ${formattedDate}`,
    `Período: ${data.get('periodo')}`,
  ].join('\n');
  const whatsappUrl = `https://wa.me/5573981409155?text=${encodeURIComponent(message)}`;

  window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
});

document.getElementById('currentYear').textContent = new Date().getFullYear();
