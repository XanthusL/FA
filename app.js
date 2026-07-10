const header = document.querySelector('.site-header');
const nav = document.querySelector('.site-nav');
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelectorAll('.site-nav a[href^="#"]');
const sections = document.querySelectorAll('main section[id]');

if (nav && navToggle) {
	const closeNav = () => {
		nav.classList.remove('is-open');
		navToggle.setAttribute('aria-expanded', 'false');
		navToggle.setAttribute('aria-label', 'Open navigation menu');
	};

	const openNav = () => {
		nav.classList.add('is-open');
		navToggle.setAttribute('aria-expanded', 'true');
		navToggle.setAttribute('aria-label', 'Close navigation menu');
	};

	navToggle.addEventListener('click', () => {
		if (nav.classList.contains('is-open')) {
			closeNav();
			return;
		}

		openNav();
	});

	navLinks.forEach((link) => {
		link.addEventListener('click', (event) => {
			const targetId = link.getAttribute('href');
			const target = targetId ? document.querySelector(targetId) : null;

			if (!target) {
				return;
			}

			event.preventDefault();
			target.scrollIntoView({ behavior: 'smooth', block: 'start' });
			closeNav();
		});
	});

	document.addEventListener('click', (event) => {
		if (!nav.classList.contains('is-open')) {
			return;
		}

		const clickedInsideHeader = header && header.contains(event.target);

		if (!clickedInsideHeader) {
			closeNav();
		}
	});
}

const setActiveLink = (id) => {
	navLinks.forEach((link) => {
		const isActive = link.getAttribute('href') === `#${id}`;
		link.classList.toggle('active', isActive);
	});
};

if (sections.length) {
	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					setActiveLink(entry.target.id);
				}
			});
		},
		{
			rootMargin: '-35% 0px -55% 0px',
			threshold: 0.15,
		}
	);

	sections.forEach((section) => observer.observe(section));
	setActiveLink('hero');
}

const updateHeaderState = () => {
	if (!header) {
		return;
	}

	header.classList.toggle('is-scrolled', window.scrollY > 50);
};

updateHeaderState();
window.addEventListener('scroll', updateHeaderState, { passive: true });