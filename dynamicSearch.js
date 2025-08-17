const items = [
	'Top 10 hiking trails near you - explore scenic views and nature walks.',
	'Easy recipes for weeknight dinners - quick and delicious meals.',
	'What is the capital of Australia?',
	'Latest news headlines - breaking stories from around the world.',
	'Best books of 2024 - critically acclaimed novels and non-fiction.',
	'Learn a new language online - free and paid resources available.',
	'Symptoms of the common cold - when to see a doctor.',
	'DIY home improvement projects - tips and tutorials.',
	'Find local businesses - restaurants, shops, and services nearby.',
	"Understanding cryptocurrency - a beginner's guide.",
	'Travel deals and vacation packages - plan your next getaway.',
	'History of the internet - key milestones and innovations.',
	'Benefits of regular exercise - improve your health and well-being.',
	'Funny cat videos compilation - guaranteed to make you laugh.',
	'How to write a compelling resume - tips for job seekers.',
	'The science behind climate change - facts and evidence.',
	'Popular podcasts to listen to - covering various topics.',
	'Best practices for gardening - grow your own fruits and vegetables.',
	'Understanding quantum physics - exploring the subatomic world.',
	'Virtual museum tours - explore art and history from home.',
];
let filteredItems = [...items];
let searchParams = new URLSearchParams(window.location.search);
const searchInput = document.querySelector('.searchContainer > input');
const clearButton = document.querySelector('.searchContainer > button');

const searchText = searchInput?.value || searchParams?.get('searchText');

if (searchText?.length > 0 && searchInput) {
	searchInput.value = searchText;
}

function throttle(fn, delay) {
	if (typeof fn !== 'function') {
		throw new Error('First param should be a function');
	}

	if (typeof delay !== 'number') {
		throw new Error('Second param should be a number');
	}

	let timeoutId;

	function inner(...args) {
		if (timeoutId) {
			clearTimeout(timeoutId);
			timeoutId = null;
		}

		const context = this;

		timeoutId = setTimeout(() => {
			fn.apply(context, args);
		}, delay);
	}

	return inner;
}

function handleChange(e) {
	filteredItems = [...items];
	const text = e.target?.value;
	filterSearch(text);
	displayItems();
	updateURLSearchParams(text);
}

const throttledHandleChange = throttle(handleChange, 300);

function updateURLSearchParams(text) {
	const cleanedText = text?.toLowerCase() || '';
	if (cleanedText !== searchText?.toLowerCase()) {
		searchParams.set('searchText', cleanedText);
		requestAnimationFrame(() => {
			window.history.replaceState(
				{ searchParams: searchParams.toString() },
				'',
				`${window.location.pathname}?${searchParams.toString()}`,
			);
		});
	}
}

function filterSearch(text) {
	const cleanedText = text?.toLowerCase();
	if (!cleanedText?.length) return;
	filteredItems = items.filter((item) => item.toLowerCase().indexOf(cleanedText) >= 0);
}

function displayItems() {
	if (!filteredItems?.length) return;
	const listContainer = document.querySelector('.list-container');
	let html = '';

	filteredItems?.forEach((item) => (html += `<div>${item}</div>`));

	listContainer.innerHTML = html;
}

function handleClear() {
	searchInput.value = '';
	handleChange({});
}

function handlePopstate(e) {
	const searchParamsText = e.state.searchParams || window.location.search;
	searchParams = new URLSearchParams(searchParamsText);
}

function intializeListeners() {
	searchInput?.addEventListener('input', throttledHandleChange);
	clearButton?.addEventListener('click', handleClear);
	window.addEventListener('popstate', handlePopstate);
}

function initialize() {
	filterSearch(searchText);
	displayItems();
	intializeListeners();
}

initialize();
