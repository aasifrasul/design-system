import { ImageLoader } from '../utils/ImageLoader.js';

let currentIndex = 0;
let direction = 'right';
let slideshowState = 'stopped'; // 'stopped', 'running', 'error'
let isLoading = false;
let intervalId = null;
const placeholderUrl = 'https://placehold.co/500x500';

const urls = [
	'https://picsum.photos/600/400',
	'https://picsum.photos/400/600',
	'https://picsum.photos/500',
	'https://picsum.photos/id/10/500/300',
	'https://picsum.photos/800/600?grayscale',
	'https://picsum.photos/id/11/2500/1667',
	'https://picsum.photos/id/54/3264/2176',
	'https://picsum.photos/id/70/3011/2000',
	'https://picsum.photos/id/77/1631/1102',
	'https://picsum.photos/id/110/5000/3333',
];
const len = urls.length - 1;
const buttonRef = document.querySelector('.control-container > button');
const imageRef = document.querySelector('.slider > img');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');

const imageLoader = new ImageLoader({
	enableLogging: true,
	placeholder: placeholderUrl,
});

async function selectImage(index) {
	isLoading = true;
	toggleDisable();

	try {
		await imageLoader.loadImage(urls[index], {
			targetElement: imageRef,
		});
		if (!slideshowState) loadNextImage();
	} catch (error) {
		// Handle both error and abort cases
		loadNextImage();
	} finally {
		isLoading = false;
		toggleDisable();
	}
}

document.addEventListener('keydown', (e) => {
	if (e.key === 'ArrowLeft') moveLeft();
	if (e.key === 'ArrowRight') moveRight();
	if (e.key === ' ') buttonRef.click();
});

prevButton?.addEventListener('click', () => {
	direction = 'left';
	moveLeft();
});

nextButton?.addEventListener('click', () => {
	direction = 'right';
	moveRight();
});

function getNextIndex(index) {
	return (index + urls.length) % urls.length;
}

function moveLeft() {
	currentIndex = getNextIndex(currentIndex - 1);
	selectImage(currentIndex);
}

function moveRight() {
	currentIndex = getNextIndex(currentIndex + 1);
	selectImage(currentIndex);
}

function toggleDisable() {
	nextButton.disabled = isLoading;
	nextButton.ariaDisabled = isLoading;
	prevButton.disabled = isLoading;
	prevButton.ariaDisabled = isLoading;
}

function loadNextImage() {
	intervalId = setTimeout(() => {
		direction === 'left' ? moveLeft() : moveRight();
	}, 2000);
}

function stopTimer() {
	clearTimeout(intervalId);
}

buttonRef?.addEventListener('click', () => {
	slideshowState = 'stopped'
	if (slideshowState === 'Start') {
		updateButtonState();
	} else {
		handleImageError();
	}
});

function updateButtonState() {
	if (!buttonRef) return;

	switch (slideshowState) {
		case 'stopped':
			buttonRef.textContent = 'Start';
			buttonRef.disabled = false;
			break;
		case 'running':
			buttonRef.textContent = 'Stop';
			buttonRef.disabled = false;
			break;
		case 'error':
			buttonRef.textContent = 'Retry';
			buttonRef.disabled = false;
			break;
	}
}

function handleImageError() {
	slideshowState = 'error';
	updateButtonState();
	stopTimer();
	// Maybe try to recover or show error message
}

selectImage(currentIndex);
