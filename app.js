const header = document.querySelector('.site-header');
const nav = document.querySelector('.site-nav');
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelectorAll('.site-nav a[href^="#"]:not(.auth-sign-out)');
const sections = document.querySelectorAll('main section[id]');
const authModal = document.querySelector('#auth-modal');
const authForm = document.querySelector('#auth-form');
const displayNameInput = document.querySelector('#display-name-input');
const signInButton = document.querySelector('#sign-in-button');
const authUserPanel = document.querySelector('#auth-user-panel');
const authUserName = document.querySelector('#auth-user-name');
const authPointsBadge = document.querySelector('#auth-points-badge');
const signOutButton = document.querySelector('#sign-out-button');
const dashboard = document.querySelector('#dashboard');
const dashboardName = document.querySelector('#dashboard-name');
const dashboardPoints = document.querySelector('#dashboard-points');
const dashboardLevel = document.querySelector('#dashboard-level');
const dashboardProgressFill = document.querySelector('#dashboard-progress-fill');
const dashboardProgressCaption = document.querySelector('#dashboard-progress-caption');
const dashboardHistory = document.querySelector('#dashboard-history');
const logRecycleButton = document.querySelector('#log-recycle-button');

const STORAGE_KEY = 'greenlens_user';

const LEVELS = [
	{
		label: 'Eco Starter',
		min: 0,
		max: 50,
		nextLabel: 'Recycling Rookie',
	},
	{
		label: 'Recycling Rookie',
		min: 50,
		max: 150,
		nextLabel: 'Recycling Pro',
	},
	{
		label: 'Recycling Pro',
		min: 150,
		max: Infinity,
		nextLabel: null,
	},
];

let currentUser = loadUser();

function loadUser() {
	try {
		const rawUser = window.localStorage.getItem(STORAGE_KEY);

		if (!rawUser) {
			return null;
		}

		const parsedUser = JSON.parse(rawUser);

		if (!parsedUser || typeof parsedUser.name !== 'string') {
			return null;
		}

		return {
			name: parsedUser.name,
			points: Number.isFinite(parsedUser.points) ? parsedUser.points : 0,
			history: Array.isArray(parsedUser.history) ? parsedUser.history : [],
		};
	} catch {
		return null;
	}
}

function saveUser(user) {
	window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
}

function clearUser() {
	window.localStorage.removeItem(STORAGE_KEY);
}

function getLevel(points) {
	if (points < LEVELS[1].min) {
		return {
			label: LEVELS[0].label,
			progress: Math.min(points / LEVELS[0].max, 1),
			caption: `${Math.max(LEVELS[0].max - points, 0)} points to ${LEVELS[0].nextLabel}`,
		};
	}

	if (points < LEVELS[2].min) {
		const progress = (points - LEVELS[1].min) / (LEVELS[1].max - LEVELS[1].min);

		return {
			label: LEVELS[1].label,
			progress: Math.min(progress, 1),
			caption: `${Math.max(LEVELS[1].max - points, 0)} points to ${LEVELS[1].nextLabel}`,
		};
	}

	return {
		label: LEVELS[2].label,
		progress: 1,
		caption: 'Maximum level reached',
	};
}

function formatTimestamp(timestamp) {
	return new Date(timestamp).toLocaleString([], {
		month: 'short',
		day: 'numeric',
		hour: 'numeric',
		minute: '2-digit',
	});
}

function openAuthModal() {
	if (!authModal || !displayNameInput) {
		return;
	}

	authModal.hidden = false;
	displayNameInput.value = currentUser?.name ?? '';
	displayNameInput.focus();
	displayNameInput.select();
}

function closeAuthModal() {
	if (!authModal) {
		return;
	}

	authModal.hidden = true;
}

function renderAuthState() {
	const hasUser = Boolean(currentUser);

	if (signInButton) {
		signInButton.hidden = hasUser;
	}

	if (authUserPanel) {
		authUserPanel.hidden = !hasUser;
	}

	if (dashboard) {
		dashboard.hidden = !hasUser;
	}

	if (!hasUser) {
		return;
	}

	const { name, points, history } = currentUser;
	const level = getLevel(points);

	if (authUserName) {
		authUserName.textContent = name;
	}

	if (authPointsBadge) {
		authPointsBadge.textContent = `🌱 ${points} pts`;
	}

	if (dashboardName) {
		dashboardName.textContent = name;
	}

	if (dashboardPoints) {
		dashboardPoints.textContent = `${points}`;
	}

	if (dashboardLevel) {
		dashboardLevel.textContent = level.label;
	}

	if (dashboardProgressFill) {
		dashboardProgressFill.style.width = `${Math.round(level.progress * 100)}%`;
	}

	if (dashboardProgressCaption) {
		dashboardProgressCaption.textContent = level.caption;
	}

	if (dashboardHistory) {
		if (history.length === 0) {
			dashboardHistory.innerHTML = '<li class="history-item">No recycling actions yet. Log your first item to start building points.</li>';
		} else {
			dashboardHistory.innerHTML = history
				.slice()
				.reverse()
				.map((entry) => `<li class="history-item"><strong>+${entry.points} points</strong><span>${entry.action}</span><br><span>${formatTimestamp(entry.timestamp)}</span></li>`)
				.join('');
		}
	}
}

function setCurrentUser(user) {
	currentUser = user;

	if (currentUser) {
		saveUser(currentUser);
	} else {
		clearUser();
	}

	renderAuthState();
}

function logRecycleAction() {
	if (!currentUser) {
		openAuthModal();
		return;
	}

	const nextHistory = currentUser.history.concat({
		action: 'Logged a recycle action',
		points: 10,
		timestamp: new Date().toISOString(),
	});

	setCurrentUser({
		...currentUser,
		points: currentUser.points + 10,
		history: nextHistory,
	});
}

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

if (signInButton) {
	signInButton.addEventListener('click', openAuthModal);
}

if (signOutButton) {
	signOutButton.addEventListener('click', (event) => {
		event.preventDefault();
		setCurrentUser(null);
		closeAuthModal();
	});
}

if (authForm) {
	authForm.addEventListener('submit', (event) => {
		event.preventDefault();

		if (!displayNameInput) {
			return;
		}

		const name = displayNameInput.value.trim();

		if (!name) {
			displayNameInput.focus();
			return;
		}

		setCurrentUser({
			name,
			points: 0,
			history: [],
		});
		closeAuthModal();
	});
}

if (authModal) {
	authModal.addEventListener('click', (event) => {
		if (event.target && event.target.matches('[data-close-auth-modal]')) {
			closeAuthModal();
		}
	});
}

document.addEventListener('keydown', (event) => {
	if (event.key === 'Escape' && authModal && !authModal.hidden) {
		closeAuthModal();
	}
});

if (logRecycleButton) {
	logRecycleButton.addEventListener('click', logRecycleAction);
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

renderAuthState();