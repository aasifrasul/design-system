export class ImageLoader {
	constructor(options = {}) {
		this.currentRequest = null;
		this.defaultPlaceholder = options.placeholder || 'placeholder.jpg';
		this.enableLogging = options.enableLogging ?? true;
	}

	loadImage(url, options = {}) {
		const { onLoad, onError, onAbort, ...restOptions } = options;

		const promise = this.loadImagePromise(url, restOptions);

		// If callbacks provided, use them
		if (onLoad || onError || onAbort) {
			promise
				.then((img) => onLoad?.(img))
				.catch((error) => {
					if (error.message.includes('aborted')) {
						onAbort?.(error);
					} else {
						onError?.(error);
					}
				});
		}

		return promise; // Also return promise for async/await usage
	}

	loadImagePromise(url, options = {}) {
		const { targetElement, placeholder = this.defaultPlaceholder } = options;

		// Cancel any existing request
		this.cancel();

		const controller = new AbortController();
		const img = new Image();
		targetElement.src = placeholder;

		// Store both img and controller
		this.currentRequest = { img, controller };

		return new Promise((resolve, reject) => {
			const handleLoad = () => {
				if (this.currentRequest?.img === img) {
					if (targetElement) {
						targetElement.src = url;
						targetElement.classList?.remove('loading');
					}
					if (this.enableLogging) {
						console.log(`✅ Loaded: ${url}`);
					}
					this.currentRequest = null; // Clear after success
					resolve(img);
				}
			};

			const handleError = (event) => {
				if (this.currentRequest?.img === img) {
					if (targetElement) {
						targetElement.src = placeholder;
						targetElement.classList?.remove('loading');
					}
					if (this.enableLogging) {
						console.error(`❌ Error loading: ${url}`);
					}
					this.currentRequest = null; // Clear after error
					reject(new Error(`Failed to load image: ${url}`));
				}
			};

			const handleAbort = () => {
				if (this.enableLogging) {
					console.warn(`🚫 Aborted loading: ${url}`);
				}
				// Don't clear currentRequest here - it's being replaced
				reject(new Error('Image loading aborted'));
			};

			// Add event listeners
			img.addEventListener('load', handleLoad, { once: true });
			img.addEventListener('error', handleError, { once: true });
			img.addEventListener('abort', handleAbort, { once: true });

			// Start loading
			targetElement?.classList?.add('loading');
			img.src = url;
		});
	}

	// Cancel current load using AbortController
	cancel() {
		if (this.currentRequest) {
			this.currentRequest.controller.abort();
			this.currentRequest = null;
		}
	}

	// Check if currently loading
	isLoading() {
		return this.currentRequest !== null;
	}
}
