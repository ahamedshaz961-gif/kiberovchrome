document.addEventListener('DOMContentLoaded', () => {
  const pageShell = document.querySelector('.page-shell');

  if (!pageShell) {
    return;
  }

  document.querySelectorAll('a[href]').forEach((link) => {
    const target = link.getAttribute('href');

    if (!target || target.startsWith('#') || target.startsWith('mailto:') || target.startsWith('http')) {
      return;
    }

    link.addEventListener('click', (event) => {
      const currentPage = window.location.pathname.split('/').pop() || 'index.html';

      if (link.getAttribute('href') === currentPage) {
        return;
      }

      event.preventDefault();
      document.body.classList.add('is-fading');
      window.setTimeout(() => {
        window.location.href = target;
      }, 120);
    });
  });
});
