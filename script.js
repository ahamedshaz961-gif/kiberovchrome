document.addEventListener('DOMContentLoaded', () =>
{
const body = document.body;

document.querySelectorAll('a[href]').forEach((link) =>
{
const href = link.getAttribute('href');

if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('http'))
{
return;
}

link.addEventListener('click', (e) =>
{
const page = window.location.pathname.split('/').pop() || 'index.html';

if (href === page)
{
return;
}

e.preventDefault();
body.classList.add('is-fading');

window.setTimeout(() =>
{
window.location.href = href;
}, 150);
});
});

const oro = document.getElementById('ouroboros');

if (!oro)
{
return;
}

const pos =
{
x: window.innerWidth * 0.3,
y: window.innerHeight * 0.25,
vx: 1.2,
vy: 0.95,
rot: 0,
speed: 1.4
};

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const fitOro = () =>
{
const size = clamp(window.innerWidth * 0.085, 46, 70);
oro.style.width = `${size}px`;

const maxX = Math.max(0, window.innerWidth - oro.offsetWidth);
const maxY = Math.max(0, window.innerHeight - oro.offsetHeight);

pos.x = clamp(pos.x, 0, maxX);
pos.y = clamp(pos.y, 0, maxY);
};

const drawOro = () =>
{
oro.style.transform = `translate(${pos.x}px, ${pos.y}px) rotate(${pos.rot}deg)`;

const img = oro.querySelector('img');

if (img)
{
img.style.transform = `rotate(${pos.rot * -0.35}deg)`;
}
};

const tick = () =>
{
const maxX = Math.max(0, window.innerWidth - oro.offsetWidth);
const maxY = Math.max(0, window.innerHeight - oro.offsetHeight);

pos.x += pos.vx;
pos.y += pos.vy;
pos.rot += pos.speed;

if (pos.x <= 0 || pos.x >= maxX)
{
pos.vx *= -1;
pos.x = clamp(pos.x, 0, maxX);
}

if (pos.y <= 0 || pos.y >= maxY)
{
pos.vy *= -1;
pos.y = clamp(pos.y, 0, maxY);
}

drawOro();
requestAnimationFrame(tick);
};

fitOro();
drawOro();
requestAnimationFrame(tick);

window.addEventListener('resize', () =>
{
fitOro();
drawOro();
});
});