document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;

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
      body.classList.add('is-fading');
      window.setTimeout(() => {
        window.location.href = target;
      }, 150);
    });
  });

  const ouroboros = document.getElementById('ouroboros');

  if (!ouroboros) {
    return;
  }

  const state = {
    x: window.innerWidth * 0.3,
    y: window.innerHeight * 0.25,
    vx: 0.8,
    vy: 0.65,
    rotation: 0,
    speed: 0.9
  };

  const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

  const updateOuroborosSize = () => {
    const size = clamp(window.innerWidth * 0.085, 46, 70);
    ouroboros.style.width = `${size}px`;
  };

  const updateBounds = () => {
    const maxX = Math.max(0, window.innerWidth - ouroboros.offsetWidth);
    const maxY = Math.max(0, window.innerHeight - ouroboros.offsetHeight);

    state.x = clamp(state.x, 0, maxX);
    state.y = clamp(state.y, 0, maxY);
  };

  const render = () => {
    ouroboros.style.transform = `translate(${state.x}px, ${state.y}px) rotate(${state.rotation}deg)`;
    const img = ouroboros.querySelector('img');

    if (img) {
      img.style.transform = `rotate(${state.rotation * -0.35}deg)`;
    }
  };

  const animate = () => {
    const maxX = Math.max(0, window.innerWidth - ouroboros.offsetWidth);
    const maxY = Math.max(0, window.innerHeight - ouroboros.offsetHeight);

    state.x += state.vx;
    state.y += state.vy;
    state.rotation += state.speed;

    if (state.x <= 0 || state.x >= maxX) {
      state.vx *= -1;
      state.x = clamp(state.x, 0, maxX);
    }

    if (state.y <= 0 || state.y >= maxY) {
      state.vy *= -1;
      state.y = clamp(state.y, 0, maxY);
    }

    render();
    requestAnimationFrame(animate);
  };

  updateOuroborosSize();
  updateBounds();
  render();
  requestAnimationFrame(animate);

  window.addEventListener('resize', () => {
    updateOuroborosSize();
    updateBounds();
    render();
  });
});
